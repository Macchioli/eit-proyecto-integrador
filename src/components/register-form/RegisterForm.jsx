import { useForm } from 'react-hook-form'
import './RegisterForm.css'
import Swal from 'sweetalert2';

import useApi from "../../services/interceptor/Interceptor";


export default function RegisterForm(){

    const api = useApi();

    const {register, handleSubmit, reset, formState: {errors}} = useForm();


    function onSubmit(data){
        if(data.password !== data.repeatPassword){
            Swal.fire({
                title: "¡Lo sentimos!",
                text: "Las contraseñas ingresadas no coinciden",
                icon: "error"
            })
            reset();
            return
        }

        const formData = new FormData();

        formData.append("id", data.id)
        formData.append("fullname", data.fullname)
        formData.append("email", data.email)
        formData.append("password", data.password)
        formData.append("bornDate", new Date(data.bornDate).getTime())
        formData.append("image", data.image.length ? data.image[0] : undefined)



        registerUser(formData);
    }

    async function registerUser(user){
        try{
            console.log("Register user recibe:", user)
            await api.post(`/users`, user)
            Swal.fire({
                title: "¡Bienvenido/a!",
                text: "Usuario registrado correctamente",
                icon: "success",
                confirmButtonColor: '#2b285b'
              });
            reset();
            
        }
        catch(error){
            Swal.fire({
                title: "¡Lo sentimos!",
                text: "No se pudo procesar el registro.",
                icon: "error"
            })
        }
    }

    return(

        <div className="register-container">
            <h1 className="register-title">Registro</h1>
            <form className="form-register-container" onSubmit={handleSubmit(onSubmit)}>
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
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" {...register("password", {required: true,minLength:8, maxLength:30})}  name="password" id="password" placeholder="Contraseña"/>
                    {errors.password?.type === "required" && (
                    <span className="input-error">El campo es requerido</span>
                    )}
                    {(errors.password?.type === "minLength" ||
                    errors.password?.type === "maxLength") && (
                    <span className="input-error">
                        La cantidad de caracteres es inválida
                    </span>
                    )}
                </div>
                <div className="input-group">
                    <label htmlFor="repeatPassword">Repetir Contraseña</label>
                    <input type="password" {...register("repeatPassword", {required: true, minLength:8, maxLength: 30})} name="repeatPassword" id="repeatPassword" placeholder="Repetir contraseña"/>
                    
                    {errors.password?.type === "required" && (
                    <span className="input-error">El campo es requerido</span>
                    )}
                    {(errors.repeatPassword?.type === "minLength" ||
                    errors.repeatPassword?.type === "maxLength") && (
                    <span className="input-error">
                        La cantidad de caracteres es inválida
                    </span>
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
                                <label htmlFor="image" className="form-label">Imagen</label>
                                <input type="file" accept="image/*" {...register("image")} />
                </div>
                {/* <div className="input-group">
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
                </div> */}
                
                <button type="submit" className="form-button">Registrarme</button>
            </form>
        </div>

    )
}