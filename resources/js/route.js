import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Example from "./pages/Example";
import Home from './pages/Home';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/example" element={<Example />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("app")
);
