import RegisterForm from "../../components/register-form/RegisterForm";
import registerImg from '/src/assets/images/register-img.png'
import './Register.css'

export default function Register(){

    return(

        <div className="main-register">
            <RegisterForm/>
            <div className="img-container">
                <img className="register-img" src={registerImg}/>
            </div>
        </div>
        

    )
}