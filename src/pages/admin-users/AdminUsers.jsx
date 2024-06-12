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

const URL = 'https://6622ed703e17a3ac846e40e5.mockapi.io/api';

export default function AdminUsers(){
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
            const response = await axios.get(`${URL}/users`)
            const usuarios = response.data;
            setUsers(usuarios);
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    
    function handleEditUser(usuario){
            setIsEditing(true)
    
            // Setear formulario con los datos de mi producto
            setValue("id", usuario.id);
            setValue("name", usuario.name)
            setValue("lastname", usuario.lastname)
            setValue("email", usuario.email)
            setValue("location", usuario.location)
            setValue("bornDate", formatTimestampToInputDate(usuario.bornDate))
    
            handleShow();
    }
    
    function onSubmit(data){
        console.log(data)
        reset();
        handleClose();
    
        data.bornDate = new Date(data.bornDate).getTime();
        
    
        if(data.id){
            updateUser(data)
        }else{
            createUser(data)
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
            await axios.put(`${URL}/users/${user.id}`, user)
    
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
                        await axios.delete(`${URL}/users/${id}`)
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
                    <div className="add-btn-container">
                            <button onClick={handleShow}>+ Agregar</button>
                    </div>
                    <div className="table-container">
                        <table className="admin-users-table">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Email</th>
                                    <th>Fecha de nacimiento</th>
                                    <th>Ubicación</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="td-name">{user.name}</td>
                                        <td className="td-lastname">{user.lastname}</td>
                                        <td className="td-description">{user.email}</td>
                                        <td className="td-date">{formatTimestampToUserDate(user.bornDate) }</td>
                                        <td className="td-description">{user.location}</td>
                                        <td className="td-actions">
                                            <button className="td-button-edit" onClick={() => handleEditUser(user)}><FontAwesomeIcon icon={faEdit}/></button>
                                            <button className="td-button-delete" onClick={()=>{deleteUser(user.id)}}><FontAwesomeIcon icon={faTrash}/></button>
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
                                    <label htmlFor="name" className="form-label">Nombre</label>
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
                                    <label htmlFor="lastname" className="form-label">Apellido</label>
                                    <input type="text" className="form-control" {...register("lastname", {required: true, minLength: 3, maxLength: 100})}/>
                                    {errors.lastname?.type === "required" && (
                                    <span className="input-error">El campo es requerido</span>
                                    )}
    
                                    {(errors.lastname?.type === "minLength" ||
                                    errors.lastname?.type === "maxLength") && (
                                    <span className="input-error">
                                        La cantidad de caracteres es invalida
                                    </span>
                                    )}
                                </div>
                                <div className="input-group">
                                    <label htmlFor="email">E-mail</label>
                                    <input type="email" {...register("email", {
                                        required:true,
                                        pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                                    })} name="email" id="email" placeholder="Ingrese su email" />
                                    {errors.email?.type === "required" && (
                                    <span className="input-error">El campo es requerido</span>
                                    )}
                                    {errors.email?.type === "pattern" && (
                                    <span className="input-error">Ingrese un email válido</span>
                                    )}
                                </div>
                                <div className="input-group">
                                    <label htmlFor="birth-date"> Fecha de nacimiento</label>
                                    <input type="date" {...register("bornDate",{required:true})}/>
                                    {errors.bornDate?.type === "required" && (
                                    <span className="input-error">El campo es requerido</span>
                                    )}
                                </div>
                                <div className="input-group">
                                    <label htmlFor="location">Seleccione su provincia</label>
                                    <select {...register("location", {required: true})} name="location">
                                        <option value="Buenos Aires">Buenos Aires</option>
                                        <option value="CABA">Ciudad Autónoma de Buenos Aires</option>
                                        <option value="Catamarca">Catamarca</option>
                                        <option value="Chaco">Chaco</option>
                                        <option value="Chubut">Chubut</option>
                                        <option value="Córdoba">Córdoba</option>
                                        <option value="Corrientes">Corrientes</option>
                                        <option value="Entre Ríos">Entre Ríos</option>
                                        <option value="Formosa">Formosa</option>
                                        <option value="Jujuy">Jujuy</option>
                                        <option value="La Pampa">La Pampa</option>
                                        <option value="La Rioja">La Rioja</option>
                                        <option value="Mendoza">Mendoza</option>
                                        <option value="Misiones">Misiones</option>
                                        <option value="Neuquén">Neuquén</option>
                                        <option value="Río Negro">Río Negro</option>
                                        <option value="Salta">Salta</option>
                                        <option value="San Juan">San Juan</option>
                                        <option value="San Luis">San Luis</option>
                                        <option value="Santa Cruz">Santa Cruz</option>
                                        <option value="Santa Fe">Santa Fe</option>
                                        <option value="Santiago del Estero">Santiago del Estero</option>
                                        <option value="Tierra del Fuego">Tierra del Fuego</option>
                                        <option value="Tucumán">Tucumán</option>
                                    </select>
                                    {errors.location?.type === "required" && (
                                    <span className="input-error">El campo es requerido</span>
                                    )}
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