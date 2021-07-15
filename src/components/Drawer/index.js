import styles from './Drawer.module.scss';

function Drawer({onClose, onRemove, items = []}) {
  return (
    <div className={styles.overlay}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Корзина <img className={styles.removeBtn} onClick={onClose} src="/img/btn-remove.svg" alt="remove"/>
        </h2>

        {
          items.length > 0 ?
            <>
              <div className={styles.items}>
                {items.map(({id, title, price, imageUrl}, index) => (
                  <div key={index} className={styles.cartItem}>
                    <div
                      style={{backgroundImage: `url(${imageUrl})`}}
                      className={styles.cartItemImg}/>
                    <div className="mr-20 flex">
                      <p className="mb-5">{title}</p>
                      <b>{price} руб.</b>
                    </div>
                    <img onClick={() => onRemove(id)} className={styles.removeBtn} src="/img/btn-remove.svg" alt="remove"/>
                  </div>
                ))}
              </div>
              <div className={styles.cartTotalBlock}>
                <ul>
                  <li>
                    <span>Итого:</span>
                    <div/>
                    <b>21 498 руб. </b>
                  </li>
                  <li>
                    <span>Налог 5%:</span>
                    <div/>
                    <b>1074 руб. </b>
                  </li>
                </ul>
                <button className={styles.greenButton}>
                  Оформить заказ
                  <img src="/img/arrow.svg" alt="arrow"/>
                </button>
              </div>
            </>
          : <div className={styles.cartEmpty}>
          <img className="mb-20" width="120px" height="120px" src="/img/empty-cart.jpg" alt="empty-cart"/>
          <h2>Корзина пустая</h2>
          <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ</p>
          <button onClick={onClose} className={styles.greenButton}>
          <img src="/img/arrow.svg" alt="arrow"/>Вернуться назад
          </button>
          </div>
        }
      </div>
    </div>
  );
}

export default Drawer;