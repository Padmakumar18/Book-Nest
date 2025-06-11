import React, { useState } from "react";
import { motion } from "framer-motion";
import "./ProfilesList.css";
import profiles from "../Profiles";

const ProfileList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProfiles = profiles.filter((profile) =>
    profile.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="profile-container">
      <div className="search-bar">
        <input
        className="search-bar"
          type="text"
          placeholder="Search by Name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={() => setSearchQuery("")}>Clear</button>
      </div>

      <div className="profile-list">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile, index) => (
            <motion.div
              className="profile-card"
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="profile-header">
                <h2>{profile.fullName}</h2>
                <p className="membership">{profile.membershipType}</p>
              </div>

              <div className="profile-body">
                <p><strong>Gender:</strong> {profile.gender}</p>
                <p><strong>DOB:</strong> {profile.dateOfBirth}</p>
                <p><strong>Contact:</strong> {profile.contactNumber}</p>
                <p><strong>Email:</strong> {profile.emailAddress}</p>
                <p><strong>Institution:</strong> {profile.institution}</p>
                <p><strong>Address:</strong> {profile.address}</p>
                <p><strong>ID Proof:</strong> {profile.idProof}</p>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="no-results">No profiles found.</p>
        )}
      </div>
    </div>
  );
};

export default ProfileList;
