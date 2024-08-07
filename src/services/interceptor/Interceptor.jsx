import axios from "axios";
import { useUser } from "../../context/UserContext"
import { useEffect } from "react";
import Swal from "sweetalert2";

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL
})

const useApi = () => {

    const {token, logout} = useUser()

    useEffect(() => {

        const requestInterceptor =  api.interceptors.request.use(

            config => {

                if(token){
                    config.headers.Authorization = token;
                }
                return config;

            } /* Configuramos cuando se cumple la request e incoroporamos a la cabecera el token*/

        )
        const responseInterceptor =  api.interceptors.response.use(
            response => response,
            error => {
                console.log(error);
                //Mostrar mensaje al usuarios

                if (error.response.status === 401){
                    Swal.fire({
                        title:"Error",
                        text: "Sesión vencida o invalida",
                        icon: "error",
                        timer: 1500
                    }).then(() => {
                        logout();
                    })
                }
                //Desloguiarlo si el error en la respuesta fue un status 401
            }
        )

        return () => {
            api.interceptors.request.eject(requestInterceptor)
            api.interceptors.response.eject(responseInterceptor)
        }/* Cuando el efecto finaliza y limpiar un poco la memoria */

    }, [token])

    return api;
} /* Codigo para incorporar a la api header y campo de authorization, ademas manejar alguna posible respuesta. */


export default useApi 