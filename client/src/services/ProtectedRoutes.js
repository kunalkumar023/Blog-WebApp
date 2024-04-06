import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes =()=>{
    const token = localStorage.getItem("token")
    return token && token!==null ? <Outlet/>: <> <Navigate to="/login"/></>
}

export default ProtectedRoutes;