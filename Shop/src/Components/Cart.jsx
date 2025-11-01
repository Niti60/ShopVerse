import React, { useState, useEffect } from 'react';
import { cartAPI } from '../services/api';

function Cart({ onCartUpdate }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await cartAPI.getCart();
      setCart(response.data.cart);
      onCartUpdate(response.data.cart.items.length);
    } catch (err) {
      console.error('Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      const response = await cartAPI.updateItem(productId, quantity);
      setCart(response.data.cart);
      onCartUpdate(response.data.cart.items.length);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update quantity');
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const response = await cartAPI.removeItem(productId);
      setCart(response.data.cart);
      onCartUpdate(response.data.cart.items.length);
    } catch (err) {
      alert('Failed to remove item');
    }
  };

  const handleCheckout = async () => {
    if (window.confirm('Proceed with checkout?')) {
      try {
        await cartAPI.clearCart();
        alert('Order placed successfully!');
        fetchCart();
      } catch (err) {
        alert('Checkout failed');
      }
    }
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => {
      return total + (item.productId?.price || 0) * item.quantity;
    }, 0).toFixed(2);
  };

  if (loading) return <div style={styles.message}>Loading cart...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Shopping Cart</h1>

      {!cart || cart.items.length === 0 ? (
        <p style={styles.message}>Your cart is empty</p>
      ) : (
        <>
          <div style={styles.items}>
            {cart.items.map((item) => (
              <div key={item._id} style={styles.cartItem}>
                <img
                  src={item.productId?.imageUrl}
                  alt={item.productId?.name}
                  style={styles.image}
                />
                <div style={styles.details}>
                  <h3 style={styles.productName}>{item.productId?.name}</h3>
                  <p style={styles.price}>${item.productId?.price}</p>
                </div>

                <div style={styles.quantityControl}>
                  <button
                    onClick={() => handleUpdateQuantity(item.productId._id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    style={styles.quantityButton}
                  >
                    -
                  </button>
                  <span style={styles.quantity}>{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.productId._id, item.quantity + 1)}
                    disabled={item.quantity >= item.productId?.stock}
                    style={styles.quantityButton}
                  >
                    +
                  </button>
                </div>

                <div style={styles.itemTotal}>
                  ${(item.productId?.price * item.quantity).toFixed(2)}
                </div>

                <button
                  onClick={() => handleRemoveItem(item.productId._id)}
                  style={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div style={styles.summary}>
            <h2 style={styles.totalLabel}>Total: ${calculateTotal()}</h2>
            <button onClick={handleCheckout} style={styles.checkoutButton}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '0 1rem'
  },
  title: {
    fontSize: '2rem',
    marginBottom: '2rem',
    color: '#2c3e50',
    textAlign: 'center'
  },
  message: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#7f8c8d',
    marginTop: '3rem'
  },
  items: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem'
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  image: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '4px'
  },
  details: {
    flex: 1
  },
  productName: {
    fontSize: '1.1rem',
    marginBottom: '0.5rem',
    color: '#2c3e50'
  },
  price: {
    color: '#27ae60',
    fontWeight: 'bold'
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  quantityButton: {
    width: '30px',
    height: '30px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  quantity: {
    fontSize: '1rem',
    fontWeight: 'bold',
    minWidth: '30px',
    textAlign: 'center'
  },
  itemTotal: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    minWidth: '80px',
    textAlign: 'right'
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  summary: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    textAlign: 'right'
  },
  totalLabel: {
    fontSize: '1.5rem',
    color: '#2c3e50',
    marginBottom: '1rem'
  },
  checkoutButton: {
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    padding: '1rem 2rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: 'bold'
  }
};

export default Cart;