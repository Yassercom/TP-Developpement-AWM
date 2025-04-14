import React, { useState, useContext, useEffect } from 'react';
import { ItemContext } from '../context/ItemContext';

const ItemForm = ({ currentItem, setCurrentItem, setEditing }) => {
  const { addItem, updateItem, error, clearErrors } = useContext(ItemContext);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  useEffect(() => {
    if (currentItem) {
      setFormData({
        title: currentItem.title,
        description: currentItem.description
      });
    }
  }, [currentItem]);

  const { title, description } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    clearErrors();

    if (title.trim() === '') {
      alert('Please enter a title');
      return;
    }

    if (currentItem) {
      const success = await updateItem(currentItem.id, formData);
      if (success) {
        setEditing(false);
        setCurrentItem(null);
      }
    } else {
      await addItem(formData);
    }

    // Clear form if not editing
    if (!currentItem) {
      setFormData({
        title: '',
        description: ''
      });
    }
  };

  const cancelEdit = () => {
    setEditing(false);
    setCurrentItem(null);
    setFormData({
      title: '',
      description: ''
    });
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h3>{currentItem ? 'Edit Item' : 'Add Item'}</h3>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={title}
              onChange={onChange}
              placeholder="Enter title"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={description}
              onChange={onChange}
              placeholder="Enter description"
              rows="3"
            ></textarea>
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              {currentItem ? 'Update' : 'Add'}
            </button>
            {currentItem && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;
