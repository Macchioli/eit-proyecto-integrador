import { useForm } from 'react-hook-form';
import { useUser } from '../../context/UserContext';
import './Login.css'

const URL = import.meta.env.VITE_SERVER_URL;


export default function Login(){

	const {login} = useUser();

	const {register, handleSubmit} = useForm()

	console.log(URL)

	function onLogin(data){
		
		login(data);
	}


    return (
		<div className="login-container">
			<div className="wave"></div>
			<div className="wave"></div>
			<div className="wave"></div>
			<form className="login-form" onSubmit={handleSubmit(onLogin)} >
				<h1>Ingresar</h1>
				<label>Correo electrónico</label>
				<input
					{...register("email", {required:true})}
					type="text"
					placeholder="Correo electrónico"
				/>

				<label>Contraseña</label>
				<input
					{...register("password", {required:true, maxLength:20})}
					type="password"
					placeholder="Contraseña"
				/>

				<button type="submit" className="button">
					Ingresar
				</button>
			</form>
		</div>
	);
}