import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCart from './ProductCart';
import { productAPI, cartAPI } from '../services/api.js';

function ProductList({ user }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll();
      setProducts(response.data.products);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await cartAPI.addToCart(productId, 1);
      alert('Product added to cart!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add to cart');
    }
  };

  if (loading) return <div style={styles.message}>Loading products...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>All Products</h1>
      {products.length === 0 ? (
        <p style={styles.message}>No products available</p>
      ) : (
        <div style={styles.grid}>
          {products.map((product) => (
            <ProductCart
              key={product._id}
              product={product}
              onAddToCart={handleAddToCart}
              isAdmin={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem'
  },
  title: {
    fontSize: '2rem',
    marginBottom: '2rem',
    color: '#2c3e50',
    textAlign: 'center'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem'
  },
  message: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#7f8c8d',
    marginTop: '3rem'
  },
  error: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#e74c3c',
    marginTop: '3rem'
  }
};

export default ProductList;