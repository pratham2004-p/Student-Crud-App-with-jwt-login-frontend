import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8080/student", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students", error);
      if (error.response && error.response.status === 401) {
        alert("Session expired. Please login again.");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/student/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student", error);
      alert("Delete failed");
    }
  };

  return (
    <div className="container">
      <h2>Student List</h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>
                <button onClick={() => navigate(`/edit/${s.id}`)} className="edit">Edit</button>
                <button onClick={() => handleDelete(s.id)} className="delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
