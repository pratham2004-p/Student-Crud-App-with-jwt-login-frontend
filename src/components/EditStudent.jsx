import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditStudent = () => {
  const [form, setForm] = useState({ name: '', email: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchStudent = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/student/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setForm(res.data);
    } catch (err) {
      console.error("Error fetching student:", err);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/student/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/');
    } catch (err) {
      console.error("Error updating student:", err);
    }
  };

  return (
    <div className="container">
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name || ""} onChange={handleChange} required />
        <input name="email" type="email" value={form.email || ""} onChange={handleChange} required />
        <button type="submit">Update Student</button>
      </form>
    </div>
  );
};

export default EditStudent;
