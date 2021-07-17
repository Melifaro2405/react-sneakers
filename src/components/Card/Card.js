import styles from './Card.module.scss';
import {useContext, useState} from "react";
import AppContext from "../../context";
import Loader from "../../Loader";

function Card({
  id,
  parentId,
  title,
  price,
  imageUrl,
  onFavorite,
  onPlus,
  favorited = false,
  loading = false
}) {

  const { isItemAdded } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(favorited);
  const obj = { id, parentId: id, title, imageUrl, price };

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? <Loader />
      : <>
          <div className={styles.favorite} onClick={onClickFavorite}>
            {onFavorite && <img
              src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"}
              alt="unliked"
            />}
          </div>
          <img width={'100%'} height={135} src={imageUrl} alt="sneakers"/>
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена: </span>
              <b>{price} руб.</b>
            </div>
            {onPlus && <img
              className={styles.plus}
              onClick={onClickPlus}
              src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
              alt="plus"
            />}
          </div>
        </>}
    </div>
  );
}

export default Card;
