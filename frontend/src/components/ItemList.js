import React, { useContext } from 'react';
import { ItemContext } from '../context/ItemContext';

const ItemList = ({ setCurrentItem, setEditing }) => {
  const { items, loading, deleteItem } = useContext(ItemContext);

  const handleEdit = (item) => {
    setCurrentItem(item);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await deleteItem(id);
    }
  };

  if (loading) {
    return <div className="text-center">Loading items...</div>;
  }

  if (items.length === 0) {
    return <div className="alert alert-info">No items found. Please add some!</div>;
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3>Your Items</h3>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
