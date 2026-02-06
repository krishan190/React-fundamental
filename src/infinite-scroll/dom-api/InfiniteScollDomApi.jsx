import { useState } from "react";
import './style.css'

const Threshold = 20;


function InfiniteScrollDomApi() {
    const [data, setData] = useState([...new Array(40)]);

    function handleScroll(e) {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        console.log("scrollTop:", scrollTop);
        console.log("scrollHeight:", scrollHeight);
        console.log("clientHeight:", clientHeight);

        console.log("formula logic", scrollTop + clientHeight, scrollHeight - Threshold);

        if (scrollTop + clientHeight >= scrollHeight - Threshold) {
            loadMoreData();
        }
        console.log("scroll");

    }

    function loadMoreData() {
        setTimeout(() => {
            setData(prev => [...prev, ...new Array(10)]);
        }, 1000);
    }

    return (
        <div onScroll={handleScroll}>
            {
                data.map((row, index) => {
                    return (
                        <div className="row" key={index}>
                            {index + 1}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default InfiniteScrollDomApi;