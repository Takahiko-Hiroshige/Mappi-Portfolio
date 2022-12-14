/**
 *Created:T.HIROSHIGE
 *Created At:2022/11/08
 */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./error_boundary.js";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AxiosErrorModal from "./modals/m_axios_error_modal.js";
import { AxiosErrorHandleProvider } from "./axios_error_handler.js";
import Header from "./components/c_header";
/**
 * page component
 */
import IndexForDev from "./pages/index_for_dev.js";
import Top from "./pages/p_top.js";
import Home from "./pages/p_home.js";
import SearchBoxSample from "./pages/p_select_box_sample.js";
import TouristAreaRegister from "./pages/p_tourist_area_register.js";

const App = () => {
    return (
        <div>
            <div className="sticky top-0 z-[999]">
                <Header />
            </div>
            <Routes>
                <Route path="/" element={<IndexForDev />} />
                <Route path="/top" element={<Top />} />
                <Route path="/home" element={<Home />} />
                <Route path="/searchBoxSample" element={<SearchBoxSample />} />
                <Route
                    path="/touristAreaRegister"
                    element={<TouristAreaRegister />}
                />
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
