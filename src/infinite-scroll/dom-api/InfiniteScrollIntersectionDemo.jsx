import { use, useState } from "react";

function InfiniteScrollIntersectionDemo() {
    const [data, setData] = useState([...new Array(10)]);
    const arrayListRef = useRef([ ]);

    useEffect(() => {
        const observer = new IntersectionObserver(function (entries) {
            console.log("entries", entries);
        });
        arrayListRef.current.forEach((el, index) => {
            observer.observe(el);
        })
    }, [])

    return (
        <div>
            <h2>Infinite Scroll Intersection Observer API</h2>
            {data.map((row, index) => {
                return (
                    <div ref={(el) => (arrayListRef.current[index] = el)} className="row" key={index}>
                        {index + 1}
                    </div>
                )
            })}
        </div>
    )
}

export default InfiniteScrollIntersectionDemo;