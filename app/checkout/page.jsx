"use client";

import { useEffect, useMemo, useState } from "react";
import { IoBagOutline } from "react-icons/io5";
import Link from 'next/link';

const CheckoutPage = () => {
  const localUser = window.localStorage.getItem("nextUser");
  const localCart = window.localStorage.getItem("medCart")
  const [formData, setFormData] = useState({
    email: localUser ? JSON.parse(localUser).email : "",
    firstName: localUser ? JSON.parse(localUser).firstName : "",
    lastName: localUser ? JSON.parse(localUser).lastName : "",
    address: localUser ? JSON.parse(localUser).address : "",
    apartment: "",
    city: localUser ? JSON.parse(localUser).city : "",
    state: localUser ? JSON.parse(localUser).state : "",
    zip: localUser ? JSON.parse(localUser).zipCode : "",
    phone: localUser ? JSON.parse(localUser).phone : "",
    cardNumber: "",
    expirationDate: "",
    securityCode: "",
    nameOnCard: "",
    emailUpdates: false,
    sameAsBilling: false,
    rememberMe: false,
    paymentOption: "payInFull", // Default payment option
  });
  const totalAmount = useMemo(() => {
    return localCart ? JSON.parse(localCart).reduce((total, c) => total + (c.price * c.quantity), 0) : 0
  }, [localCart])

  const pageTitle = 'Checkout';

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission
    console.log("Form Data Submitted: ", formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-24">
      <main className="flex justify-center mt-4 px-4">
        <div className="bg-white p-4 rounded-md shadow-md w-full max-w-4xl md:max-w-6xl lg:max-w-7xl flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
          {/* Form Section */}
          <section className="w-full md:w-1/2">
            <h1 className="text-center mb-4 text-xl font-semibold">Express Checkout</h1>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-6">
              <button className="flex-1 bg-teal-400 text-white px-4 py-2 rounded-md text-sm md:text-base flex items-center justify-center">
                Shop Pay
              </button>
              <button className="flex-1 bg-black text-white px-4 py-2 rounded-md text-sm md:text-base flex items-center justify-center">
                <img src="https://res.cloudinary.com/dduiqwdtr/image/upload/f_auto,q_auto/v1/assets/26.png" alt="Icon 26" className=" md:h-6" />
              </button>
            </div>

            <div className="flex items-center justify-center mt-2 text-gray-700">
              <div className="w-full flex items-center justify-center my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="px-4">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="flex justify-between items-center mb-4">
                <h1 className="font-bold">Contact</h1>
                {/* <Link href="/login" legacyBehavior>
                  <a className="text-teal-400">Log in</a>
                </Link> */}
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Email or mobile phone number"
                  required
                />
              
              </div>

              <div className="mb-4">
                <label className="block font-bold text-gray-700">Delivery</label>
                <select
                  name="country"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Country/Region</option>
                  <option>United States</option>
                </select>
              </div>

              <div className="flex flex-col md:flex-row mb-4 space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Address"
                  required
                />
              </div>
             

              <div className="flex flex-col md:flex-row mb-4 space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="City"
                    required
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="State"
                    required
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="ZIP Code"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Phone"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-teal-400 text-white px-4 py-2 rounded-md hover:bg-teal-500"
              >
                Pay now
              </button>
            </form>
          </section>

          {/* Cart Products Section */}
          <aside className=" w-1/2 mx-auto bg-gray-100 p-4 md:p-7 rounded-lg shadow-lg">
            {localCart && JSON.parse(localCart).map(cart =>
              <div key={cart._id} className="flex items-start mb-4">
                <div className="relative">
                  <div className="w-16 h-16">
                    <img
                      src={cart.images[0]}
                      alt="Product"
                      className="rounded-lg w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-0 left-0 w-6 h-6 bg-gray-300 text-gray-700 flex items-center justify-center rounded-full">
                    {cart.quantity}
                  </div>
                </div>
                <div className="ml-4">
                  <h2 className="text-gray-600">
                    {cart.title}
                  </h2>
                  {/* <div className="flex justify-between items-center mt-4 mb-4">
                  <h1 className="text-gray-500">Size: L</h1>
                  <h1 className="text-gray-500">$108.00</h1>
                </div> */}
                </div>
              </div>
            )}
            <div className="text-gray-600">
              {/* <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>$108.00</span>
              </div> */}
              {/* <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span className="text-gray-500">Enter shipping address</span>
              </div> */}
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-black">USD ${totalAmount}</span>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;