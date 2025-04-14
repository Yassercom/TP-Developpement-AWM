import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="container mt-5">
      <div className="jumbotron text-center">
        <h1 className="display-4">Welcome to CRUD App</h1>
        <p className="lead">
          A simple application to manage your items with full CRUD functionality
        </p>
        <hr className="my-4" />
        <p>
          This application allows you to create, read, update, and delete items after authentication.
        </p>
        {!isAuthenticated ? (
          <div className="d-flex justify-content-center gap-3">
            <Link to="/register" className="btn btn-primary btn-lg">
              Register
            </Link>
            <Link to="/login" className="btn btn-secondary btn-lg">
              Login
            </Link>
          </div>
        ) : (
          <Link to="/dashboard" className="btn btn-success btn-lg">
            Go to Dashboard
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
