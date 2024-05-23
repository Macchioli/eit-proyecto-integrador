import { Navigate } from "react-router-dom";

export default function AdminGuard({children}){ /* Desestructurando puedo recibir la prop children */

    const isAdmin = true;

    return isAdmin ? children : <Navigate to="/" replace />; /* replace reemplaza la ruta actual por la del navigate to */
}