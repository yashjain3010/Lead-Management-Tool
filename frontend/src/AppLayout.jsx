import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AppLayout() {
    let location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === "/") {
            navigate("/signin");
        }
    }, [location, navigate]);

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}
