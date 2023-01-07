import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoMdCloudUpload } from "react-icons/io";
import { useState, useEffect } from "react";

const initialFormState = {
  fname: '',
  lname: '',
  gender: null,
  phone: '',
  address: {
    province: '',
    city: '',
    ward: null,
    tole: ''
  },
  email: '',
  citizenship: '',
  pan: null
}

const config = {
  headers : {
      Authorization : localStorage.getItem('token'),
  }
}

const Profile =()=> {

const [formState, setFormState] = useState(initialFormState);
const [profile_image, setProfileImage] = useState('')

  useEffect(()=>{
    axios.get("http://localhost:8000/admin/user/profile", config)
    .then((response)=>{
      const data = response.data.data
      const profile = data.profile
      const nameArr = profile.fullName.split(' ')

      setFormState(prevState => ({
        ...prevState,
        ...profile,
        pan: profile.pan || null,
        phone: profile.phone || null,
        fname: nameArr[0],
        lname: nameArr[1],
        email: data.email,
        // image : data.image
      }))

      if(data.image?.url){
        setProfileImage(data.image)
      }
    })
    .catch((e)=>{
        console.log(e);
    })
  },[])

  console.log('formState :>> ', formState);

  const handleClick = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullName', (formState.fname + ' ' + formState.lname));
    formData.append('phone', formState.phone || 0);
    formData.append('citizenship', formState.citizenship);
    formData.append('gender', formState.gender);
    formData.append('image', profile_image);
    formData.append('pan', formState.pan || 0);
    formData.append('address.province', formState.address.province);
    formData.append('address.city', formState.address.city);
    formData.append('address.ward', formState.address.ward);
    formData.append('address.tole', formState.address.tole);

    axios.put('http://localhost:8000/admin/user/update', formData, config)
      .then(()=>{
        window.location.reload();
        toast.success('Profile updated successfully!')
      })
      .catch(err => {
        console.log('err :>> ', err);
      })
  };

  const handleChange = e => {
    const {value, name} = e.target
    setFormState(prevState => ({...prevState, [name]: value}))
  }

  const handleAddressChange = e => {
    const {value, name} = e.target
    setFormState(prevState => ({...prevState, address: {...prevState.address, [name]: value}}))
  }

  return (
    <>
        <div className="absolute ">
        <div className="px-4 my-5 md:px-15 mx-auto w-full ">
            <div className="flex flex-wrap">
                <div className="w-full lg:w-4/12 px-4 ">
                <div className="relative flex flex-col min-w-0 break-words bg-blueGray-100 w-full mb-6 shadow-xl rounded-lg mt-16">
                  {/* Card Profile */}
                  <div className="px-6">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full px-4 flex justify-center">
                        <div className="relative">
                          <img
                            alt="..."
                            src={
                              profile_image
                                  ? profile_image.url || URL.createObjectURL(profile_image)
                                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            style={{
                              objectFit : "cover",
                            }}
                            className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                          /> 
                        </div>
                      </div>
                      </div>
                    <div className="lg:mr-4 p-3 text-end items-end content-end">
                    </div>
                    <div className="text-center mt-20">
                      <div className="update_profile_image relative mx-60 -mt-11">
                        <label for="file">
                          <IoMdCloudUpload/>
                          <input type="file" id="file" onChange={(e) => {
                                setProfileImage(e.target.files[0]);
                              }} />
                        </label>
                      </div>
                      <h3 className="text-xl font-semibold leading-normal mt-6 mb-2 text-blueGray-700 mb-2">
                        {formState.fullName}
                      </h3>
                      <div className="text-sm mb-5 leading-normal mt-0 mb-2 text-blueGray-400 font-semibold">
                        <i className="fas fa-envelope mr-2 text-sm text-blueGray-400"></i>
                        {formState.email}
                      </div>
                      <Link
                        className="bg-rose-800 mb-8 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="button"
                        to={'/staff/change_password'}
                      >
                        Change Password
                      </Link>
                    </div>
                    
                  </div>
                </div>
                </div>
                <div className="w-full lg:w-8/12 px-4">
                  {/* Card Settings */}
                  <div className="abso flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                    <div className="rounded-t bg-gray-50 mb-0 px-6 py-6 border-20">
                      <div className="text-center flex justify-between ">
                        <h6 className="text-blueGray-700 text-xl font-bold">My account</h6>
                        <Link
                          className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                          type="button"
                          to={''}
                          onClick={handleClick}
                        >
                          Update Profile
                        </Link>
                      </div>
                    </div>
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                      <form>
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                          User Information
                        </h6>
                        <div className="flex flex-wrap">
                          <div className="w-full lg:w-12/12 px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Email address
                              </label>
                              <p className="text-lg font-semibold leading-normal mb-4 text-blueGray-700 mb-2">{formState.email}</p>
                            </div>
                          </div>
                          <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                First Name
                              </label>
                              <input
                                type="text" name='fname' onChange={handleChange}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                value={formState.fname}
                              />
                            </div>
                          </div>
                          <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Last Name
                              </label>
                              <input
                                type="text" name='lname' onChange={handleChange}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                value={formState.lname}
                              />
                            </div>
                          </div>
                          <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Citizenship Number
                              </label>
                              <input
                                type="text"
                                name='citizenship'
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                value={formState.citizenship}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                PAN Number
                              </label>
                              <input
                                type="text"
                                name='pan'
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                value={formState.pan}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        
                        </div>

                        <hr className="mt-6 border-b-1 border-blueGray-300" />

                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                          Contact Information
                        </h6>
                        <div className="flex flex-wrap">
                          <div className="w-full lg:w-4/12 px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Province
                              </label>
                              <input
                                type="email" name='province' onChange={handleAddressChange}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                value={formState.address.province}
                              />
                            </div>
                          </div>
                          <div className="w-full lg:w-4/12 px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                City
                              </label>
                              <input
                                type="text" name='city' onChange={handleAddressChange}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                value={formState.address.city}
                              />
                            </div>
                          </div>
                          <div className="w-full lg:w-4/12 px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Ward no.
                              </label>
                              <input
                                type="number" name='ward' onChange={handleAddressChange}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                value={formState.address.ward}
                              />
                            </div>
                          </div>
                          <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Tole
                              </label>
                              <input
                                type="text" name='tole' onChange={handleAddressChange}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                value={formState.address.tole}
                              />
                            </div>
                          </div>
                          <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Phone number
                              </label>
                              <input
                                type="text" name='phone' onChange={handleChange}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                value={formState.phone}
                              />
                            </div>
                          </div>
                          
                        </div>

                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                      </form>
                    </div>
                  </div>
                </div>
            </div>
        </div>
      </div>
      
    </>
  );
}

export default Profile;
