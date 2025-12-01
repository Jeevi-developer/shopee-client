import React, { useState, useEffect } from "react";
import {
  User,
  Search,
  Filter,
  Eye,
  X,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Calendar,
  DollarSign,
  TrendingUp,
  UserPlus,
} from "lucide-react";

export default function CustomersManagement() {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);

  useEffect(() => {
    const savedCustomers = sessionStorage.getItem("sellerCustomers");
    if (savedCustomers) {
      setCustomers(JSON.parse(savedCustomers));
    } else {
      // Demo customers
      const demoCustomers = [
        {
          id: "CUST001",
          name: "John Doe",
          email: "john@example.com",
          phone: "+91 98765 43210",
          address: "123 Main St, Mumbai, Maharashtra, 400001",
          joinDate: "2024-01-15T10:00:00",
          totalOrders: 12,
          totalSpent: 45680,
          lastOrderDate: "2024-10-28T14:30:00",
          status: "active",
          orderHistory: [
            { orderId: "ORD001", date: "2024-10-28", amount: 2999, status: "delivered" },
            { orderId: "ORD015", date: "2024-10-15", amount: 5499, status: "delivered" },
            { orderId: "ORD022", date: "2024-09-20", amount: 1299, status: "delivered" },
          ],
        },
        {
          id: "CUST002",
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "+91 87654 32109",
          address: "456 Park Ave, Delhi, 110001",
          joinDate: "2024-02-20T11:30:00",
          totalOrders: 8,
          totalSpent: 28990,
          lastOrderDate: "2024-10-25T09:15:00",
          status: "active",
          orderHistory: [
            { orderId: "ORD002", date: "2024-10-25", amount: 1499, status: "processing" },
            { orderId: "ORD018", date: "2024-09-30", amount: 3299, status: "delivered" },
          ],
        },
        {
          id: "CUST003",
          name: "Mike Johnson",
          email: "mike@example.com",
          phone: "+91 76543 21098",
          address: "789 Oak Rd, Bangalore, Karnataka, 560001",
          joinDate: "2024-03-10T15:45:00",
          totalOrders: 15,
          totalSpent: 67850,
          lastOrderDate: "2024-10-30T16:20:00",
          status: "vip",
          orderHistory: [
            { orderId: "ORD003", date: "2024-10-30", amount: 5298, status: "shipped" },
            { orderId: "ORD025", date: "2024-10-10", amount: 8999, status: "delivered" },
            { orderId: "ORD030", date: "2024-09-25", amount: 4599, status: "delivered" },
          ],
        },
        {
          id: "CUST004",
          name: "Sarah Williams",
          email: "sarah@example.com",
          phone: "+91 65432 10987",
          address: "321 Elm St, Chennai, Tamil Nadu, 600001",
          joinDate: "2024-04-05T12:00:00",
          totalOrders: 3,
          totalSpent: 8750,
          lastOrderDate: "2024-08-15T10:30:00",
          status: "inactive",
          orderHistory: [
            { orderId: "ORD045", date: "2024-08-15", amount: 2999, status: "delivered" },
          ],
        },
      ];
      setCustomers(demoCustomers);
      sessionStorage.setItem("sellerCustomers", JSON.stringify(demoCustomers));
    }
  }, []);

  const getCustomerBadge = (status) => {
    const badges = {
      active: { bg: "bg-green-100", text: "text-green-800", label: "Active" },
      vip: { bg: "bg-purple-100", text: "text-purple-800", label: "VIP" },
      inactive: { bg: "bg-gray-100", text: "text-gray-800", label: "Inactive" },
    };
    
    const badge = badges[status] || badges.active;
    
    return (
      <span className={`${badge.bg} ${badge.text} px-3 py-1 rounded-full text-xs font-semibold`}>
        {badge.label}
      </span>
    );
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);
    const matchesFilter = filterType === "all" || customer.status === filterType;
    return matchesSearch && matchesFilter;
  });

  const customerStats = {
    total: customers.length,
    active: customers.filter(c => c.status === "active").length,
    vip: customers.filter(c => c.status === "vip").length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    avgOrderValue: customers.length > 0 
      ? customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.reduce((sum, c) => sum + c.totalOrders, 0)
      : 0,
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
            <p className="text-gray-600 mt-1">Manage your customer relationships</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Customers</p>
                <p className="text-3xl font-bold text-gray-800">{customerStats.total}</p>
              </div>
              <User className="text-blue-600" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Customers</p>
                <p className="text-3xl font-bold text-gray-800">{customerStats.active}</p>
              </div>
              <UserPlus className="text-green-600" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">VIP Customers</p>
                <p className="text-3xl font-bold text-gray-800">{customerStats.vip}</p>
              </div>
              <TrendingUp className="text-purple-600" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-800">₹{customerStats.totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="text-orange-600" size={40} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search customers by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-600" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Customers</option>
                <option value="active">Active</option>
                <option value="vip">VIP</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {filteredCustomers.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <User size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Customers Found</h3>
            <p className="text-gray-600">
              {searchQuery || filterType !== "all"
                ? "Try adjusting your search or filters"
                : "Customers will appear here once they make their first purchase"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
                <div className="bg-gradient-to-r from-green-600 to-blue-600 p-4">
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <User size={32} className="text-green-600" />
                    </div>
                    {getCustomerBadge(customer.status)}
                  </div>
                  <h3 className="text-xl font-bold text-white mt-3">{customer.name}</h3>
                  <p className="text-sm text-white opacity-90">{customer.id}</p>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail size={16} />
                    <span className="truncate">{customer.email}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone size={16} />
                    <span>{customer.phone}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={16} />
                    <span className="truncate">{customer.address.split(',')[1] || customer.address}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={16} />
                    <span>Joined {formatDate(customer.joinDate)}</span>
                  </div>

                  <div className="pt-3 border-t space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Orders</span>
                      <span className="font-semibold text-gray-800">{customer.totalOrders}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Spent</span>
                      <span className="font-semibold text-green-600">₹{customer.totalSpent.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Last Order</span>
                      <span className="text-sm text-gray-800">{formatDate(customer.lastOrderDate)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setShowCustomerDetails(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg transition-all mt-4"
                  >
                    <Eye size={16} />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showCustomerDetails && selectedCustomer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Customer Details</h2>
                  <p className="text-gray-600">{selectedCustomer.id}</p>
                </div>
                <button
                  onClick={() => setShowCustomerDetails(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6">
                <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                        <User size={40} className="text-green-600" />
                      </div>
                      <div className="text-white">
                        <h3 className="text-2xl font-bold">{selectedCustomer.name}</h3>
                        <p className="opacity-90">{selectedCustomer.email}</p>
                        <p className="opacity-90">{selectedCustomer.phone}</p>
                      </div>
                    </div>
                    {getCustomerBadge(selectedCustomer.status)}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <ShoppingBag className="text-blue-600" size={24} />
                      <p className="text-sm text-gray-600">Total Orders</p>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{selectedCustomer.totalOrders}</p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <DollarSign className="text-green-600" size={24} />
                      <p className="text-sm text-gray-600">Total Spent</p>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">₹{selectedCustomer.totalSpent.toLocaleString()}</p>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="text-purple-600" size={24} />
                      <p className="text-sm text-gray-600">Avg Order Value</p>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">
                      ₹{Math.round(selectedCustomer.totalSpent / selectedCustomer.totalOrders).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="text-gray-400 mt-1" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium text-gray-800">{selectedCustomer.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="text-gray-400 mt-1" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium text-gray-800">{selectedCustomer.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="text-gray-400 mt-1" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="font-medium text-gray-800">{selectedCustomer.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar className="text-gray-400 mt-1" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Customer Since</p>
                        <p className="font-medium text-gray-800">{formatDate(selectedCustomer.joinDate)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Order History</h3>
                  {selectedCustomer.orderHistory.length === 0 ? (
                    <p className="text-gray-600 text-center py-8">No orders yet</p>
                  ) : (
                    <div className="space-y-3">
                      {selectedCustomer.orderHistory.map((order, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-semibold text-gray-800">{order.orderId}</p>
                            <p className="text-sm text-gray-600">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-800">₹{order.amount.toLocaleString()}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                              order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}