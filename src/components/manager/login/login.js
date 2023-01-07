import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from '../../../assets/img/register_bg_2.png'
import { ImportantDevices } from "@mui/icons-material";

const AdminLogin = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const loginAdmin=(e)=>{
    e.preventDefault();

    // const data = new FormData();
    // data.append("email", email);
    // data.append("password", password);

    const data = {
        email: email,
        password: password,
      };

    axios
        .post("http://localhost:8000/admin/user/login", data)
        .then((response) => {
            console.log(response.data.data.token)
            console.log(response.data.data.user.category)
        if (response.data.data.token) {
            // it will save the token locally, so that it is available
            // all over the component
            localStorage.setItem("token", response.data.data.token);
            localStorage.setItem("category",response.data.data.user.category)


            if (localStorage.getItem("category")=="MANAGER"){
                window.location.replace("/");
            } else if (localStorage.getItem("category")=="STAFF"){
                window.location.replace("/staff_dashboard");
            }
            toast.success("Login success!");
        } else {
            toast.error("Invalid user credentials!");
        }
        console.log(response.data);
        })
        .catch((e)=>{
            toast.error("Invalid user credentials!");
        });
    }

    return(
        <>
        <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + logo + ")",
            }}
          ></div>
          <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className=" w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-neutral-50 border-0">
              <div className="rounded-t mb-0 px-6 py-3">
                {/* <hr className="mt-6 border-b-1 border-gray-300" /> */}
              </div>
              <div className="mt-5"></div>
              <div className="mt-4 flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-500 text-center mb-3 font-bold">
                  <h2>Sign in with credentials</h2>
                </div>
                <div className="rounded-t mb-0 px-1 py-5">
                <hr className=" border-b-1 border-gray-300" />
              </div>
                <form onSubmit={loginAdmin}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                    />
                  </div>
                  <div>
                  <div className="text-end mt-2 mb-3">
                        <Link
                          to='/reset_password'
                          className="text-red-600 "
                        >
                          <small>Forgot password?</small>
                        </Link>
                    </div>
                  </div>

                  <div className="text-center mt-6">
                    <button id="loginBtn"
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit" value="submit"
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="mt-8"></div>
                </form>
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

export default AdminLogin;