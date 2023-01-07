import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddAnnouncement = () => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [published, setPublish] = useState("");
    var isTrueSet = (published === 'true');

    const config = {
        headers: {
        Authorization: localStorage.getItem("token"),
        },
    };

    const handleClick = async (e) => {
        e.preventDefault();

        
        const data = {
            title : title,
            message : message,
            published : isTrueSet
        }

        try {
        await axios
            .post("http://localhost:8000/admin/announcement/", data, config)
            .then((response) => {
            window.location.replace("/announcement");
            toast.success("Successfully added");
            console.log(response.data.msg);
            });
        } catch (e) {
        toast.failed("Failed to add");
        console.log(e);
        }
    }; 
  return (
    <>
    <div className="place-content-center mx-36 my-20 items-center">
      <div className="absolute flex flex-col  min-w-0 break-words w-5/12 mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t  px-20 bg-gray-50 mb-0 px-6 py-6 border-20">
          <div className="text-center mt-5 mb-2 flex justify-between ">
            <h6 className="text-blueGray-700 text-3xl font-bold">Add Announcement</h6>
          </div>
        </div>
        <div className="flex-auto px-20 lg:px-20 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 mt-6 text-sm mt-3 mb-6 font-bold uppercase">
            </h6>
            <div className="flex flex-wrap mt-6">
              <div className="w-full mt-6 lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Enter Title
                  </label>
                  <input
                    type="text" onChange={(e) => setTitle(e.target.value)}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Enter title"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full mt-2 lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Message
                  </label>
                  <textarea
                    type="text" onChange={(e) => setMessage(e.target.value)}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Enter message"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Publish ?
                  </label>
                  
                    <div class="flex">
                        <div class="flex items-center mr-4">
                            <input id="inline-radio" type="radio" value={true} name="inline-radio-group" onChange={(e) => setPublish(e.target.value)} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="inline-radio" class="ml-2 text-sm font-medium text-blueGray-500">YES</label>
                        </div>
                        <div class="flex items-center mr-4">
                            <input id="inline-2-radio" type="radio" value={false} name="inline-radio-group" onChange={(e) => setPublish(e.target.value)} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="inline-2-radio" class="ml-2 text-sm font-medium text-blueGray-500">NO</label>
                        </div>
                    </div>

                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full mt-2 lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                <Link
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleClick}
                    >
                    Save Changes
                    </Link>
                </div>
              </div>
            </div>
            

            {/* <hr className="mt-6 border-b-1 border-blueGray-300" /> */}
          </form>
        </div>
      </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}


export default AddAnnouncement;
