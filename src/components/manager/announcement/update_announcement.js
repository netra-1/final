import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

const UpdateAnnouncement = () => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [published, setPublish] = useState("");
    const { announcementId } = useParams();
    var isTrueSet = (published === 'true');

    console.log(published)

    const config = {
        headers: {
        Authorization: localStorage.getItem("token"),
        },
    };

    useEffect(() => {
        axios
          .get("http://localhost:8000/admin/announcement/" + announcementId, config)
          .then((response) => {
            console.log(response);
            setTitle(response.data.data.title);
            setMessage(response.data.data.message);
            console.log(response.data.data.title)
          })
          .catch((e) => {
            console.log(e);
          });
      }, []);

      const handleClick = async (e) => {
        e.preventDefault();
        try {
            const data = {
                title : title,
                message : message,
                published : isTrueSet
            }
    
          await axios
            .put(
              "http://localhost:8000/admin/announcement/" + announcementId,
              data, config
            )
            .then(() => {
              window.location.replace("/announcement");
              toast.success("Updated successfully");
            })
            .catch((e) => {
              toast.failed("Failed to update");
            });
        } catch (err) {
          console.log(err);
          toast.failed("Cant update after published");
        }
      }; 
  return (
    <>
    <div className="place-content-center mx-80 my-52 items-center">
      <div className="absolute flex flex-col  min-w-0 break-words w-5/12 mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t  px-20 bg-gray-50 mb-0 px-6 py-6 border-20">
          <div className="text-center mt-5 mb-2 flex justify-between ">
            <h6 className="text-blueGray-700 text-3xl font-bold">Update Announcement</h6>
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
                    type="text" onChange={(e) => setTitle(e.target.value)} value={title}
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
                    type="text" onChange={(e) => setMessage(e.target.value)} value={message}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Enter message"
                  />
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


export default UpdateAnnouncement;
