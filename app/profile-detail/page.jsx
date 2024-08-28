"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const EditProfile = () => {
  const localUser = window.localStorage.getItem("nextUser")
  const [firstName, setFirstName] = useState(localUser ? JSON.parse(localUser).firstName : "");
  const [lastName, setLastName] = useState(localUser ? JSON.parse(localUser).lastName : "");
  const [phone, setPhone] = useState(localUser ? JSON.parse(localUser).phone : "");
  const [address, setAddress] = useState(localUser ? JSON.parse(localUser).address : "");
  const [city, setCity] = useState(localUser ? JSON.parse(localUser).city : "");
  const [state, setState] = useState(localUser ? JSON.parse(localUser).state : "");
  const [country, setCountry] = useState(localUser ? JSON.parse(localUser).country : "");
  const [zipCode, setZipCode] = useState(localUser ? JSON.parse(localUser).zipCode : "");
  const [profilePhoto, setProfilePhoto] = useState(
    localUser ? JSON.parse(localUser).image :
      "https://res.cloudinary.com/dduiqwdtr/image/upload/f_auto,q_auto/x1qdn48t8aso6geuhwht"
  ); // Default profile photo
  const [file, setFile] = useState(null);
  const { data: session, update, status } = useSession();
  const router = useRouter();
  const pageTitle = "Profile Detail";

  useEffect(() => {
    document.title = pageTitle;
    if (status == "unauthenticated") router.push("/login");
  }, [pageTitle]);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value.trim());
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value.trim());
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value.trim());
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePhotoChange = async (e) => {
    const fileInput = e.target.files?.[0];
    setFile(fileInput);
    setProfilePhoto(URL.createObjectURL(fileInput));
  };

  const triggerPhotoUpload = () => {
    document.getElementById("profilePhotoInput").click();
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      let imgData = null;
      if (file) {
        const formData = new FormData();
        formData.set("profile", file);

        const imgRes = await fetch("/api/user/image", {
          method: "POST",
          body: formData,
        });
        imgData = await imgRes.json();
      }

      const userData = {
        firstName,
        lastName,
        email: session.user.email,
        phone,
        address,
        city, state,
        country, zipCode
      };

      if (zipCode.trim() != "" && /^[1-9][0-9]{5}$/.test(zipCode) == false) {
        toast.error("Zip Code invalid!");
        return
      }

      if (imgData?.success) {
        userData.image = imgData.secureUrl;
      }

      const res = await fetch("/api/user/update", {
        method: "POST",
        body: JSON.stringify(userData),
      });

      const updatedUser = await res.json()
      window.localStorage.setItem("nextUser", JSON.stringify(updatedUser.user))

      await update();

      toast.success("Data updated successfully!");
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 py-15 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="bg-white shadow-xl shadow-teal-300/60 rounded-lg p-8 w-full md:w-4/5 mx-auto border-2 border-teal-400 ">
        <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">
          Edit your Profile
        </h2>
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col items-center mb-6 md:mb-0 md:w-1/3">
            <img
              src={profilePhoto}
              alt="Profile Photo"
              className="rounded-full w-24 h-24 md:w-32 md:h-32 mb-4 object-contain object-center"
            />
            <button
              onClick={triggerPhotoUpload}
              className="bg-teal-400 text-white py-2 px-4 rounded"
            >
              CHANGE PHOTO
            </button>
            <input
              type="file"
              id="profilePhotoInput"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </div>
          <div className="md:w-2/3 md:pl-8">
            <form
              encType="multipart/form-data"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your First Name"
                />
              </div>
              <div>
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={handleLastNameChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your Last Name"
                />
              </div>
              <div>
                <label className="block text-gray-700">Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your Phone Number"
                />
              </div>
              <div>
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={handleAddressChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your Address"
                />
              </div>
              <div>
                <label className="block text-gray-700">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your City"
                />
              </div>
              <div>
                <label className="block text-gray-700">State</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your State"
                />
              </div>
              <div>
                <label className="block text-gray-700">Country</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your Country"
                />
              </div>
              <div>
                <label className="block text-gray-700">Zip Code</label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => !isNaN(e.target.value) && setZipCode(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your Zip Code"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="bg-teal-400 text-white py-2 px-4 rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
