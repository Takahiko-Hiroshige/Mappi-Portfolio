import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Example from "./pages/p_example.js";
import Top from "./pages/p_top.js";
import Home from "./pages/p_home.js";
import ErrorBoundary from "./utils/error_boundary.js";
import TouristAreaList from "./layouts/l_tourist_area_list.js";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AxiosErrorModal from "./modals/common/axios_error_modal.js";
import { AxiosErrorHandleProvider } from "./utils/axios_error_handler.js";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/example" element={<Example />} />
                <Route path="/top" element={<Top />} />
                <Route path="/home" element={<Home />} />
                <Route path="/touristAreaList" element={<TouristAreaList />} />
            </Routes>
        </div>
    );
};

ReactDOM.render(
    /**
     * ToDo::ErrorBoundaryの配置箇所検討要
     * ToDo::AxiosErrorModalの配置箇所検討要
     */
    <ErrorBoundary>
        <BrowserRouter>
            <Provider store={store}>
                <AxiosErrorHandleProvider>
                    <AxiosErrorModal />
                    <App />
                </AxiosErrorHandleProvider>
            </Provider>
        </BrowserRouter>
    </ErrorBoundary>,
    document.getElementById("app")
);
