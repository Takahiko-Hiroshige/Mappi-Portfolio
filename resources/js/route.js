import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Example from "./pages/p_example.js";
import Top from "./pages/p_top.js";
import Home from "./pages/p_home.js";
import SampleComponent from "./components/sampleComponent.js";
import ErrorBoundary from "./utils/error_boundary.js";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/example" element={<Example />} />
                <Route path="/top" element={<Top />} />
                <Route path="/home" element={<Home />} />
                {/* <Route path="/sample" element={<SampleComponent />} /> */}
            </Routes>
        </div>
    );
};

ReactDOM.render(
    /**
     * ToDo::ErrorBoundaryの配置箇所検討要
     */
    <ErrorBoundary>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ErrorBoundary>,
    document.getElementById("app")
);
