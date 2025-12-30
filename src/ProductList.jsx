import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';
import CartItem from './CartItem';

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(true);
  const [addedToCart, setAddedToCart] = useState({});

  /* ---------------- CART FUNCTIONS ---------------- */
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));

    setAddedToCart((prev) => ({
      ...prev,
      [plant.name]: true,
    }));
  };

  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  /* ---------------- NAV FUNCTIONS ---------------- */
  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowPlants(true);
    setShowCart(false);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  /* ---------------- PLANTS DATA ---------------- */
  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: 15
        },
        {
          name: "Spider Plant",
          image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: 12
        }
      ]
    }
    // 👉 You can keep ALL other categories exactly the same
  ];

  /* ---------------- UI ---------------- */
  return (
    <div>
      {/* NAVBAR */}
      <div className="navbar">
        <h2>Paradise Nursery</h2>

        <div className="cart-icon" onClick={handleCartClick}>
          🛒 <span>{calculateTotalQuantity()}</span>
        </div>
      </div>

      {/* CART PAGE */}
      {showCart ? (
        <CartItem onContinueShopping={handleContinueShopping} />
      ) : (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index}>
              <h1>{category.category}</h1>

              <div className="product-list">
                {category.plants.map((plant, idx) => (
                  <div className="product-card" key={idx}>
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="product-image"
                    />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p className="product-cost">${plant.cost}</p>

                    <button
                      className={`product-button ${
                        addedToCart[plant.name] ? 'added' : ''
                      }`}
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                    >
                      {addedToCart[plant.name]
                        ? 'Added to Cart'
                        : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
