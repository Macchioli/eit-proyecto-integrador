import { NavLink } from 'react-router-dom';
import './Header.css';
import logo from '/src/assets/images/logo_guri.png'
import userImage from '/src/assets/images/user-img.avif'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useOrder } from '../../context/OrderContext';
import { useUser } from '../../context/UserContext';

export default function Header(){

    const{user, logout} = useUser();
    const {toggleSidebarOrder, count} = useOrder();

    return (

        <>
            <header className='main-header'>
                <input type="checkbox" className="check-menu" id="check-menu" />
                <label className="burger-menu" htmlFor="check-menu">
                    <div className="burger-line"></div>
                </label>
                <div className="header-logo">
                    <img src={logo} alt="Logo de Header" className="header-img" />
                </div>
                <nav className='nav-menu'>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <NavLink to="/" className='nav-link'> <span> Home </span></NavLink> {/* Importo NavLink de libreria router-dom para manejar los links */}
                        </li>
                        <li className="nav-item">
                            <NavLink to='/about-us' className='nav-link'> <span>Acerca de</span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/contact' className='nav-link'> <span>Contacto</span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/register' className='nav-link'><span> Registro </span></NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink to='/login' className='nav-link'><span>Login</span></NavLink>
                        </li> */}
                        {user?.role === "ADMIN_ROLE" &&(
                            <li className="nav-item">
                                <NavLink to='/admin-product' className='nav-link'>
                                    <span>Admin. Product</span>
                                </NavLink>
                            </li>
                        )}
                        {user?.role === "ADMIN_ROLE" &&(
                            <li className="nav-item">
                                <NavLink to='/admin-users' className='nav-link'>
                                    <span>Admin. Users</span>
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </nav>
                <div className="user-info">    
                    <div className="user-data">
                        <div className="nav-item">
                            {user  ? <NavLink className='nav-link' onClick={logout}><span>Logout</span></NavLink>
                            : <NavLink to='/login' className='nav-link'><span>Login </span> </NavLink>
                            }
                        </div>
                        <img className="user-image" src={userImage} alt="" />
                    </div>
                    <div className={`user-cart-container ${count < 1 ? '' : 'show-circle'}`} data-count={count}>
                        <FontAwesomeIcon 
                        className='user-cart'
                        icon={faCartShopping}
                        onClick={()=>toggleSidebarOrder()} 
                        />
                    </div>
                </div>
            </header>
        </>


    )
}