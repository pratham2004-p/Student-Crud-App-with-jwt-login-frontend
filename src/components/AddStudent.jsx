import { useState } from 'react';
import axios from 'axios';
import '../style.css'
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const [form, setForm] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
  
    try {
      await axios.post('http://localhost:8080/student', form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      navigate('/');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errorData = err.response.data;
        alert(Object.values(errorData).join('\n')); 
      } else {
        alert('Something went wrong!');
      }
    }
  };
  

  return (
    <div className="container">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Enter name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Enter email" value={form.email} onChange={handleChange} required />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
