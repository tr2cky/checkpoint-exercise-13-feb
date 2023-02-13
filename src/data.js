import React, { useState } from "react";

const API_BASE_URL = "http://localhost:3001/";

function Data() {
    const [text, setText] = useState("");
    const [id, setId] = useState(0);

    const inputHandler = (event) => {
        const data = event.target.value;
        setText(data);
    }

    const posts = []

    const clickHandler = async (event) => {
        setId(id + 1);
        const response = await fetch(API_BASE_URL + "api/posts", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id, text: text, timestamp: Date.now() }),
        });
        console.log(response)
        posts.push(response)
    }

    return (
        <div>
            <input type="text" onChange={inputHandler} placeholder="Type something" />
            <button onClick={clickHandler}>Save</button>

            <div>
                Posts:
            </div>
        </div>
    );
}

export default Data;