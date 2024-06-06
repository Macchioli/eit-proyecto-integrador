import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrash, faTruckMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from 'react'
import './AdminProduct.css'
import axios from 'axios';
import {useForm } from "react-hook-form"

import { formatTimestampToInputDate, formatTimestampToUserDate } from "../../services/utils/FormatDate";
import Modal from "../../layout/modal/Modal";

const URL = 'https://6622ed703e17a3ac846e40e5.mockapi.io/api';

export default function AdminProduct(){

const [cursos, setCursos] = useState([])
const{register, handleSubmit, setValue , reset, formState: {errors}} = useForm()
const [isOpen, setIsOpen] = useState(false) /* Seteo un estado para el Modal */
const[isEditing, setIsEditing] = useState(false);

    function handleClose(){
        setIsOpen(false)
        reset();
        setIsEditing(false);
    }

    function handleShow(){
        setIsOpen(true)
    }

useEffect(() =>{
    getProducts();
}, [])

async function getProducts(){
    try {
        const response = await axios.get(`${URL}/products`)
        const cursos = response.data;
        setCursos(cursos);

    } catch (error) {
        console.log(error)
    }
}

function handleEditProduct(producto){
        setIsEditing(true)

        // Setear formulario con los datos de mi producto
        setValue("id", producto.id);
        setValue("name", producto.name)
        setValue("price", producto.price)
        setValue("image", producto.image)
        setValue("category", producto.category)
        setValue("description", producto.description)
        setValue("createdAt", formatTimestampToInputDate(producto.createdAt))

        handleShow();
}

function onSubmit(data){
    console.log(data)
    reset();
    handleClose();

    data.createdAt = new Date(data.createdAt).getTime();
    data.price = +data.price;

    if(data.id){
        updateProduct(data)
    }else{
        createProduct(data)
    }
}

async function createProduct(product){
    try {
        const newProduct = await axios.post(`${URL}/products`, product)
        console.log(newProduct)
        getProducts();

    } catch (error) {
        console.log(error)
    }
}

async function updateProduct(product){
    try {
        await axios.put(`${URL}/products/${product.id}`, product)

        // Swal.fire de exito
        getProducts();
        setIsEditing(false);
        reset();

    } catch (error) {
        console.log(error)
    }
}

async function deleteProduct(id){
    try {
        await axios.delete(`${URL}/products/${id}`)

        getProducts();

        /* Swal. fire ... */
    } catch (error) {
        console.log(error)
    }
}


    return (
        <>
            <div className="admin-courses-container">
                <div className="add-btn-container">
                        <button onClick={handleShow}>+ Agregar</button>
                </div>
                <div className="table-container">
                    <table className="admin-courses-table">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Curso / Webinar</th>
                                <th>Descripción</th>
                                <th>Fecha</th>
                                <th>Precio</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cursos.map((curso) => (
                                <tr key={curso.id}>
                                    <td className="td-image"><img className='course-image' src={curso.image} alt="Curso o webinar"/></td>
                                    <td className="td-name">{curso.name}</td>
                                    <td className="td-description">{curso.description}</td>
                                    <td className="td-date">{formatTimestampToUserDate(curso.createdAt) }</td>
                                    <td className="td-price">${curso.price}</td>
                                    <td className="td-actions">
                                        <button className="td-button-edit" onClick={() => handleEditProduct(curso)}><FontAwesomeIcon icon={faEdit}/></button>
                                        <button className="td-button-delete" onClick={()=>{deleteProduct(curso.id)}}><FontAwesomeIcon icon={faTrash}/></button>
                                    </td>
                                </tr>

                            ))}
                            
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="6">Panel de administración de cursos y webinars</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <Modal isOpen={isOpen} handleClose={handleClose} title={isEditing?'Editar curso o webinar' :'Agregar curso o webinar'}> {/* Llamo al modal */}
                    <>
                    
                        <form id="user-form" onSubmit={handleSubmit(onSubmit)}>
                            <input type="hidden" {...register("id")} />
                            <div className="input-group">
                                <label htmlFor="name" className="form-label">Nombre del curso/webinar</label>
                                <input type="text" className="form-control" {...register("name", {required: true, minLength: 3, maxLength: 100})}/>
                                {errors.name?.type === "required" && (
                                <span className="input-error">El campo es requerido</span>
                                )}

                                {(errors.name?.type === "minLength" ||
                                errors.name?.type === "maxLength") && (
                                <span className="input-error">
                                    La cantidad de caracteres es invalida
                                </span>
                                )}
                            </div>
                            <div className="input-group">
                                <label htmlFor="description" className="form-label">Descripción</label>
                                <textarea className="form-control text-area" cols={50} rows={4} {...register("description", {required: true, minLength: 3, maxLength: 500})}/>
                                {errors.description?.type === "required" && (
                                <span className="input-error">El campo es requerido</span>
                                )}

                                {(errors.description?.type === "minLength" ||
                                errors.description?.type === "maxLength") && (
                                <span className="input-error">
                                    La cantidad de caracteres es invalida
                                </span>
                                )}
                            </div>
                            <div className="input-group">
                                <label htmlFor="category" className="form-label">Categoría</label>
                                <select className="form-control" {...register("category", {required: faTruckMedical})}>
                                    <option value="programacion"> Programación </option>
                                    <option value="datos"> Análisis de datos </option>
                                    <option value="marketing"> Marketing digital </option>
                                    <option value="diseno"> Diseño gráfico </option>
                                    <option value="educacion"> Educación </option>
                                    <option value="ingles"> Inglés </option>
                                </select>
                                {errors.category?.type === "required" && (
                                <span className="input-error">El campo es requerido</span>
                                )}
                            </div>
                            <div className="input-group">
                            <label htmlFor="price" className="form-label">Precio</label>
                            <input type="number" className="form-control" {...register("price")}/>
                            </div>
                            <div className="input-group">
                                <label htmlFor="createdAt" className="form-label">Fecha</label>
                                <input type="date" className="form-control" {...register("createdAt")}/>
                            </div>
                            <div className="input-group">
                                <label htmlFor="image" className="form-label">Imagen (URL)</label>
                                <input type="url" className="form-control" {...register("image")}/>
                            </div>
                            <div className="btn-submit-container">
                                <button className="cancel-btn" onClick={handleClose}>Cerrar</button>
                                <button type="submit" className={isEditing? 'edit-btn' : 'submit-btn'} id="btn-submit">
                                    {isEditing? 'Actualizar' : 'Crear'}
                                </button>
                            </div>
                        </form>
                    
                    </>
            </Modal>
        </>
    )
}