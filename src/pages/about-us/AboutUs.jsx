import './AboutUs.css'
import Student from '../../assets/images/student-eit.png'

export default function AboutUs(){

    return(
        <div className="about-us-container">
            <div className="about-us">
                <div className="student">
                    <img className="student-img" src={Student} alt="Estudiante"/>
                    <h2 className="student-name">Macchioli, Nicolás</h2>
                    <h3>Founder</h3>
                </div>
                <div className="about-company">
                    <h2>Sobre Gurí:</h2><br/>
                    <p>Gurí; es un espacio virtual que nació en 2021 para que puedas capacitarte en las áreas de programación, inglés profesional, educación, marketing digital y diseño gráfico.
        
                    Desarrollamos distintos cursos y seminarios que te van a acercar a estos maravillosos mundos de la mano de los mejores profesionales.
                        
                    Podrás disfrutar de nuestras propuestas en su versión en vivo, capacitándote de forma sincrónica, y también, podrás acceder a todos nuestros contenidos de forma asincrónica, para ir a tu ritmo, junto con el material necesario y un/a tutor/a que te acompañará en cada paso.</p>

                    <br/><h2>Sobre Nicolás Macchioli:</h2><br/>
                    <p>Analista en Sistemas Informáticos. Estudiante de Ing. en Sistemas Informáticos. 
                    Más de 12 años de experiencia en la enseñanza de la informática. Fundador de Gurí;. Espacio virtual que brinda cursos on-line de programación para niños y adultos, análisis de datos, marketing digital, diseño gráfico, inglés profesional y educación.</p>
                </div>
            </div>
        </div>
    )
}