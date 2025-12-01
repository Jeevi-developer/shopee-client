import React, { useState, useEffect } from "react";
import {
  Settings,
  User,
  Store,
  Bell,
  Lock,
  CreditCard,
  Globe,
  Smartphone,
  Mail,
  Save,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function SettingsManagement() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [seller, setSeller] = useState({});

  const [profileData, setProfileData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    gst: "",
    pan: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [storeSettings, setStoreSettings] = useState({
    storeName: "",
    storeDescription: "",
    currency: "INR",
    timezone: "Asia/Kolkata",
    language: "en",
    taxRate: "18",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    newOrders: true,
    orderUpdates: true,
    lowStock: true,
    customerMessages: false,
    marketingEmails: false,
  });

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorAuth: false,
  });

  const [paymentSettings, setPaymentSettings] = useState({
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
    upiId: "",
    acceptCOD: true,
    acceptOnline: true,
  });

  useEffect(() => {
    const sellerData = JSON.parse(sessionStorage.getItem("sellerAuthData") || "{}");
    setSeller(sellerData);

    const savedSettings = sessionStorage.getItem("sellerSettings");
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setProfileData(settings.profile || profileData);
      setStoreSettings(settings.store || storeSettings);
      setNotificationSettings(settings.notifications || notificationSettings);
      setPaymentSettings(settings.payment || paymentSettings);
    } else {
      setProfileData({
        ...profileData,
        businessName: sellerData.businessName || "",
        email: sellerData.email || "",
        phone: sellerData.phonenumber || "",
      });
    }
  }, []);

  const handleSaveSettings = (type) => {
    const currentSettings = JSON.parse(sessionStorage.getItem("sellerSettings") || "{}");
    
    const updatedSettings = {
      ...currentSettings,
      [type]: type === "profile" ? profileData :
              type === "store" ? storeSettings :
              type === "notifications" ? notificationSettings :
              type === "payment" ? paymentSettings : {}
    };

    sessionStorage.setItem("sellerSettings", JSON.stringify(updatedSettings));
    
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handlePasswordChange = () => {
    if (securitySettings.newPassword !== securitySettings.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    if (securitySettings.newPassword.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }
    
    alert("Password updated successfully!");
    setSecuritySettings({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      twoFactorAuth: securitySettings.twoFactorAuth,
    });
  };

  const tabs = [
    { id: "profile", label: "Business Profile", icon: User },
    { id: "store", label: "Store Settings", icon: Store },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account and store preferences</p>
        </div>

        {saveSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle className="text-green-600" size={24} />
            <div>
              <p className="font-semibold text-green-800">Settings saved successfully!</p>
              <p className="text-sm text-green-700">Your changes have been applied.</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <nav className="flex flex-col">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-3 px-6 py-4 text-left transition-all ${
                        activeTab === tab.id
                          ? "bg-green-50 text-green-600 border-l-4 border-green-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Business Profile</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Business Name *
                        </label>
                        <input
                          type="text"
                          value={profileData.businessName}
                          onChange={(e) => setProfileData({ ...profileData, businessName: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Enter business name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Owner Name
                        </label>
                        <input
                          type="text"
                          value={profileData.ownerName}
                          onChange={(e) => setProfileData({ ...profileData, ownerName: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Enter owner name"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="email@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          GST Number
                        </label>
                        <input
                          type="text"
                          value={profileData.gst}
                          onChange={(e) => setProfileData({ ...profileData, gst: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="22AAAAA0000A1Z5"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          PAN Number
                        </label>
                        <input
                          type="text"
                          value={profileData.pan}
                          onChange={(e) => setProfileData({ ...profileData, pan: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="ABCDE1234F"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Address
                      </label>
                      <textarea
                        value={profileData.address}
                        onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter complete address"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                        <input
                          type="text"
                          value={profileData.city}
                          onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="City"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                        <input
                          type="text"
                          value={profileData.state}
                          onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="State"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                        <input
                          type="text"
                          value={profileData.pincode}
                          onChange={(e) => setProfileData({ ...profileData, pincode: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="400001"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => handleSaveSettings("profile")}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-all"
                    >
                      <Save size={20} />
                      Save Profile
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "store" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Store Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Store Name
                      </label>
                      <input
                        type="text"
                        value={storeSettings.storeName}
                        onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="My Awesome Store"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Store Description
                      </label>
                      <textarea
                        value={storeSettings.storeDescription}
                        onChange={(e) => setStoreSettings({ ...storeSettings, storeDescription: e.target.value })}
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Describe your store..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Currency
                        </label>
                        <select
                          value={storeSettings.currency}
                          onChange={(e) => setStoreSettings({ ...storeSettings, currency: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="INR">INR (₹)</option>
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Timezone
                        </label>
                        <select
                          value={storeSettings.timezone}
                          onChange={(e) => setStoreSettings({ ...storeSettings, timezone: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                          <option value="America/New_York">America/New York (EST)</option>
                          <option value="Europe/London">Europe/London (GMT)</option>
                          <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Language
                        </label>
                        <select
                          value={storeSettings.language}
                          onChange={(e) => setStoreSettings({ ...storeSettings, language: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="en">English</option>
                          <option value="hi">Hindi</option>
                          <option value="ta">Tamil</option>
                          <option value="te">Telugu</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tax Rate (%)
                        </label>
                        <input
                          type="number"
                          value={storeSettings.taxRate}
                          onChange={(e) => setStoreSettings({ ...storeSettings, taxRate: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="18"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => handleSaveSettings("store")}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-all"
                    >
                      <Save size={20} />
                      Save Store Settings
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Notification Preferences</h2>
                  <div className="space-y-6">
                    <div className="border-b pb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Channels</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                          <div className="flex items-center gap-3">
                            <Mail className="text-gray-600" size={20} />
                            <div>
                              <p className="font-medium text-gray-800">Email Notifications</p>
                              <p className="text-sm text-gray-600">Receive notifications via email</p>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={notificationSettings.emailNotifications}
                            onChange={(e) => setNotificationSettings({ ...notificationSettings, emailNotifications: e.target.checked })}
                            className="w-5 h-5 text-green-600 rounded"
                          />
                        </label>

                        <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                          <div className="flex items-center gap-3">
                            <Smartphone className="text-gray-600" size={20} />
                            <div>
                              <p className="font-medium text-gray-800">SMS Notifications</p>
                              <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={notificationSettings.smsNotifications}
                            onChange={(e) => setNotificationSettings({ ...notificationSettings, smsNotifications: e.target.checked })}
                            className="w-5 h-5 text-green-600 rounded"
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Types</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                          <div>
                            <p className="font-medium text-gray-800">New Orders</p>
                            <p className="text-sm text-gray-600">Get notified when new orders are placed</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={notificationSettings.newOrders}
                            onChange={(e) => setNotificationSettings({ ...notificationSettings, newOrders: e.target.checked })}
                            className="w-5 h-5 text-green-600 rounded"
                          />
                        </label>

                        <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                          <div>
                            <p className="font-medium text-gray-800">Order Updates</p>
                            <p className="text-sm text-gray-600">Updates on order status changes</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={notificationSettings.orderUpdates}
                            onChange={(e) => setNotificationSettings({ ...notificationSettings, orderUpdates: e.target.checked })}
                            className="w-5 h-5 text-green-600 rounded"
                          />
                        </label>

                        <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                          <div>
                            <p className="font-medium text-gray-800">Low Stock Alerts</p>
                            <p className="text-sm text-gray-600">Alert when products are running low</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={notificationSettings.lowStock}
                            onChange={(e) => setNotificationSettings({ ...notificationSettings, lowStock: e.target.checked })}
                            className="w-5 h-5 text-green-600 rounded"
                          />
                        </label>

                        <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                          <div>
                            <p className="font-medium text-gray-800">Customer Messages</p>
                            <p className="text-sm text-gray-600">Notifications for customer inquiries</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={notificationSettings.customerMessages}
                            onChange={(e) => setNotificationSettings({ ...notificationSettings, customerMessages: e.target.checked })}
                            className="w-5 h-5 text-green-600 rounded"
                          />
                        </label>

                        <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                          <div>
                            <p className="font-medium text-gray-800">Marketing Emails</p>
                            <p className="text-sm text-gray-600">Tips and promotional content</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={notificationSettings.marketingEmails}
                            onChange={(e) => setNotificationSettings({ ...notificationSettings, marketingEmails: e.target.checked })}
                            className="w-5 h-5 text-green-600 rounded"
                          />
                        </label>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSaveSettings("notifications")}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-all"
                    >
                      <Save size={20} />
                      Save Notification Settings
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Security Settings</h2>
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                      <AlertCircle className="text-blue-600 mt-1" size={24} />
                      <div>
                        <p className="font-semibold text-blue-800">Password Security</p>
                        <p className="text-sm text-blue-700">Use a strong password with at least 8 characters, including letters, numbers, and symbols.</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={securitySettings.currentPassword}
                        onChange={(e) => setSecuritySettings({ ...securitySettings, currentPassword: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter current password"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={securitySettings.newPassword}
                        onChange={(e) => setSecuritySettings({ ...securitySettings, newPassword: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter new password"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={securitySettings.confirmPassword}
                        onChange={(e) => setSecuritySettings({ ...securitySettings, confirmPassword: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Confirm new password"
                      />
                    </div>

                    <button
                      onClick={handlePasswordChange}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all"
                    >
                      <Lock size={20} />
                      Change Password
                    </button>

                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Two-Factor Authentication</h3>
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                        <div>
                          <p className="font-medium text-gray-800">Enable 2FA</p>
                          <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={securitySettings.twoFactorAuth}
                          onChange={(e) => setSecuritySettings({ ...securitySettings, twoFactorAuth: e.target.checked })}
                          className="w-5 h-5 text-green-600 rounded"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "payment" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Methods</h2>
                  <div className="space-y-6">
                    <div className="border-b pb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Bank Account Details</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bank Name
                          </label>
                          <input
                            type="text"
                            value={paymentSettings.bankName}
                            onChange={(e) => setPaymentSettings({ ...paymentSettings, bankName: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="State Bank of India"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Account Number
                            </label>
                            <input
                              type="text"
                              value={paymentSettings.accountNumber}
                              onChange={(e) => setPaymentSettings({ ...paymentSettings, accountNumber: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                              placeholder="1234567890"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              IFSC Code
                            </label>
                            <input
                              type="text"
                              value={paymentSettings.ifscCode}
                              onChange={(e) => setPaymentSettings({ ...paymentSettings, ifscCode: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                              placeholder="SBIN0001234"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Account Holder Name
                          </label>
                          <input
                            type="text"
                            value={paymentSettings.accountHolderName}
                            onChange={(e) => setPaymentSettings({ ...paymentSettings, accountHolderName: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-b pb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">UPI Details</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          UPI ID
                        </label>
                        <input
                          type="text"
                          value={paymentSettings.upiId}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, upiId: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="yourname@paytm"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Acceptance</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                          <div>
                            <p className="font-medium text-gray-800">Cash on Delivery (COD)</p>
                            <p className="text-sm text-gray-600">Accept cash payments on delivery</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={paymentSettings.acceptCOD}
                            onChange={(e) => setPaymentSettings({ ...paymentSettings, acceptCOD: e.target.checked })}
                            className="w-5 h-5 text-green-600 rounded"
                          />
                        </label>

                        <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                          <div>
                            <p className="font-medium text-gray-800">Online Payment</p>
                            <p className="text-sm text-gray-600">Accept online payments via UPI, cards, etc.</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={paymentSettings.acceptOnline}
                            onChange={(e) => setPaymentSettings({ ...paymentSettings, acceptOnline: e.target.checked })}
                            className="w-5 h-5 text-green-600 rounded"
                          />
                        </label>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSaveSettings("payment")}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-all"
                    >
                      <Save size={20} />
                      Save Payment Settings
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}