/* import { NavLink } from "react-router-dom"; */
import './Home.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faEarthAmericas, faHeadset } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import ProductList from '../../components/product-list/ProductList';
import { faCreditCardAlt } from '@fortawesome/free-regular-svg-icons';

export default function Home(){

    const coursesSection = useRef(null);

    const scrollToSection = () => {
        const offset = 70;
        const sectionTop = coursesSection.current.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: sectionTop - offset, behavior: 'smooth' });
      };
    return (
        <>

            <section className="main-banner">
                <picture>
                    <video src="/src/assets/videos/banner-desktop.mp4" className="banner-desktop"  autoPlay loop muted></video>
                    <video src="/src/assets/videos/banner-mobile.mp4" className="banner-mobile" autoPlay loop muted ></video>
                </picture>
                <div className="banner-info">
                    <h1>Tu futuro en línea</h1>
               
                    <button onClick={scrollToSection} className="btn-cta"><FontAwesomeIcon className="icon" icon={faChevronDown} size="lg"/></button>
               

                </div>
            </section>
            <div className="cursos-asincronicos" id="cursos-asincronicos" ref={coursesSection}>
                <ProductList/>
            </div>
            <section className="our-services">
                <div className="payment">
                    <FontAwesomeIcon icon={faCreditCardAlt} />
                    <h2>Todos los medios de pago</h2>
                </div>
                <div className="support">
                <FontAwesomeIcon icon={faHeadset} />
                    <h2>Soporte 24/7</h2>
                </div>
                <div className="locations">
                    <FontAwesomeIcon icon={faEarthAmericas} />
                    <h2>De Buenos Aires al  Mundo </h2>
                </div>
            </section>


            
        </>
    )
}