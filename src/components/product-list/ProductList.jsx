import { useEffect, useState } from "react";
import ProductCard from "../product-card/ProductCard";
import axios from "axios";
import './ProductList.css'

const URL = 'https://6622ed703e17a3ac846e40e5.mockapi.io/api';

export default function ProductList(){

    //Generar un estado para nuestros productos []
    const [products, setProducts] = useState([])
    //Hacer un useEffect hacer una petición controlada

    useEffect(()=>{
        getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //Tomar los productos del back

    async function getProducts(){

        try{
            const responseAwait = await axios.get(`${URL}/products`)
            const productsAPI = responseAwait.data;
            setProducts(productsAPI);
    
        }catch(error){
            console.log(error)
        }

    }

    return (
        <>
            <h2>Lista de productos</h2>

            <div className="card-container">
                {
                    products.map(prod => <ProductCard product={prod} key={prod.id} /> )
                }
            </div>

        </>
    )
}