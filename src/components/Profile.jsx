import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css'; // Import the external CSS

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    img: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const defaultImg = "https://www.pngmart.com/files/23/Profile-PNG-Photo.png";

  return (
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>
      <img
        src={userData.img ? userData.img : defaultImg}
        alt="Profile"
        className="profile-image"
      />
      <div className="profile-info">
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Phone:</strong> {userData.phone}</p>
      </div>
    </div>
  );
};

export default Profile;
