import Card from "../components/Card";

function Home({
  items,
  searchValue,
  setSearchValue,
  onSearchInput,
  onAddToCart,
  onAddToFavorite,
  isLoading
}) {

  const renderItems = () => {
    const filtredItems = items && items
      .filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()));

    return (isLoading ? [...Array(12)] : filtredItems).map((item, index) => (
        <Card
          key={index}
          {...item}
          onFavorite={(obj) => onAddToFavorite(obj)}
          onPlus={(obj) => onAddToCart(obj)}
          loading={isLoading}
        />
      ));
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="search"/>
          <input onChange={onSearchInput} value={searchValue} placeholder="Поиск... "/>
          {searchValue &&
          <img
            onClick={() => setSearchValue('')}
            className="removeBtn cu-p"
            src="/img/btn-remove.svg"
            alt="remove"
          />}
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {renderItems()}
      </div>
    </div>
  );
}

export default Home;