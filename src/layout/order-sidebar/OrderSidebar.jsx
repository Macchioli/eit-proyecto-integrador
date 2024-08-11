import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useOrder } from '../../context/OrderContext';
import './OrderSidebar.css'
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function OrderSidebar(){

	const { order, total, handleChanqeQuantity, removeItem, postOrder, sidebarToggle } = useOrder();

    return (
		<div className={`order-wrapper ${sidebarToggle ? 'active' : ""}`}> 
			<div className="list-container">
				<h2>Orden actual:</h2>
				
				<ul className="order-list">
					{
						order.products.map(product => {
							return (
								<li className='order-item' key={product._id}>
									<img className='order-image' src={`http://localhost:3000/images/products/${product.image}`} alt="" />

									<div className="order-item-name" title={product.name}>
										{product.name}
									</div>
									<div className="order-quantity">
										<input type="number" className='order-quantity-input' 
										value={product.quantity} 
										onChange={(evt) => handleChanqeQuantity(product.product, evt.target.value)}
										min={1}
                                        max={100}
                                        />
									</div>
									<div className="order-subtotal">
										$ {product.price * product.quantity}
									</div>
									<div className="order-actions">
										<FontAwesomeIcon icon={faTrash} 
										title='Eliminar producto'
										onClick={() => removeItem(product.product)} />
									</div>
									
								</li>

							)
						})
					}
				</ul>
			</div>

			<div className="order-finish">
				<div className="total">
					<div className="total-price">
						Total $ <span>{total}</span>
					</div>
				</div>
				<div className="checkout">
					<button className="checkout-btn" onClick={() => postOrder()}>
						Finalizar compra
					</button>
				</div>
			</div>
		</div>
	);
}