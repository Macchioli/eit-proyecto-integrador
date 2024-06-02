import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import './OrderContext.css'

const OrderContext = createContext() /* Me provee react para crear el contexto */

// eslint-disable-next-line react-refresh/only-export-components
export const useOrder = () => useContext(OrderContext) /* Hook de react a partir de la variable que le decimos que cree un contexto (OrderContext) */

export const OrderProvider = ({children}) =>{ /* Componente que me brinda ciertos servicios a partir del hijo que recibo */


    //Estado de la orden

    const [order, setOrder] = useState(
        JSON.parse(localStorage.getItem("order")) || []
    )
        
    const [count, setCount] = useState(0); /* Asigno un estado de count inicializado en 0 */

    const [sidebarToggle, setSidebarToggle] = useState(false)

    useEffect(()=>{
        calculateTotal();
        calculateCount();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [order]) /* Uso de un efecto cuando un elemento ha sido actualizado Lo que digo aca es que se actualice en base a "order". Alguien hizo set order? ejecutamos nuevamente la función una vez que el elemento se pinto */

    const [total, setTotal] = useState(0)

    function calculateTotal(){
        
        let totalCount = 0;

        order.forEach(prod =>{
            totalCount += prod.price * prod.quantity
        })

        setTotal(totalCount)
    }

    function calculateCount(){
        let count = 0;
        order.forEach((prod)=> count += prod.quantity)

        setCount(count);
    }

    //Function Agregar producto

    function addOrderItem(producto){

       // Buscar en la orden si existe el producto y si existe añadimos 1 a quantity
       // Si no existe lo añadimos al array

       const product = order.find(prod => prod.id === producto.id) 
       
       if(product){
        handleChanqeQuantity(product.id, product.quantity + 1)
       }
       else{
        producto.quantity = 1;

        setOrder([...order, producto]) /* Un array nuevo con todo lo que esta en order mas el producto que recibo */
        localStorage.setItem("order", JSON.stringify([...order, producto]))
        
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: false,

          });
          Toast.fire({
            customClass:{
                container: 'modal-confirm'
            },
            icon: "success",
            title: "Curso añadido a tu orden"
          });


        }        

    }

    function handleChanqeQuantity(id, quantity){
        
        const updatedOrder = order.map(item => {

            if(item.id === id) {

                item.quantity = +quantity;/* Pongo el + para tomarlo transformarlo como número */
            }

            return item;
        })

        setOrder(updatedOrder);
        localStorage.setItem("order", JSON.stringify(updatedOrder))
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: false,
          });
          Toast.fire({
            customClass:{
                container: 'modal-confirm'
            },
            icon: "success",
            title: "Curso añadido a tu orden"
          });


    }

    function removeItem(id){

        Swal.fire({
            title: 'Borrar producto',
            text: '¿Realmente deseas quitar este producto?',
            icon: "warning",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Borrar',
            confirmButtonColor: 'var(--secondary-color)',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: 'var(--primary-color)',
            reverseButtons: true
        }).then(result => {
            if(result.isConfirmed){
                const updOrder = order.filter(prod => prod.id !== id) /* Todos los productos devuelve menos cuando el id del producto es distinto al recibido (el que quiero eliminar) ya que devuelve false */
                setOrder(updOrder);
                localStorage.setItem("order", JSON.stringify(updOrder))
            }
        })
    }

    function toggleSidebarOrder(){
        setSidebarToggle(!sidebarToggle)
    }

    return(
        <OrderContext.Provider value={{ order, addOrderItem, total, handleChanqeQuantity, removeItem, toggleSidebarOrder, sidebarToggle, count }} >

            {children}

        </OrderContext.Provider> /* Componente que devuelvo con el provider que me lo ofrece el context */
    )

}