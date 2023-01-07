import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword =()=>{
      const [currentPassword, setCurrentPassword] = useState("");
      const [newPassword, setNewPassword] = useState("");

      const config = {
        headers: {
        Authorization: localStorage.getItem("token"),
        },
      };

      const handleClick = async (e) => {
        e.preventDefault();

        const data = {
            prevPassword : currentPassword,
            newPassword : newPassword,
        }

        try {
        await axios
            .put("http://localhost:8000/admin/user/change-password", data, config)
            .then((response) => {
            localStorage.clear();
            window.location.replace('/login');
            toast.success("Password Changed Successfully");
            console.log(response.data.msg);
            });
        } catch (e) {
        toast.failed("Failed to change password");
        console.log(e);
        }
    }; 
    return(
        <>
            <section class="bg-gray-50">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div class="w-full p-6 bg-blueGray-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md sm:p-8">
                        <h2 class="mb-5 text-xl font-bold leading-tight tracking-tight text-blueGray-600 md:text-2xl">
                            Change Password
                        </h2>
                        <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Current Password
                    </label>
                    <input
                      type="password" onChange={(e) => setCurrentPassword(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Current Password"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      New Password
                    </label>
                    <input
                      type="password" onChange={(e) => setNewPassword(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="New Password"
                    />
                  </div>

                  <div className="text-center mt-6">
                    <button onClick={handleClick}
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                    >
                      SUBMIT
                    </button>
                  </div>
                </form>
                    </div>
                </div>
                </section>
        </>
    )
}

export default ChangePassword;