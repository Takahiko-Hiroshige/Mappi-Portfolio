/**
 *Created:T.HIROSHIGE
 *Created At:2022/11/08
 */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./utils/error_boundary.js";
import { Provider } from "react-redux";
import { store } from "./_redux/store";
import AxiosErrorModal from "./_modals/m_axios_error_modal.js";
import { AxiosErrorHandleProvider } from "./utils/axios_error_handler.js";
import Header from "./_components/c_header";
/**
 * page component
 */
import Top from "./_pages/p_top.js";
import Home from "./_pages/p_home.js";
import TouristAreaRegister from "./_pages/p_tourist_area_register.js";
import ReactTsparticles from "./_components/common/c_particles.js";
const App = () => {
    return (
        <div>
            <div className="sticky top-0 z-[999]">
                <Header />
            </div>
            <Routes>
                <Route path="/top" element={<Top />} />
                <Route path="/home" element={<Home />} />
                <Route
                    path="/touristAreaRegister"
                    element={<TouristAreaRegister />}
                />
                <Route
                    path="/ReactTsparticles"
                    element={<ReactTsparticles />}
                />
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
