import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import removeDecimals from '../../services/utils/FormatNumber'
import './ProductCard.css'
import { faCartShopping, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { useOrder } from '../../context/OrderContext';
import { formatTimestampToUserDate } from '../../services/utils/FormatDate';
import { Link } from 'react-router-dom';
/* import { useOrder } from '../../context/OrderContext'
 */
const URL_IMAGES = import.meta.env.VITE_IMAGES_URL


export default function ProductCard({product}){

    /* const { addOrderItem } = useOrder();
    addOrderItem();  *//* Prueba de contexto en este componente */

    const {addOrderItem} = useOrder();

    return(
        
        
            <div className="card-wrapper">
                    <article className="card">
                        <div className="card-header">
                            {/* <!-- Imagen e iconos --> */}
                            <img className="card-img card-image-1" src={`${URL_IMAGES}/products/${product.image}`} alt={product.name} />
                        </div>
                        <div className="card-main">
                            {/* <!-- Descripcion del producto/servicio --> */}
                            <div className="card-top">
                                <h4 className="card-category">{product.name}</h4>
                                <span className="card-date">{formatTimestampToUserDate(product.createdAt)}</span>
                            </div>
                            <h3 className="card-title">{product.name}</h3>
                            <p className="card-description">{product.description} </p>
                            <div className="card-price">
                                <span className="price">$
                                    {removeDecimals(product.price)}
                                </span>
                                <span className="normal-price"><small>$</small>
                                    {removeDecimals(product.price * 1.1)}
                                </span>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button className="add-to-cart" onClick={() => addOrderItem(product)}>
                                Añadir <FontAwesomeIcon icon={faCartShopping} />
                            </button>
                            <Link to={`/product-detail/${product._id}`}>
                                <button className="more-info">
                                    Más info <FontAwesomeIcon icon={faCircleInfo} />
                                </button>
                            </Link>
                        </div>
                    </article>
                </div>
        
    )
}