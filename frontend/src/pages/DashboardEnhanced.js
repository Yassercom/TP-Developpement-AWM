import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ItemContext } from '../context/ItemContext';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { items, loading } = useContext(ItemContext);
  const [currentItem, setCurrentItem] = useState(null);
  const [editing, setEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  // Filter items based on search term
  useEffect(() => {
    if (items) {
      setFilteredItems(
        items.filter(item => 
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      );
    }
  }, [items, searchTerm]);

  return (
    <div className="container mt-4">
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h2 className="card-title">Welcome, {user?.name || 'User'}</h2>
              <p className="lead mb-0">Manage your items in one place</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Items</h5>
              <p className="card-text display-4">{loading ? '...' : items?.length || 0}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Recently Added</h5>
              <p className="card-text">
                {loading ? '...' : items && items.length > 0 ? items[0].title.substring(0, 10) + '...' : 'None'}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">User Since</h5>
              <p className="card-text">
                {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="row mb-4">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button 
                  className="btn btn-outline-secondary" 
                  type="button"
                  onClick={() => setSearchTerm('')}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
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
