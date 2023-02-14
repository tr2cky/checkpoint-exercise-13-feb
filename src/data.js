import React, { useEffect, useState, useRef } from "react";

const API_BASE_URL = "http://localhost:3001/";

function Data() {
    const [text, setText] = useState("");
    const [posts, setPosts] = useState([]);
    const [editedTexts, setEditedTexts] = useState({});
    const inputRef = useRef(null);


    const getPosts = async () => {
        const response = await fetch(API_BASE_URL + "api/posts");
        const data = await response.json();
        setPosts(data);
    };

    const inputHandler = (event) => {
        const data = event.target.value;
        setText(data);
    }


    const submitHandler = async (event) => {
        event.preventDefault();
        const response = await fetch(API_BASE_URL + "api/posts", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: text }),
        });
        console.log(response)
        getPosts();
        inputRef.current.value = "";
        setText("");
    }

    const deleteHandler = async (id) => {
        const response = await fetch(API_BASE_URL + "api/posts/" + id, {
            method: "DELETE"
        });
        const result = await response.json();
        console.log(result)
        getPosts();
    }

    const editHandler = async (id, text) => {
        const response = await fetch(API_BASE_URL + "api/posts/" + id, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: text }),
        });
        const result = await response.json();
        console.log(result);
        setEditedTexts({
        ...editedTexts,
        [id]: undefined,
    });
    }

    useEffect(() => {
        getPosts();
    }, []);



    return (
        <div>
            <form onSubmit={submitHandler}>
                <input type="text" ref={inputRef} onChange={inputHandler} placeholder="Type something" />
                <button>Save</button>
            </form>
            <div>
                <h2>Posts:</h2>
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <p contentEditable onInput={(event) => setEditedTexts({ ...editedTexts, [post.id]: event.target.innerText })}>{post.text}</p> <button onClick={() => editHandler(post.id, editedTexts[post.id] || post.text)}>Update</button> <button onClick={() => deleteHandler(post.id)}>Delete</button>

                            <p>{new Date(post.timestamp).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Data;