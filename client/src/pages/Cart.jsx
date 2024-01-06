import {useContext} from 'react';
import {ShopContext} from '../contexts/Shop.context';

export default function Cart() {
  const Shop = useContext(ShopContext);
  if (Shop === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  const {coursesToBuy, loading, checkout} = Shop;

  return (
    <div className="container mt-5">
      <h2>Cart</h2>
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : coursesToBuy.length > 0 ? (
        <ul className="list-group">
          {coursesToBuy.map((item, index) => (
            <li key={index} className="list-group-item">
              {item.course_name} for {item.quantity} days - $
              {(item.course_price * item.quantity).toFixed(2)}
            </li>
          ))}
          <li className="list-group-item">
            <button className="btn btn-success" onClick={checkout}>
              Checkout
            </button>
          </li>
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}
