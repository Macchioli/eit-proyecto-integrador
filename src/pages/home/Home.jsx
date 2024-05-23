/* import { NavLink } from "react-router-dom"; */
import './Home.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import ProductList from '../../components/product-list/ProductList';

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
            <h1 className="cursos-asincronicos" id="cursos-asincronicos" ref={coursesSection}>Cursos asincrónicos</h1>
            

            <ProductList/>

            {/* <div className="card">
                Producto 1
                <NavLink to="product-detail/1"> Ver más </NavLink>
            </div>
            <div className="card">
                Producto 2
                <NavLink to="product-detail/2" > Ver más </NavLink>
            </div>
            <div className="card">
                Producto 3
                <NavLink to="product-detail/3" > Ver más </NavLink>
            </div> */}
        </>
    )
}