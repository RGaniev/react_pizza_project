import React from "react";
import axios from "axios";

import { useParams } from "react-router-dom";

const FullPizza = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://65e4af233070132b3b252039.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Произошла ошибка при получении пиццы");
      }
    }

    fetchPizza();
  }, [id]);

  // Пока не пришёл ответ от бэкенда
  if (!pizza) {
    return "Загрузка...";
  }

  return (
    <div>
      <img src={pizza.imageUrl} alt="pizza" />
      <h2>{pizza.title}</h2>
      <h4>от {pizza.price} ₽</h4>
    </div>
  );
};

export default FullPizza;
