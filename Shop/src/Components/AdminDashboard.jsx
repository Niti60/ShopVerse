import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCart';
import ProductForm from './ProductForm';
import { productAPI } from '../services/api';

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll();
      setProducts(response.data.products);
    } catch (err) {
      alert('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productAPI.delete(productId);
        fetchProducts();
        alert('Product deleted successfully');
      } catch (err) {
        alert('Failed to delete product');
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingProduct) {
        await productAPI.update(editingProduct._id, formData);
        alert('Product updated successfully');
      } else {
        await productAPI.create(formData);
        alert('Product created successfully');
      }
      setShowForm(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save product');
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  if (loading) return <div style={styles.message}>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Admin Dashboard</h1>
        <button onClick={handleAddProduct} style={styles.addButton}>
          + Add New Product
        </button>
      </div>

      {products.length === 0 ? (
        <p style={styles.message}>No products yet. Add your first product!</p>
      ) : (
        <div style={styles.grid}>
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
              isAdmin={true}
            />
          ))}
        </div>
      )}

      {showForm && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  },
  title: {
    fontSize: '2rem',
    color: '#2c3e50'
  },
  addButton: {
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold'
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
  }
};

export default AdminDashboard;