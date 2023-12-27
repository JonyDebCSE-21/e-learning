import UpdateUserForm from "@/components/form/UpdateUserForm";
import DashboardLayout from "@/components/layout/DashboardLayout";
import React from "react";

const settingsandprivacy = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto my-8 p-8 bg-white rounded ">
        <h1 className="text-2xl mb-3 font-bold">Update Your Profile</h1>
        <div className="bg-white p-8 rounded-lg shadow-md mb-5">
          <UpdateUserForm />
        </div>

        {/* <h1 className="text-2xl font-bold mb-4">User Settings & Privacy</h1> */}

        {/* User Account Settings */}
        {/* <section className="mb-4">
          <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
          <form action="#" method="POST">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-600">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-gray-600">
                  Mobile Number
                </label>
                <input
                  type="number"
                  id="number"
                  name="number"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-600">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="workplace"
                  className="block text-sm font-medium text-gray-600">
                  Workplace
                </label>
                <input
                  type="text"
                  id="workplace"
                  name="workplace"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
            </div>
          </form>
        </section> */}

        {/* Privacy Settings */}
        {/* <section>
          <h2 className="text-lg font-semibold mb-4">Privacy Settings</h2>
          <form action="#" method="POST">
            <div className="mb-4">
              <label htmlFor="notification" className="flex items-center">
                <input
                  type="checkbox"
                  id="notification"
                  name="notification"
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-600">
                  Receive notifications
                </span>
              </label>
            </div>

            <div className="mb-4">
              <label htmlFor="analytics" className="flex items-center">
                <input
                  type="checkbox"
                  id="analytics"
                  name="analytics"
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-600">
                  Allow anonymous analytics
                </span>
              </label>
            </div>

            <div className="mb-4">
              <label
                htmlFor="personalizedContent"
                className="flex items-center">
                <input
                  type="checkbox"
                  id="personalizedContent"
                  name="personalizedContent"
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-600">
                  Allow personalized content recommendations
                </span>
              </label>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                Save Changes
              </button>
            </div>
          </form>
        </section> */}
      </div>
    </DashboardLayout>
  );
};

export default settingsandprivacy;
