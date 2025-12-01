import React, { useState } from 'react';
import { 
  Mail, Lock, Eye, EyeOff, User, CheckCircle, X, Phone, MapPin, 
  Calendar, Shield, Bell, CreditCard, Edit2, Save 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CustomerProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {};
  
  const [profileData, setProfileData] = useState({
    name: user.name || "Customer",
    email: user.email || "",
    phone: user.phone || "Not provided",
    dob: user.dob || "Not provided",
    location: user.location || "Not provided"
  });

  const [editData, setEditData] = useState({ ...profileData });

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => {
    if (isEditing) setEditData({ ...profileData });
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/Login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="text-white" size={48} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{profileData.name}</h2>
              <p className="text-gray-600 flex items-center gap-2 mt-1">
                <Mail size={16} />
                {profileData.email}
              </p>
              <div className="flex gap-3 mt-3">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">
                  ✓ Verified
                </span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full font-medium">
                  Customer
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleEditToggle}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              {isEditing ? <X size={18} /> : <Edit2 size={18} />}
              {isEditing ? 'Cancel' : 'Edit'}
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <User className="text-indigo-600" size={24} />
              Personal Information
            </h3>

            <div className="space-y-4">
              {['name', 'email', 'phone', 'dob', 'location'].map((field) => (
                <div
                  key={field}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="text-gray-400 mt-1">
                    {field === 'name' && <User size={20} />}
                    {field === 'email' && <Mail size={20} />}
                    {field === 'phone' && <Phone size={20} />}
                    {field === 'dob' && <Calendar size={20} />}
                    {field === 'location' && <MapPin size={20} />}
                  </div>

                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium capitalize">
                      {field}
                    </p>
                    {isEditing ? (
                      <input
                        type="text"
                        name={field}
                        value={editData[field]}
                        onChange={handleEditChange}
                        className="w-full mt-1 px-2 py-1 border-2 border-indigo-300 rounded focus:border-indigo-500 outline-none"
                      />
                    ) : (
                      <p className="text-gray-800 font-medium">
                        {profileData[field]}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {isEditing && (
              <button
                onClick={handleSave}
                className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition"
              >
                <Save size={18} /> Save Changes
              </button>
            )}
          </div>

          {/* Account Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Shield className="text-indigo-600" size={24} />
              Account Overview
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-50 p-4 rounded-lg text-center">
                <CreditCard className="mx-auto text-indigo-600 mb-2" />
                <p className="font-semibold text-gray-800">Orders</p>
                <p className="text-sm text-gray-600">12</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <Bell className="mx-auto text-purple-600 mb-2" />
                <p className="font-semibold text-gray-800">Notifications</p>
                <p className="text-sm text-gray-600">5 New</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
