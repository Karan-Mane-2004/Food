import React, { useContext } from "react";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";

function FoodItem({ id, name, price, description, image }) {
  const { addToCart } = useContext(StoreContext);

  return (
    <div className="food-item">
      <img src={image} alt={name} className="food-item-image" />
      <div className="food-info">
        <h3>{name}</h3>
        <p>{description}</p>
        <p>${price}</p>
        <button onClick={() => addToCart(id)}>Add to Cart</button>
      </div>
    </div>
  );
}

export default FoodItem;
