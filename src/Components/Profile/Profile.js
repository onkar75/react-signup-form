import React from "react";

const Profile = ({ userName }) => {
  return (
    <div className="profile">
      <h1 style={{ color: "green" }}>Welcome {userName} !!</h1>
    </div>
  );
};
export default Profile;
