import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from 'react'
import './AdminUsers.css'
import axios from 'axios';
import {useForm } from "react-hook-form"

import { formatTimestampToInputDate, formatTimestampToUserDate } from "../../services/utils/FormatDate";
import Modal from "../../layout/modal/Modal";
import Swal from "sweetalert2";

import useApi from "../../services/interceptor/Interceptor";


export default function AdminUsers(){

    const api = useApi();
    const [users, setUsers] = useState([])
    const{register, handleSubmit, setValue , reset, formState: {errors}} = useForm()
    const [isOpen, setIsOpen] = useState(false) /* Seteo un estado para el Modal */
    const[isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true)
    
        function handleClose(){
            setIsOpen(false)
            reset();
            setIsEditing(false);
        }
    
        function handleShow(){
            setIsOpen(true)
        }
    
    useEffect(() =>{
        getUsers();
    }, [])
    
    if(loading){
        return (
            <div className="loader-container">
                <FontAwesomeIcon className='loader' size='2xl' icon={faSpinner} spin />
            </div>
        )
    }
    
    async function getUsers(){
        try {
            const response = await api.get(`/users`)
            const {users} = response.data;
            setUsers(users);
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    
    function handleEditUser(usuario){
            setIsEditing(true)

            // Setear formulario con los datos de mi producto
            setValue("id", usuario._id);
            setValue("fullname", usuario.fullname)
            setValue("email", usuario.email)
            setValue("bornDate", formatTimestampToInputDate(usuario.bornDate))
            
    
            handleShow();
    }
    
    function onSubmit(data){
        console.log("EN ESTA DATA RECIBO img?", data.image)
        reset();
        handleClose();
    
        
        
        const formData = new FormData();

        formData.append("id", data.id)
        formData.append("fullname", data.fullname)
        formData.append("email", data.email)
        formData.append("bornDate",  new Date(data.bornDate).getTime())
        formData.append("image", data.image.length ? data.image[0] : undefined)
        
        
        console.log(formData.get("image"))
        if(data.id){
            updateUser(formData)
        }else{
            createUser(formData)
        }
    }
    
    async function createUser(usuario){
        try {
            const newUser = await axios.post(`${URL}/users`, usuario)
            getUsers();
            Swal.fire({
                icon: "success",
                title: "¡Listo!",
                text: `${newUser.data.name} agregado correctamente 🚀`,
                confirmButtonColor: "#2b285b"
            });
    
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Algo salió mal!",
                text: "No se pudo agregar el usuario",
                confirmButtonColor: "#2b285b"
            });
        }
    }
    
    async function updateUser(user){
        try {
            const id = user.get("id")
            await api.put(`/users/${id}`, user)
            
            getUsers();
            setIsEditing(false);
            reset();
            Swal.fire({
                icon: "success",
                title: "¡Listo!",
                text: `Usuario ${user.name} actualizado correctamente`,
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
    
    async function deleteUser(id){
        try {
            Swal.fire({
                title: "¿Estás seguro?",
                text: "Estás por eliminar un usuario",
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
                        await api.delete(`/users/${id}`)
                        getUsers();
                        Swal.fire({
                            icon: "success",
                            title: "¡Listo!",
                            text: "Usuario eliminado correctamente ♻"
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
    
    
        return (
            <>
                <div className="admin-users-container">
                    {/* <div className="add-btn-container">
                            <button onClick={handleShow}>+ Agregar</button>
                    </div> */}
                    <div className="table-container">
                        <table className="admin-users-table">
                            <thead>
                                <tr>
                                    <th>Avatar</th>
                                    <th>Usuario</th>
                                    <th>Email</th>
                                    <th>Fecha de nacimiento</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td className="td-image"><img className='user-image' src={`http://localhost:3000/images/products/${user.image}`} alt="Avatar de usuario"/></td>
                                        <td className="td-name">{user.fullname}</td>
                                        <td className="td-description">{user.email}</td>
                                        <td className="td-date">{formatTimestampToUserDate(user.bornDate) }</td>
                                        <td className="td-actions">
                                            <button className="td-button-edit" onClick={() => handleEditUser(user)}><FontAwesomeIcon icon={faEdit}/></button>
                                            <button className="td-button-delete" onClick={()=>{deleteUser(user._id)}}><FontAwesomeIcon icon={faTrash}/></button>
                                        </td>
                                    </tr>
    
                                ))}
                                
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="6">Panel de administración de usuarios</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <Modal isOpen={isOpen} handleClose={handleClose} title={isEditing?'Editar usuario' :'Agregar usuario'}> {/* Llamo al modal */}
                        <>
                        
                            <form id="user-form" onSubmit={handleSubmit(onSubmit)}>
                            <input type="hidden" {...register("id")} />
                            <div className="input-group">
                                <label htmlFor="name">Nombre y apellido</label>
                                <input type="text" {...register("fullname",{
                                        required: true,
                                        minLength: 3,
                                        maxLength: 50,})} name="fullname" id="fullname" placeholder='Ingrese su nombre y apellido'/>
                                {errors.fullname?.type === "required" && (
                                <span className="input-error">El campo es requerido</span>
                                )}

                                {(errors.fullname?.type === "minLength" ||
                                errors.fullname?.type === "maxLength") && (
                                <span className="input-error">
                                    La cantidad de caracteres es inválida
                                </span>
                                )}
                            </div>
                            <div className="input-group">
                                <label htmlFor="email">E-mail</label>
                                <input type="email" {...register("email", {
                                    required:true,
                                    pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                                })} name="email" id="email" placeholder="Ingrese su email" />
                            </div>
                            <div className="input-group">
                                <label htmlFor="birth-date"> Fecha de nacimiento</label>
                                <input type="date" {...register("bornDate",{required:true})}/>
                                {errors.bornDate?.type === "required" && (
                                <span className="input-error">El campo es requerido</span>
                                )}
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