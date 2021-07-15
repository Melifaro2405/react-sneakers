import Card from "../components/Card";

function Favorites({items, onAddToFavorite}) {
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки</h1>
      </div>
      <div className="d-flex flex-wrap">
        {items && items
          .map((item, index) => (
            <Card
              key={index}
              {...item}
              favorited={true}
              onFavorite={(obj) => onAddToFavorite(obj)}
              // onPlus={(obj) => onAddToCart(obj)}
            />
          ))}
      </div>
    </div>
  );
}

export default Favorites;