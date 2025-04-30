import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import apiService from '../services/ApiService';

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);

  // Get all items
  useEffect(() => {
    const getItems = async () => {
      if (isAuthenticated) {
        try {
          setLoading(true);
          const res = await apiService.get('/api/items');
          setItems(res.data);
          setError(null);
        } catch (err) {
          setError(err.response?.data?.msg || 'Error fetching items');
        } finally {
          setLoading(false);
        }
      }
    };

    if (isAuthenticated) {
      getItems();
    }
  }, [isAuthenticated]);

  // Add item
  const addItem = async (formData) => {
    try {
      const res = await apiService.post('/api/items', formData);
      setItems([res.data, ...items]);
      setError(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.msg || 'Error adding item');
      return false;
    }
  };

  // Update item
  const updateItem = async (id, formData) => {
    try {
      const res = await apiService.put(`/api/items/${id}`, formData);
      setItems(items.map(item => (item.id === id ? res.data : item)));
      setError(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.msg || 'Error updating item');
      return false;
    }
  };

  // Delete item
  const deleteItem = async (id) => {
    try {
      await apiService.delete(`/api/items/${id}`);
      setItems(items.filter(item => item.id !== id));
      setError(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.msg || 'Error deleting item');
      return false;
    }
  };

  // Clear errors
  const clearErrors = () => setError(null);

  return (
    <ItemContext.Provider
      value={{
        items,
        loading,
        error,
        addItem,
        updateItem,
        deleteItem,
        clearErrors
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};
