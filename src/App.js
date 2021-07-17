import {useEffect, useState} from "react";
import {Route} from "react-router-dom";
import axios from "axios";
import AppContext from "./context";
import Header from "./components/Header";
import Drawer from "./components/Drawer/";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

import 'macro-css';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const [itemsResponse, cartResponse, favoritesResponse] = await Promise.all([
          axios.get('https://60ec6683a78dc700178adb0e.mockapi.io/items'),
          axios.get('https://60ec6683a78dc700178adb0e.mockapi.io/cart'),
          axios.get('https://60ec6683a78dc700178adb0e.mockapi.io/favorites')
        ]);

        setIsLoading(false);

        setFavorites(favoritesResponse.data);
        setCartItems(cartResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных ;(');
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://60ec6683a78dc700178adb0e.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post('https://60ec6683a78dc700178adb0e.mockapi.io/cart', obj);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
      console.error(error);
    }
  };

  const onRemoveFromCart = async (id) => {
    try {
      setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)));
      await axios.delete(`https://60ec6683a78dc700178adb0e.mockapi.io/cart/${id}`);
    } catch (error) {
      alert('Ошибка при удалении из корзины');
      console.error(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://60ec6683a78dc700178adb0e.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const {data} = await axios.post(`https://60ec6683a78dc700178adb0e.mockapi.io/favorites`, obj)
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в избранное');
      console.error(error);
    }
  };

  const onSearchInput = (evt) => {
    setSearchValue(evt.target.value);
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider value={{
      items,
      cartItems,
      favorites,
      isItemAdded,
      onAddToCart,
      onAddToFavorite,
      setCartOpened,
      setCartItems
    }}>
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onRemove={onRemoveFromCart}
          onClose={() => setCartOpened(false)}
          opened={cartOpened}
        />
        <Header onClickCart={() => setCartOpened(true)}/>

        <Route path="/" exact>
          <Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onSearchInput={onSearchInput}
            onAddToCart={onAddToCart}
            onAddToFavorite={onAddToFavorite}
            isLoading={isLoading}
          />
        </Route>

        <Route path="/favorites" exact>
          <Favorites/>
        </Route>

        <Route path="/orders" exact>
          <Orders/>
        </Route>

      </div>
    </AppContext.Provider>
  );
}

export default App;
