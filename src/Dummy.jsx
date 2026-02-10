import axios from 'axios';
import { stringify } from 'querystring';
import SecureLS from 'secure-ls';
import { isEmpty } from "lodash";
import { ModuleControl } from '../config/module-control';
import { SUB_DOMAINS } from './subDomains';


let customURL = ''

const currentWebsiteUrl = window.location.origin

const defaultOptions = {
    headers: {},
    queryParams: null
};

const isLocal = !import.meta.env.MODE || import.meta.env.MODE === 'development';

const local_backend = localStorage.getItem("local_backend")

export const restClient = axios.create();

//get base url
function getBaseUrl() {
    const currentSubdomain = SUB_DOMAINS.find(({ frontend }) => frontend === currentWebsiteUrl);
    if (customURL && isLocal) {
        return (customURL + '/api')
    }
    else if (ModuleControl.isDevelopment && local_backend) {
        return (local_backend.includes('http') ? local_backend : 'http://127.0.0.1:8000/api')
    }
    else if (!isEmpty(currentSubdomain)) {
        return currentSubdomain?.Backend + '/api'
    }
    else {
        return (import.meta.env.VITE_API_BASE_URL);
    }
}

restClient.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    const err = error.response;
    const ls = new SecureLS();
    // Remove Toke & Logout
    if (err?.status === 401) {
        ls.remove('token');
        window.location.replace('/login')
    }
    return Promise.reject(error);
});

const httpClient = async (url = '', options = defaultOptions, noBaseUrl) => {
    const ls = new SecureLS();
    const baseUrl = getBaseUrl()
    let fullPath = noBaseUrl ? (`${url}`) : (`${baseUrl}${url[0] !== '/' ? '/' : ''}${url}`);

    if (options.queryParams) {
        const queryString = stringify(options.queryParams);
        fullPath = `${fullPath}?${queryString}`;
    }

    const token = ls.get('token');

    if (token || options.api_token) {
        restClient.defaults.headers.common['Authorization'] = `Bearer ${options.api_token || token}`;
    }

    const requestData = options

    return await restClient({
        url: fullPath,
        method: requestData.method || 'GET',
        cancelToken: options.cancelToken,
        signal: options.signal,
        onUploadProgress: options.onUploadProgress,
        data: requestData.data
    })
        .then(response => (
            {
                data: response?.data || {},
                errors: response?.data?.errors,
                error: response?.data?.error,
                message: response?.data?.message,
                success: (response?.status === 200
                    || response?.status === 201)
                    && response?.data?.status
            }
        ))
        .catch(err => {
            if (err?.response) {
                const response = err.response
                return {
                    data: response?.data || {},
                    errors: response?.data?.errors,
                    error: response?.data?.error,
                    message: response?.data?.message,
                    success: (response?.status === 200
                        || response?.status === 201)
                        && response?.data?.status
                }
            }
            return axios.isCancel(err) ?
                ({
                    data: null,
                    success: true,
                    cancelToken: true
                })
                :
                ({
                    data: err,
                    success: false,
                    message: err?.response?.data?.message
                })
        }
        );
};

export default httpClient;
