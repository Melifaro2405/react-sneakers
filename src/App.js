import 'macro-css';
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import {useEffect, useState} from "react";
import axios from "axios";
import Home from "./pages/Home";
import {Route} from "react-router-dom";
import Favorites from "./pages/Favorites";

function App() {
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    axios.get('https://60ec6683a78dc700178adb0e.mockapi.io/items')
      .then(res => setItems(res.data));
    axios.get('https://60ec6683a78dc700178adb0e.mockapi.io/cart')
      .then(res => setCartItems(res.data));
    axios.get('https://60ec6683a78dc700178adb0e.mockapi.io/favorites')
      .then(res => setFavorites(res.data));
  }, []);

  const onAddToCart = (obj) => {
    axios.post('https://60ec6683a78dc700178adb0e.mockapi.io/cart', obj);
    if (!cartItems.find(item => item.id === obj.id)) {
      setCartItems((prev) => [...prev, obj]);
    } else {
      setCartItems(cartItems.filter(item => item.id !== obj.id));
    }
  };

  const onRemoveFromCart = (id) => {
    axios.delete(`https://60ec6683a78dc700178adb0e.mockapi.io/cart/${id}`)
    setCartItems((prev) => prev.filter(item => item.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`https://60ec6683a78dc700178adb0e.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter(item => item.id !== obj.id));
      } else {
        const {data} = await axios.post(`https://60ec6683a78dc700178adb0e.mockapi.io/favorites`, obj)
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в избранное');
    }
  };

  const onSearchInput = (evt) => {
    setSearchValue(evt.target.value);
  }

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer items={cartItems} onRemove={onRemoveFromCart} onClose={() => setCartOpened(false)}/>
      )}

      <Header onClickCart={() => setCartOpened(true)}/>

      <Route path="/" exact>
        <Home
          items={items}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onSearchInput={onSearchInput}
          onAddToCart={onAddToCart}
          onAddToFavorite={onAddToFavorite}
        />
      </Route>

      <Route path="/favorites" exact>
        <Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
      </Route>
    </div>
  );
}

export default App;
