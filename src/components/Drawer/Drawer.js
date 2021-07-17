import axios from "axios";
import {useState} from "react";

import Info from "../Info";
import useCart from "../hooks/useCart";

import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((resolve => setTimeout(resolve, ms)));

function Drawer({onClose, onRemove, items = [], opened}) {

  const {cartItems, setCartItems, totalPrice} = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isOrderComplete, setIsOrderComplete] = useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const {data} = await axios.post(`https://60ec6683a78dc700178adb0e.mockapi.io/orders`, {items: cartItems});

      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++ ) {
        const item = cartItems[i];
        await axios.delete(`https://60ec6683a78dc700178adb0e.mockapi.io/cart/${item.id}`);
        await delay(1000);
      }

    } catch (error) {
      alert('Ошибка при создании заказа :(');
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Корзина <img className={styles.removeBtn} onClick={onClose} src="/img/btn-remove.svg" alt="remove"/>
        </h2>

        {items.length > 0 ?
          <div className="d-flex flex-column flex">
            <div className={styles.items}>
              {items.map(({id, title, price, imageUrl}) => (
                <div key={id} className={styles.cartItem}>
                  <div
                    style={{backgroundImage: `url(${imageUrl})`}}
                    className={styles.cartItemImg}/>
                  <div className="mr-20 flex">
                    <p className="mb-5">{title}</p>
                    <b>{price} руб.</b>
                  </div>
                  <img onClick={() => onRemove(id)} className={styles.removeBtn} src="/img/btn-remove.svg"
                       alt="remove"/>
                </div>
              ))}
            </div>
            <div className={styles.cartTotalBlock}>
              <ul>
                <li>
                  <span>Итого:</span>
                  <div/>
                  <b>{totalPrice} руб. </b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div/>
                  <b>{Math.floor(totalPrice * 0.05)} руб. </b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className={styles.greenButton}>
                Оформить заказ<img src="/img/arrow.svg" alt="arrow"/>
              </button>
            </div>
          </div>
          : <Info
            title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
            image={isOrderComplete ? '/img/complete-order.jpg' : '/img/empty-cart.jpg'}
            description={isOrderComplete
              ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
              : `Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.`}
          />
        }
      </div>
    </div>
  );
}

export default Drawer;