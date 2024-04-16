import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    const isAuthenticated = localStorage.getItem('auth') !== null;

    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/" />
    );
}

export default PrivateRoutes;
