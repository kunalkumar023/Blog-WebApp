import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SingleFieldForm = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
        const res =await axios.post("http://localhost:4000/add/category",formData,
        {
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`,
            }
        })
        alert(res.data.message)
        navigate("/")
    } catch (error) {
        alert(error.response.data.message)
    }    
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>Add category</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    placeholder="Enter the title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleFieldForm;
