import "./add_decoration.scss";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdCloudUpload } from "react-icons/io";
import { Link } from "react-router-dom";

const AddDecoration = () => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] =useState("");
  const [type, setType] = useState("");

  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // const data = {
    //   name : name,
    //   description : description,
    //   price : price,
    // }
    const data = new FormData();
    data.append("name", name);
    data.append("description", description);
    data.append("price", price);
    data.append("type", type);
    data.append("image", image);

    try {
      await axios
        .post("http://localhost:8000/admin/decoration/", data, config)
        .then((response) => {
          window.location.replace("/decoration");
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
      <div className="ml-10">
        <div className="px-4 my-5 md:px-15 mx-auto w-full ">
            <div className="flex flex-wrap">
                <div className="w-full lg:w-2/12 px-4 ">
                  {/* image section added */}
                  <div className="relative flex flex-col min-w-0 break-words bg-blueGray-100 w-full mb-6 shadow-xl rounded-lg mt-32">
                    <div className="px-0">
                      <div className="flex flex-wrap justify-end">
                        <img
                          alt="..."
                          src={
                            image
                                ? URL.createObjectURL(image)
                                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                          }
                          style={{
                            objectFit : "cover",
                          }}
                          className="shadow-xl h-auto align-middle rounded-md absolute max-w-200-px"
                        /> 
                      </div>
                      
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-7/12 px-4 mt-10">
                <div className="flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                  {/* addition of form started */}
                  <div className="rounded-t bg-gray-50 mb-0 px-6 py-6 border-20">
                    <div className="text-center flex justify-between ">
                      <h6 className="text-blueGray-700 text-2xl font-bold">Add Decoration</h6>
                      <Link
                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="button"
                        to={''}
                        onClick= {handleClick}
                      >
                        Submit
                      </Link>
                    </div>
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form>
                      <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                        Complete the fileds..
                      </h6>
                      <div className="flex flex-wrap">
                        <div className="w-full lg:w-12/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Name
                            </label>
                            <input
                              type="text" onChange={(e) => setName(e.target.value)}
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              placeholder="Enter decorationy name"
                            />
                          </div>
                        </div>
                        <div className="w-full lg:w-12/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Description
                            </label>
                            <textarea rows="3" cols="50" onChange={(e) => setDescription(e.target.value)} 
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              placeholder="Enter description"
                            />
                          </div>
                        </div>
                      </div>

                      <hr className="mt-6 border-b-1 border-blueGray-300" />

                      <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                        Additional Information
                      </h6>
                      <div className="flex flex-wrap">
                      <div className="w-full lg:w-12/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Type
                            </label>
                            <input
                              type="text" onChange={(e) => setType(e.target.value)}
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              placeholder="Enter decoration type"
                            />

                          </div>
                        </div>
                        <div className="w-full lg:w-12/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Price
                            </label>
                            <input
                              type="number" onChange={(e) => setPrice(e.target.value)}
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              placeholder="Enter price"
                            />

                          </div>
                        </div>
                      </div>

                      <hr className="mb-4 mt-6 border-b-1 border-blueGray-300" />
                      
                      <div className="flex flex-wrap">
                        <div className="w-full lg:w-12/12 px-4">
                          <div className="relative w-full update_profile_image">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold"
                              htmlFor="grid-password"
                            >
                              Upload Image
                            </label>
                            <label for="file">
                              <IoMdCloudUpload />
                              <input type="file" id="file" onChange={(e) => {
                                    setImage(e.target.files[0]);
                                  }} />
                            </label>
                          </div>
                        </div>
                      </div>

                    </form>
                  </div>
                </div>
                </div>
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

export default AddDecoration;
