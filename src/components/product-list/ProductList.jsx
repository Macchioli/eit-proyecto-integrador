import { useEffect, useState } from "react";
import ProductCard from "../product-card/ProductCard";
import axios from "axios";
import './ProductList.css'

const URL = import.meta.env.VITE_SERVER_URL;

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
            const {products} = responseAwait.data;
            console.log(products)
            setProducts(products);
    
        }catch(error){
            console.log(error)
        }

    }

    return (
        <>
            <h1 className="list-title">🚀 Cursos & Webinars</h1>

            <div className="card-container">
                {
                    products.map(prod =>  <ProductCard product={prod} key={prod._id} /> )
                }
            </div>

        </>
    )
}