import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Example from "./pages/p_example.js";
import Top from "./pages/p_top.js";
import Home from "./pages/p_home.js";
const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/example" element={<Example />} />
                <Route path="/top" element={<Top />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </div>
    );
};

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("app")
);
