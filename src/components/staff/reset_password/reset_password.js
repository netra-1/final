import logo from '../../../assets/img/register_bg_2.png'
import { useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const ResetPassword =()=>{
  const [email, setEmail] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    
    const data = {
        email: email
    }

    try {
      await axios
        .put("http://localhost:8000/admin/user/request-reset-password", data)
        .then(() => {
        //   window.location.replace();
          toast.success("Reset Request Sent");
        });
    } catch (e) {
      toast.failed("Failed to sent");
      console.log(e);
    }
  }; 

    return(
        <>
            <main>
                <section className="relative w-full h-full py-30">
                    <div
                    className="absolute top-0 w-full h-full -mt-16 bg-no-repeat bg-full"
                    style={{
                        backgroundImage:
                        "url(" + logo + ")",
                    }}
                    ></div>
                    <div className="relative container mx-auto px-4 h-full">
                <div class="my-24 mx-16">
            <div className="text-blueGray-700 text-center mb-3 font-bold text-5xl">
                  <h2>Request Reset Password</h2>
                </div>
                <div class="container px-8 py-12 place-content-center">
                    <div class="flex justify-center place-items-center flex-wrap h-full g-6 text-gray-800">
                        <div class="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                            <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            class="w-full"
                            alt="Phone image"
                            />
                        </div>
                        <div className="md:w-8/12 lg:w-5/12 lg:ml-20 p-8 bg-blueGray-100 w-full mb-6 shadow-xl rounded-lg">
                            <div class="">
                                <form>
                                    <div class="mb-6">
                                        <input
                                        type="text" onChange={(e) => setEmail(e.target.value)}
                                        class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Email address"
                                        />
                                    </div>

                                    <button
                                        type="submit" onClick={handleClick}
                                        class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="light"
                                    >
                                        Send Request
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
            </main>
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
    )
}

export default ResetPassword;