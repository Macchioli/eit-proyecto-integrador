import { useEffect, useState } from 'react'
import './ProductDetail.css'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faDownload } from '@fortawesome/free-solid-svg-icons';
import { useOrder } from '../../context/OrderContext';

const URL = 'https://6622ed703e17a3ac846e40e5.mockapi.io/api'


export default function ProductDetail(){

const [product, setProduct] = useState()
const {id} = useParams();    
const {addOrderItem} = useOrder();

useEffect(() => {
    getProductById(id);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

async function getProductById(id){
    try {
        const response = await axios.get(`${URL}/products/${id}`);
        console.log(response.data)

        // response.data.description = response.data.description.replace(/\./g, '.<br><br>'); //TODO: Preguntar

        setProduct(response.data)

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Algo salió mal!",
            text: "No se pudo agregar el curso/webinar",
            confirmButtonColor: "#2b285b"
        });
    }
}
    return (
        <div className="course-detail-container">
            <div className="course-detail">
                <div className="course-picture">
                    <img src={product?.image} alt="Estudiante"/>
                </div>
                <div className="about-course">
                    <h4>{product?.category}</h4>
                    <h2>{product?.name}</h2>
                    <div className="course-price">
                        <h2> ${product?.price}</h2>
                    </div>
                    <p>{product?.description}</p>
                    <div className="course-actions">
                        <a href="#"><button><FontAwesomeIcon icon={faDownload} /> Descargar Plan de Estudio</button></a>
                        <button onClick={() => addOrderItem(product)}><FontAwesomeIcon icon={faCartShopping} /> Añadir al carrito</button>
                    </div>
                </div>
            </div>
        </div>
    )
}