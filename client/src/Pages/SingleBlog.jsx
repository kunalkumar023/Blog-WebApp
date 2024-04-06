import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SingleBlog = () => {
    const {id} = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/get/blog/${id}`,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
        
        setBlog(res.data);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, [id]); // Add blogItem to the dependency array to re-fetch data when it changes

  return (
    <div className="single-blog">
      <img style={{width:'100%',height:'100vh'}} src={`http://localhost:4000/${blog.thumbnail}`} alt={blog.title} />
      <div className="card-content">
        <h3>{blog.title}</h3>
        <p>{blog.description}</p>
      </div>
    </div>
  );
};

export default SingleBlog;
