import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [currentItem, setCurrentItem] = useState(null);
  const [editing, setEditing] = useState(false);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12 mb-4">
          <h2>Welcome, {user?.name || 'User'}</h2>
          <p className="lead">Manage your items below</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5 mb-4">
          <ItemForm 
            currentItem={currentItem} 
            setCurrentItem={setCurrentItem} 
            setEditing={setEditing} 
          />
        </div>
        <div className="col-md-7">
          <ItemList 
            setCurrentItem={setCurrentItem} 
            setEditing={setEditing} 
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
