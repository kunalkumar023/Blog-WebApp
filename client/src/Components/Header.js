import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const Navigate = useNavigate();
    const token = localStorage.getItem("token");
 
    const handleLogut =()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        Navigate("/login")
    }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <h5 className="navbar-brand">BlogApp</h5>
      <Link className="navbar-brand" to="/">Home</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/add-blog">Add Blog</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/add-category">Add Category</Link>
          </li>

          { token && token!==null?
          <>
       
          <li className="nav-item">
            <button onClick={handleLogut} className="nav-link" to="/logut">Logout</button>
          </li></>
          :
          <>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
          </li></>
}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
