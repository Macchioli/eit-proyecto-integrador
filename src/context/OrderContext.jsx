import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import './OrderContext.css'
import { useUser } from "./UserContext";
import useApi from "../services/interceptor/Interceptor";

const OrderContext = createContext() /* Me provee react para crear el contexto */

// eslint-disable-next-line react-refresh/only-export-components
export const useOrder = () => useContext(OrderContext) /* Hook de react a partir de la variable que le decimos que cree un contexto (OrderContext) */

export const OrderProvider = ({children}) =>{ /* Componente que me brinda ciertos servicios a partir del hijo que recibo */


    const {user, token} = useUser()
    const api = useApi();

    const ORDER = {
        user: null,
        products: [],
        total: 0,
    }

    //Estado de la orden

    const [order, setOrder] = useState(
        JSON.parse(localStorage.getItem("order")) || ORDER
    )
       

    const [count, setCount] = useState(0); /* Asigno un estado de count inicializado en 0 */

    const [sidebarToggle, setSidebarToggle] = useState(false)

    useEffect(()=>{
        calculateCount();

    }, [order]) /* Uso de un efecto cuando un elemento ha sido actualizado Lo que digo aca es que se actualice en base a "order". Alguien hizo set order? ejecutamos nuevamente la función una vez que el elemento se pinto */

    const [total] = useState(0)

   
    function calculateTotal(ARRAY_CONTAR){
        
        let totalCount = 0;

        ARRAY_CONTAR.forEach(prod =>{
            totalCount += prod.price * prod.quantity
        })

        return totalCount
    }

    function calculateCount(){
        console.log("Order de calculateCount",order)
        let count = 0;
        order.products.forEach((prod)=> count += prod.quantity)

        setCount(count);
    }


    function addOrderItem(producto){


       const product = order.products.find(prod => prod.product === producto._id) 
       
       if(product){
        
        handleChanqeQuantity(product.product, product.quantity + 1) /* El product.product es en base a la orden product es donde esta el id */
       }
       else{

        const newOrderProduct = {
            product: producto._id,
            quantity: 1,
            price: producto.price,
            image: producto.image,
            name: producto.name /* Agrego name image y price, voy a modificar el estado de la orden pero ademas debo pasarlo para el sidebar */
        }
        const products = [ ...order.products, newOrderProduct]



        const total = calculateTotal(products)

        setOrder({...order, products, total: total});
        }        

    }


    function handleChanqeQuantity(id, quantity){
        

        console.log("ENTRO A CAMBIAR CANTIDAD", id)

        const updProducts = order.products.map(item => {

            if(item.product === id) {

                item.quantity = +quantity;/* Pongo el + para tomarlo transformarlo como número */
            }

            return item;
        })

        const total = calculateTotal(updProducts)
        setOrder({...order, products: updProducts, total});
        // localStorage.setItem("order", JSON.stringify(updProducts))


    }

    /* Función para quitar elemento de mi order */

    function removeItem(id){

        Swal.fire({
            title: 'Borrar producto',
            text: '¿Realmente desea quitar este producto?',
            icon: "warning",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Borrar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then(result => {
            if(result.isConfirmed){
                const products = order.products.filter(prod => prod.product !== id) /* Todos los productos devuelve menos cuando el id del producto es distinto al recibido (el que quiero eliminar) ya que devuelve false */
                
                const total = calculateTotal(products)
                setOrder({...order, products, total});
                // localStorage.setItem("order", JSON.stringify(updOrder))
            }
        })
    }
    async function postOrder(){
        try {
            console.log("Esta es la orden que recibo", order)
            //Chequear si el usuario esta logueado
            if(!user || !token ){
                Swal.fire({
                    title: 'Error',
                    text: 'Debe estar logueado para realizar una orden',
                    icon: 'warning',
                    timer: 4000
                })
                return
            }

            const products = order.products.map(item => {
                return{
                    quantity: item.quantity,
                    product: item.product,
                    price: item.price
                }
            })
            //Armar el objeto order para el backend
            const nuevaOrden = {
                total: order.total,
                user: user._id,
                products 
            }
            
            const response = await api.post("/orders", nuevaOrden)

            if(!response) throw new Error('Error al enviar la orden')
            //Enviarlo
            Swal.fire("Orden creada", "La orden se creó correctamente", "success")

            setOrder(ORDER);


            //REQUERIMIENTO OBLIGATORIO

            const orders = await api.get(`/orders/${user._id}`)

            console.log(orders.data)

        } catch (error) {
            console.log(error)
            Swal.fire("Error", "Error al crear orden", "error")
        }
    }

    function toggleSidebarOrder(){
        setSidebarToggle(!sidebarToggle)
    }

    return(
        <OrderContext.Provider value={{ order, addOrderItem, total, handleChanqeQuantity, removeItem, postOrder, toggleSidebarOrder, sidebarToggle, count }} >

            {children}

        </OrderContext.Provider> /* Componente que devuelvo con el provider que me lo ofrece el context */
    )

}