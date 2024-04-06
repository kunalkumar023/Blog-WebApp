import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:4000/get/allblogs", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(res.data)
        if (Array.isArray(res.data)) {
          setBlogs(res.data);
        } else {
          console.error('Invalid data structure:', res.data);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchAllBlogs();
  }, []);

  const myStyle={
    width:'50%',
    height:'40%',
    display:'flex',
    allignitem:'center',
    marginLeft:"300px",
    marginBottom:"50px",
    cursor:"pointer"
  }
  const desStyle={
    textDecoration: 'none',
  }
  return (
    <div className="card-list">
      {blogs && blogs.length > 0 ? (
        blogs.map((item) => (
          <Link to={{ pathname: `/get/blog/${item._id}`, state: { blogItem: item._id } }} key={item._id} className="card-link" style={{ textDecoration: 'none' }}>
          <div style={myStyle} key={item._id} className="card" >
            <img src={`http://localhost:4000/${item.thumbnail}`} alt={item.title} />
            <div style={desStyle} className="card-content">
              <h3>{item.title}</h3>
              <p >{item.description.split('\n').slice(0,5)}</p>
            </div>
          </div>
          </Link>
        ))
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
};

export default Home;
