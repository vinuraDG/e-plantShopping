import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';
import CartItem from './CartItem';

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const IMAGE_1 = "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg";
  const IMAGE_2 = "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg";


  /* ---------------- CART ---------------- */
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({
      ...prev,
      [plant.name]: true,
    }));
  };

  const calculateTotalQuantity = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleContinueShopping = () => setShowCart(false);

  /* ---------------- PLANTS DATA (18 ITEMS) ---------------- */
  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: IMAGE_1, description: "Improves indoor air quality.", cost: 15 },
        { name: "Spider Plant", image: IMAGE_2, description: "Removes toxins from air.", cost: 12 },
        { name: "Peace Lily", image: IMAGE_1, description: "Purifies air naturally.", cost: 18 },
        { name: "Boston Fern", image: IMAGE_2, description: "Adds humidity to air.", cost: 20 },
        { name: "Rubber Plant", image: IMAGE_1, description: "Easy-care indoor plant.", cost: 17 },
        { name: "Aloe Vera", image: IMAGE_2, description: "Healing and air purifying.", cost: 14 },
      ],
    },
    {
      category: "Aromatic Plants",
      plants: [
        { name: "Lavender", image: IMAGE_1, description: "Relaxing fragrance.", cost: 20 },
        { name: "Jasmine", image: IMAGE_2, description: "Sweet calming aroma.", cost: 18 },
        { name: "Rosemary", image: IMAGE_1, description: "Fresh herbal scent.", cost: 15 },
        { name: "Mint", image: IMAGE_2, description: "Cooling fragrance.", cost: 12 },
        { name: "Lemon Balm", image: IMAGE_1, description: "Citrus calming scent.", cost: 14 },
        { name: "Hyacinth", image: IMAGE_2, description: "Strong floral aroma.", cost: 22 },
      ],
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: IMAGE_1, description: "Thrives in low light.", cost: 25 },
        { name: "Pothos", image: IMAGE_2, description: "Grows anywhere.", cost: 10 },
        { name: "Cast Iron Plant", image: IMAGE_1, description: "Extremely hardy.", cost: 20 },
        { name: "Succulents", image: IMAGE_2, description: "Needs little water.", cost: 18 },
        { name: "Aglaonema", image: IMAGE_1, description: "Colorful foliage.", cost: 22 },
        { name: "Money Plant", image: IMAGE_2, description: "Good luck plant.", cost: 16 },
      ],
    },
  ];
  

  /* ---------------- UI ---------------- */
  return (
    <div>
      {/* NAVBAR */}
      <div className="navbar">
        <h2 className="logo">🌿 Paradise Nursery</h2>
        <div className="cart-icon" onClick={() => setShowCart(true)}>
          🛒 <span className="cart-count">{calculateTotalQuantity()}</span>
        </div>
      </div>

      {showCart ? (
        <CartItem onContinueShopping={handleContinueShopping} />
      ) : (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index}>
              <h2 className="category-title">{category.category}</h2>

              <div className="product-list">
                {category.plants.map((plant, idx) => (
                  <div className="product-card" key={idx}>
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p className="price">${plant.cost}</p>

                    <button
                      className={`product-button ${addedToCart[plant.name] ? 'added' : ''}`}
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                    >
                      {addedToCart[plant.name] ? 'Added ✔' : 'Add to Cart'}
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
