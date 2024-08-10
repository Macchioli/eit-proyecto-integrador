import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faSpinner, faTrash, faTruckMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from 'react'
import './AdminProduct.css'
import {useForm } from "react-hook-form"

import { formatTimestampToInputDate, formatTimestampToUserDate } from "../../services/utils/FormatDate";
import Modal from "../../layout/modal/Modal";
import Swal from "sweetalert2";
import useApi from "../../services/interceptor/Interceptor";



export default function AdminProduct(){

const api = useApi();
const [cursos, setCursos] = useState([])
const{register, handleSubmit, setValue , reset, formState: {errors}} = useForm()
const [isOpen, setIsOpen] = useState(false) /* Seteo un estado para el Modal */
const[isEditing, setIsEditing] = useState(false);
const [loading, setLoading] = useState(true);

const [categories, setCategories] = useState([])


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
    getCategories()
}, [])

if(loading){
    return (
        <div className="loader-container">
            <FontAwesomeIcon className='loader' size='2xl' icon={faSpinner} spin />
        </div>
    )
}

async function getProducts(){
    try {
        const response = await api.get(`/products`)
        const {products} = response.data;
        setCursos(products);
        setLoading(false)
    } catch (error) {
        console.log(error)
    }
}

function handleEditProduct(producto){
        setIsEditing(true)
        // Setear formulario con los datos de mi producto
        setValue("id", producto._id);
        setValue("name", producto.name)
        setValue("price", producto.price)
        // setValue("image", producto.image)
        setValue("category", producto.category._id)
        setValue("description", producto.description)
        setValue("createdAt", formatTimestampToInputDate(producto.createdAt))

        handleShow();
}

function onSubmit(data){
    // reset();
    // handleClose();

    // data.createdAt = new Date(data.createdAt).getTime();
    // data.price = +data.price;

    // if(data.id){
    //     updateProduct(data)
    // }else{
    //     createProduct(data)
    // }

    const formData = new FormData(); /* Para que JS pueda enviar el archivo como tal debo partir desde FormData */

        formData.append("id", data.id)
        formData.append("name", data.name)
        formData.append("price", +data.price)
        formData.append("description", data.description)
        formData.append("image", data.image.length ? data.image[0] : undefined)
        formData.append("createdAt", new Date(data.createdAt).getTime())
        formData.append("category", data.category)  /* Doy el valor correspondiente de forma manual */

        
        reset();
        handleClose();
        if(data.id){
            updateProduct(formData);
        }else{
            createProduct(formData)
        } /* Entro al if si tiene un id ya que estaría editando */

}

async function createProduct(product){
    try {
        console.log("El producto recibido en create product:" , product)
        await api.post(`/products`, product)
        getProducts();
        Swal.fire({
            icon: "success",
            title: "¡Listo!",
            text: `Curso agregado agregado correctamente 🚀`,
            confirmButtonColor: "#2b285b"
        });

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Algo salió mal!",
            text: "No se pudo agregar el curso/webinar",
            confirmButtonColor: "#2b285b"
        });
    }
}

async function updateProduct(productFormData){
    
    try {
        const id = productFormData.get("id")
        await api.put(`/products/${id}`, productFormData)

        getProducts();
        setIsEditing(false);
        reset();
        Swal.fire({
            icon: "success",
            title: "¡Listo!",
            text: `Curso actualizado correctamente`,
            confirmButtonColor: "#2b285b"
        });

    } catch (error){
        Swal.fire({
            icon: "error",
            title: "Algo salió mal!",
            text: "No se pudo actualizar el registro 😪"
        });
    }
}

async function deleteProduct(id){
    try {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Estás por eliminar un curso/webinar",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2b285b",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
            reverseButtons: true
          })
          .then(async (result) => {
                if (result.isConfirmed) {
                    await api.delete(`/products/${id}`)
                    getProducts();
                    Swal.fire({
                        icon: "success",
                        title: "¡Listo!",
                        text: "Curso/webinar eliminado correctamente ♻"
                    });
                }
          })
          .catch(() => {
            Swal.fire({
                icon: "error",
                title: "Algo salió mal!",
                text: "No se pudo eliminar el usuario 😪"
            });
          })

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Algo salió mal!",
            text: "No se pudo eliminar el usuario 😪"
        });
    }
}

async function getCategories(){
    try {
        
        const response = await api.get(`/categories`)

        console.log(response)

        const categoriesDB = response.data.categories;

        setCategories(categoriesDB)

    } catch (error) {
        console.log("Error al obtener categorias:", error)
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
                                <tr key={curso._id}>
                                    <td className="td-image"><img className='course-image' src={`http://localhost:3000/images/products/${curso.image}`} alt="Curso o webinar"/></td>
                                    <td className="td-name">{curso.name}</td>
                                    <td className="td-description">{curso.description}</td>
                                    <td className="td-date">{formatTimestampToUserDate(curso.createdAt) }</td>
                                    <td className="td-price">${curso.price}</td>
                                    <td className="td-actions">
                                        <button className="td-button-edit" onClick={() => handleEditProduct(curso)}><FontAwesomeIcon icon={faEdit}/></button>
                                        <button className="td-button-delete" onClick={()=>{deleteProduct(curso._id)}}><FontAwesomeIcon icon={faTrash}/></button>
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
                                <textarea className="form-control text-area" cols={50} rows={4} {...register("description", {required: true, minLength: 3, maxLength: 3000})}/>
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
                                    {/* Obtenidas las categorias pinto con un map las diferentes opciones */}
                                    {
                                        categories.map(category => (
                                            <option value={category._id} key={category._id}>{category.viewValue}</option>
                                        ))
                                    }
                                </select>
                                {errors.category?.type === "required" && (
                                <span className="input-error">El campo es requerido</span>
                                )}
                            </div>
                            <div className="input-group">
                            <label htmlFor="price" className="form-label">Precio</label>
                            <input type="number" className="form-control" {...register("price")} min={1}/>
                            </div>
                            <div className="input-group">
                                <label htmlFor="createdAt" className="form-label">Fecha</label>
                                <input type="date" className="form-control" {...register("createdAt")}/>
                            </div>
                            <div className="input-group">
                                <label htmlFor="image" className="form-label">Imagen</label>
                                <input type="file" accept="image/*" {...register("image")} />
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