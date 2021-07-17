import {useContext} from "react";
import styles from "./Drawer/Drawer.module.scss";
import AppContext from "../context";

function Info({title, image, description}) {
  const {setCartOpened} = useContext(AppContext);

  return (
    <div className={styles.cartEmpty}>
      <img
        className="mb-20"
        width="120px"
        height="120px"
        src={image}
        alt="empty-cart"
      />
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={() => setCartOpened(false)} className={styles.greenButton}>
        <img src="/img/arrow.svg" alt="arrow"/>Вернуться назад
      </button>
    </div>
  );
}

export default Info;