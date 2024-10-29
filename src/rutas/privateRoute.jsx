import { Navigate } from "react-router-dom";

//recibir los hijos con la prop del user del usestate que guarda el usuario
const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('user_prodify'); // Verifica si el usuario está autenticado

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;