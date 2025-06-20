import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";

const ProfileList = ({
  supabase,
  profilesList,
  userId,
  fetchProfiles,
  fetchBookTakers,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = async (id) => {
    const loading = toast.loading("Deleting Profile...");

    try {
      const { error } = await supabase
        .from("readers")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);

      const { error: err } = await supabase
        .from("book_takers")
        .delete()
        .eq("reader_id", id)
        .eq("user_id", userId);

      if (error || err) {
        console.error(error || err);
        toast.error("Failed to delete the profile. Please try again.");
      } else {
        toast.success("Profile deleted!");
        fetchProfiles();
        fetchBookTakers();
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
    } finally {
      toast.dismiss(loading);
    }
  };

  return (
    <div className="container p-4">
      <ToastContainer position="top-center" />
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
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

      {profilesList.filter((profile) =>
        profile.full_name.toLowerCase().includes(searchQuery.toLowerCase())
      ).length > 0 ? (
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
                <th className="border border-gray-300 px-3 py-2">Address</th>
                <th className="border border-gray-300 px-3 py-2">ID Proof</th>
                <th className="border border-gray-300 px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {profilesList
                .filter((profile) =>
                  profile.full_name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                )
                .sort((a, b) => a.full_name.localeCompare(b.full_name))
                .map((profile, index) => (
                  <motion.tr
                    key={profile.id || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="border border-gray-300 px-3 py-2">
                      {profile.full_name}
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      {profile.membership_type}
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      {profile.gender}
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      {profile.date_of_birth}
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      {profile.contact_number}
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      {profile.email_address}
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      {profile.address}
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      {profile.id_proof}
                    </td>
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
        <p className="text-center text-gray-500 text-lg mt-4">
          No profiles found.
        </p>
      )}
    </div>
  );
};

export default ProfileList;
