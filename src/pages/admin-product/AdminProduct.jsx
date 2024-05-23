// import { Navigate } from "react-router-dom";

export default function AdminProduct(){


    /* Evito lo siguiente porque lo hace el guard: */
    // const isAdmin = false;

    // if(!isAdmin){
    //     return <Navigate to="/" />
    // } /* Agrego un controlador para saber si es admin para no permitir la carga del componente */

    return (
        <>
            <h1>Admin Product</h1>
        </>
    )
}