import React, { useState } from "react";
import { motion } from "framer-motion";
import profilesData from "../Profiles";

const ProfileList = () => {
  const [profiles, setProfiles] = useState(profilesData);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (id) => {
    const updatedProfiles = profiles.filter((profile) => profile.id !== id);
    setProfiles(updatedProfiles);
  };

  const filteredProfiles = profiles.filter((profile) =>
    profile.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by Name..."
          className="border border-gray-300 rounded px-3 py-2 flex-1"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={() => setSearchQuery("")}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Clear
        </button>
      </div>

      {filteredProfiles.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border border-gray-300 px-3 py-2">Name</th>
                <th className="border border-gray-300 px-3 py-2">Membership</th>
                <th className="border border-gray-300 px-3 py-2">Gender</th>
                <th className="border border-gray-300 px-3 py-2">DOB</th>
                <th className="border border-gray-300 px-3 py-2">Contact</th>
                <th className="border border-gray-300 px-3 py-2">Email</th>
                <th className="border border-gray-300 px-3 py-2">Institution</th>
                <th className="border border-gray-300 px-3 py-2">Address</th>
                <th className="border border-gray-300 px-3 py-2">ID Proof</th>
                <th className="border border-gray-300 px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProfiles.map((profile, index) => (
                <motion.tr
                  key={profile.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="border border-gray-300 px-3 py-2">{profile.fullName}</td>
                  <td className="border border-gray-300 px-3 py-2">{profile.membershipType}</td>
                  <td className="border border-gray-300 px-3 py-2">{profile.gender}</td>
                  <td className="border border-gray-300 px-3 py-2">{profile.dateOfBirth}</td>
                  <td className="border border-gray-300 px-3 py-2">{profile.contactNumber}</td>
                  <td className="border border-gray-300 px-3 py-2">{profile.emailAddress}</td>
                  <td className="border border-gray-300 px-3 py-2">{profile.institution}</td>
                  <td className="border border-gray-300 px-3 py-2">{profile.address}</td>
                  <td className="border border-gray-300 px-3 py-2">{profile.idProof}</td>
                  <td className="border border-gray-300 px-3 py-2">
                    <button
                      onClick={() => handleDelete(profile.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-4">No profiles found.</p>
      )}
    </div>
  );
};

export default ProfileList;
