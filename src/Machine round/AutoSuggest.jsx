import { useEffect, useState } from "react";
import "./style.css"

function AutoSuggest() {

    const [input, setInput] = useState("");
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [cache, setCache] = useState({});
    const [activeIndex, setActiveIndex] = useState(-1);

    const fetchData = async () => {
        if (cache[input]) {
            setResults(cache[input]);
            return;
        }
        const data = await fetch("https://dummyjson.com/recipes/search?q=" + input);
        const json = await data.json();
        setResults(json?.recipes);
        setCache(prev => ({ ...prev, [input]: json?.recipes }));
    }

    useEffect(() => {
        if (input.length < 0 && !input.trim()) {
            setResults([]);
            return;
        }
        const timer = setTimeout(fetchData, 300);
        return () => {
            clearTimeout(timer);
        }
    }, [input])

    const handleKeyDown = (e) => {
        if (!results.length) return;

        if (e.key === "ArrowDown") {
            setActiveIndex(prev =>
                prev < results.length - 1 ? prev + 1 : 0
            );
        }

        else if (e.key === "ArrowUp") {
            setActiveIndex(prev =>
                prev > 0 ? prev - 1 : results.length - 1
            );
        }

        else if (e.key === "Enter" || e.key === "Tab") {
            console.log("activeIndex", activeIndex);

            if (activeIndex >= 0) {
                setInput(results[activeIndex].name);
                setShowResults(false);
            }
        }
    };

    return (
        <div className="App">
            <h1>AutoSuggest Search Bar</h1>
            <div>
                <input
                    type="text"
                    className="search-input"
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                        setActiveIndex(-1);
                    }}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowResults(true)}
                    onBlur={() => setShowResults(false)}
                />
            </div>
            {showResults && (
                <div className="result-container">
                    {results?.map((r, index) => (
                        <span
                            className={`result ${index === activeIndex ? "active" : ""}`}
                            key={r.id}
                        >{r.name}
                        </span>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AutoSuggest;