import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
const MultiFieldForm = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
  });

  const [categories, setCategories] = useState([]);
  const [file,setFile] = useState([])
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await axios.get("http://localhost:4000/get/allcategories", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        // console.log('API Response:', res.data);
  
        if (Array.isArray(res.data.fetchallcategories)) {
          setCategories(res.data.fetchallcategories);
        } else {
          console.error('Invalid data structure:', res.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchAllCategories();
  }, []);
  
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(value)
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]:  value,
    }));
  };
  //creating a form data
  const formdata = new FormData()
  formdata.append("title",formData.title)
  formdata.append("category",formData.category)
  formdata.append("description",formData.description)
  formdata.append("thumbnail",file)

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
        const res= await axios.post("http://localhost:4000/add/blog",
        formdata,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
        });
        alert(res.data.message)
        console.log(res.data)
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
              <h4>Add Blog</h4>
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
                <div className="form-group">
                    
                  <label htmlFor="category">Category:</label>
                    <select id="category" className='form-control' name="category"
                     onChange={handleChange}
                   >                
                    <option >Select Category</option>
                    {categories && categories.map(category => (
          <option   key={category._id} value={category._id} placeholder="Select Category" >
            {category.title}
          </option>))}
                  </select> 
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description:</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    placeholder="Enter the description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="thumbnail">Thumbnail:</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="thumbnail"
                    name="thumbnail"
                    onChange={(e)=> setFile(e.target.files[0])}
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

export default MultiFieldForm;
