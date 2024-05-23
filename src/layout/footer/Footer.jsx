import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Footer.css';
import { faEnvelope, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faInstagram, faSquareFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export default function Footer(){

    return (
        <footer className="main-footer">
            <section className="footer-section footer-brand">
                <img src="/src/assets/images/logo_guri_footer.png" className="footer-logo" alt="logo footer guri"/>
            </section>
            <section className="footer-section footer-social">
                <a className="footer-social-link" href="https://instagram.com/guri.arg" target="_blank"><FontAwesomeIcon icon={faInstagram} size='2xl' /></a>
                <a className="footer-social-link" href="https://www.facebook.com/profile.php?id=100067053930553" target="_blank"><FontAwesomeIcon icon={faSquareFacebook} size="2xl" /></a>
                <a className="footer-social-link" href="https://api.whatsapp.com/message/7FM5IID6AOEPD1?autoload=1&app_absent=0" target="_blank"><FontAwesomeIcon icon={faWhatsapp} size="2xl" /></a>
                <a className="footer-social-link" href="mailto:hola@guri.ar" target="_blank"><FontAwesomeIcon icon={faEnvelope} size="2xl" /></a>
            </section>
            <section className="footer-section footer-contact">
                <label className="newsletter">¡Suscribite a nuestras novedades!</label>
                <div className="suscribe">
                    <input className="email" type="email" />
                    <button className="btn-newsletter" type="submit"> <FontAwesomeIcon icon={faPaperPlane} /> </button>
                </div>
            </section>
        </footer>
    )
}