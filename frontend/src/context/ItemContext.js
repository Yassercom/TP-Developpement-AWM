import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

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
          const res = await axios.get('http://localhost:5000/api/items');
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
      const res = await axios.post('http://localhost:5000/api/items', formData);
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
      const res = await axios.put(`http://localhost:5000/api/items/${id}`, formData);
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
      await axios.delete(`http://localhost:5000/api/items/${id}`);
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
