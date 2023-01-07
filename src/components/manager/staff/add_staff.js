import "./add_staff.scss";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdCloudUpload } from "react-icons/io";
import { Link } from "react-router-dom";

const AddStaff = () => {

  const [email, setEmail] = useState("");
  const [fullName, setFullName] =useState("");
  const [citizenship, setCitizenship] =useState("");
  const [panNum, setPanNum] =useState("");
  const [address, setAddress] =useState("");

  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const data = {
        email : email,
        category : "STAFF",
        profile : {"fullName": fullName, "citizenship":citizenship, "pan":panNum},
    }

    try {
      await axios
        .post("http://localhost:8000/admin/user/add-staff", data, config)
        .then((response) => {
          window.location.replace("/staff");
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
      <div className="place-content-center mx-32 my-10 items-center">
      <div className="absolute flex flex-col  min-w-0 break-words w-5/12 mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t  px-20 bg-gray-50 mb-0 px-6 py-6 border-20">
          <div className="text-center mt-5 mb-2 flex justify-between ">
            <h6 className="text-blueGray-700 text-3xl font-bold">Add Staff</h6>
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
                    Full Name
                  </label>
                  <input
                    type="text" onChange={(e) => setFullName(e.target.value)}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Enter fullname"
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
                    Email address
                  </label>
                  <input
                    type="email" onChange={(e) => setEmail(e.target.value)}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Enter email address"
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
                    Citizenship Number
                  </label>
                  <input
                    type="text" onChange={(e) => setCitizenship(e.target.value)}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Enter lastname"
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
                    PAN number
                  </label>
                  <input
                    type="number" onChange={(e) => setPanNum(e.target.value)}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Enter lastname"
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
};

export default AddStaff;
