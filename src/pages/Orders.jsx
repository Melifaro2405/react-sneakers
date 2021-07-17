import {useEffect, useState} from "react";
import axios from "axios";

import Card from "../components/Card/Card";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get(`https://60ec6683a78dc700178adb0e.mockapi.io/orders`);
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert('Ошибка при запросе заказов');
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>
      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card key={index}{...item} loading={isLoading} />
        ))}
      </div>
    </div>
  );
}

export default Orders;