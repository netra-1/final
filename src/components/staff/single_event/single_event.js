import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from 'moment';
import { HiOutlineChatAlt2 } from 'react-icons/hi';

const SingleEvent = () => {
    const { id } = useParams();
    const [show, setShow] = useState(false);
    const [showDecoration, setShowDecoration] = useState(false);
    const [showDrinks, setShowDrinks] = useState(false);
    const [showCakes, setShowCakes] = useState(false);
    const [details, setDetails] = useState([]);
    const [userData, setUserData] = useState([]);
    const [fullname, setFullName] = useState([]);
    const [staffName, setStaffName] = useState([]);
    const [venue, setVenue] = useState([]);
    const [drinks, setDrinks] = useState([]);
    const [cakes, setCakes] = useState([]);
    const [decorations, setDecorations] = useState([]);
    const [assignedStaff, setAssignedStaff] = useState([]);
    const [isAssigned, setIsAssigned] = useState(false);


    const config = {
        headers : {
            Authorization : localStorage.getItem('token'),
        }
      }

    useEffect(() => {
        axios
          .get("http://localhost:8000/admin/event/"+ id, config)
          .then((result) => {
            console.log(result.data.data);
            setDetails(result.data.data);
            setUserData(result.data.data.userId);
            setFullName(result.data.data.userId.profile);
            setStaffName(result.data.data.assignedStaff.profile);
            setAssignedStaff(result.data.data.assignedStaff);
            setVenue(result.data.data.venue);
            setDrinks(result.data.data.drinks);
            setCakes(result.data.data.cakes);
            setDecorations(result.data.data.decorations);
            console.log(result.data.data.assignedStaff);
            if (assignedStaff){
                setIsAssigned(true)
              } else{
                setIsAssigned(false)
              }
          })
          .catch((e) => {
            console.log(e);
          });
      }, []);

    //   console.log(assignedStaff)

      

    return (
        <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
            <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
                <img className="w-full" alt="img of a girl posing" src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" />
                <img className="mt-6 w-full" alt="img of a girl posing" src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" />
            </div>
            <div className="md:hidden">
                <img className="w-full" alt="img of a girl posing" src="https://i.ibb.co/QMdWfzX/component-image-one.png" />
                <div className="flex items-center justify-between mt-3 space-x-4 md:space-x-0">
                    <img alt="img-tag-one" className="md:w-48 md:h-48 w-full" src="https://i.ibb.co/cYDrVGh/Rectangle-245.png" />
                    <img alt="img-tag-one" className="md:w-48 md:h-48 w-full" src="https://i.ibb.co/f17NXrW/Rectangle-244.png" />
                    <img alt="img-tag-one" className="md:w-48 md:h-48 w-full" src="https://i.ibb.co/cYDrVGh/Rectangle-245.png" />
                    <img alt="img-tag-one" className="md:w-48 md:h-48 w-full" src="https://i.ibb.co/f17NXrW/Rectangle-244.png" />
                </div>
            </div>
            <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
                <div className="border-b border-gray-200 pb-6">
                    <p className="text-sm leading-none text-gray-600">EventX</p>
                    <h1
                        className="
							lg:text-2xl
							text-xl
							font-semibold
							lg:leading-6
							leading-7
							text-gray-800
							mt-2
						"
                    >
                        {details.eventType}
                    </h1>
                </div>
                <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                    <p className="text-base leading-4 text-gray-800">Customer</p>
                    <div className="flex items-center justify-center">
                        <p className="text-sm leading-none text-gray-600">{fullname.fullName} | {userData.email}</p>
                    </div>
                </div>
                <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                    <p className="text-base leading-4 text-gray-800">Created at</p>
                    <div className="flex items-center justify-center">
                        <p className="text-sm leading-none text-gray-600 mr-3">{moment(details.date).format("MMMM Do YYYY")}</p>
                        {/* <svg className="cursor-pointer" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L5 5L1 9" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        </svg> */}
                    </div>
                </div>
                {(() => {
                    if (isAssigned) {
                    return (
                        <>
                        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                            <p className="text-base leading-4 text-gray-800">Assigned to</p>
                            <div className="flex items-center justify-center">
                                <p className="text-sm leading-none text-gray-600 mr-3">{staffName.fullName}</p>
                            </div>
                        </div>
                        </>
                    )
                    } else{
                    return (
                        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                            <p className="text-base leading-4 text-gray-800">Assigned to</p>
                            <div className="flex items-center justify-center">
                                <p className="text-sm leading-none text-gray-600 mr-3">Unassigned</p>
                            </div>
                        </div>
                    )
                    }
                })()}
                <button
                    className="
						focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800
						text-base
						flex
						items-center
						justify-center
						leading-none
						text-white
						bg-gray-800
						w-full
						py-4
						hover:bg-gray-700
					"
                >
                    <span className="mx-2"><HiOutlineChatAlt2/></span>
                    Click to chat with customer
                </button>
                {/* <div>
                    <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 mt-7">It is a long established fact that a reader will be distracted by thereadable content of a page when looking at its layout. The point of usingLorem Ipsum is that it has a more-or-less normal distribution of letters.</p>
                    <p className="text-base leading-4 mt-7 text-gray-600">Product Code: 8BN321AF2IF0NYA</p>
                    <p className="text-base leading-4 mt-4 text-gray-600">Length: 13.2 inches</p>
                    <p className="text-base leading-4 mt-4 text-gray-600">Height: 10 inches</p>
                    <p className="text-base leading-4 mt-4 text-gray-600">Depth: 5.1 inches</p>
                    <p className="md:w-96 text-base leading-normal text-gray-600 mt-4">Composition: 100% calf leather, inside: 100% lamb leather</p>
                </div> */}
                <div className="py-4 mt-7 border-t border-gray-200 flex items-center justify-between">
                    <p className="text-base leading-4 text-gray-800">No of people</p>
                    <div className="flex items-center justify-center">
                        <p className="text-sm leading-none text-gray-600 mr-3">{details.numberOfPeople}</p>
                        {/* <svg className="cursor-pointer" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L5 5L1 9" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        </svg> */}
                    </div>
                </div>
                <div>
                    <div className="border-t border-b border-gray-200 py-4 mt-1">
                        <div onClick={() => setShow(!show)} className="flex justify-between items-center cursor-pointer">
                            <p className="text-base leading-4 text-gray-800">Venue</p>
                            <button
                                className="
									cursor-pointer
									focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
									rounded
								"
                                aria-label="show or hide"
                            >
                                <svg className={"transform " + (show ? "rotate-180" : "rotate-0")} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 1L5 5L1 1" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className={"border-t border-b border-gray-200 py-4 flex items-center justify-between pt-1 text-base leading-normal pr-1 mt-4 text-gray-600 " + (show ? "block" : "hidden")} id="sect">
                            <p className="text-base leading-normal text-gray-600">Name</p>
                            <div className="flex items-center justify-center">
                                <p className="text-sm leading-none text-gray-600">{venue.name}</p>
                            </div>
                        </div>
                        <div className={"py-4 flex items-center justify-between pt-1 text-base leading-normal pr-1 text-gray-600 " + (show ? "block" : "hidden")} id="sect">
                            <p className="text-base leading-normal text-gray-600">Location</p>
                            <div className="flex items-center justify-center">
                                <p className="text-sm leading-none text-gray-600">{venue.location}</p>
                            </div>
                        </div>
                        <div className={"xl:w-3/6 lg:w-2/5 w-80 flex d-block py-4 flex items-center justify-between pt-1 text-base leading-normal pr-1 text-gray-600 " + (show ? "block" : "hidden")} id="sect">
                            <img className="w-full px-1" alt="img of a girl posing" src="https://images.unsplash.com/photo-1524824267900-2fa9cbf7a506?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" />
                            <img className="w-full " alt="img of a girl posing" src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1498&q=80" />
                        </div>
                    </div>
                </div>
                <div>
                    <div className=" border-b border-gray-200 py-4">
                        <div onClick={() => setShowDrinks(!showDrinks)} className="flex justify-between items-center cursor-pointer">
                            <p className="text-base leading-4 text-gray-800">Drinks</p>
                            <button
                                className="
									cursor-pointer
									focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
									rounded
								"
                                aria-label="show or hide"
                            >
                                <svg className={"transform " + (showDrinks ? "rotate-180" : "rotate-0")} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 1L5 5L1 1" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        {drinks.map((data) => {
                        // console.log(data._id.name);
                        const list = (
                            <>
                                <div className={"border-t border-gray-200 py-1 flex items-center justify-between pt-1 text-base leading-normal pr-1 mt-4 text-gray-600 " + (showDrinks ? "block" : "hidden")} id="sect">
                                    <p className="text-base leading-normal text-gray-600">{data._id.name}</p>
                                    <div className="flex items-center justify-center">
                                        <p className="text-sm leading-none text-gray-600">Quantity: {data.quantity}</p>
                                    </div>
                                </div>
                            </>
                        );
                        return list;
                        })}
                    </div>
                </div>
                <div>
                    <div className=" border-b border-gray-200 py-4">
                        <div onClick={() => setShowCakes(!showCakes)} className="flex justify-between items-center cursor-pointer">
                            <p className="text-base leading-4 text-gray-800">Cakes</p>
                            <button
                                className="
									cursor-pointer
									focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
									rounded
								"
                                aria-label="show or hide"
                            >
                                <svg className={"transform " + (showCakes ? "rotate-180" : "rotate-0")} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 1L5 5L1 1" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        {cakes.map((data) => {
                        // console.log(data._id.name);
                        const list = (
                            <>
                                <div className={"border-t border-gray-200 py-1 flex items-center justify-between pt-1 text-base leading-normal pr-1 mt-4 text-gray-600 " + (showCakes ? "block" : "hidden")} id="sect">
                                    <p className="text-base leading-normal text-gray-600">{data._id.name}</p>
                                    <div className="flex items-center justify-center">
                                        <p className="text-sm leading-none text-gray-600">{data.pound} pound</p>
                                    </div>
                                </div>
                                <div className={"xl:w-3/6 lg:w-2/5 w-80 flex d-block py-4 flex items-center justify-between pt-1 text-base leading-normal pr-1 text-gray-600 " + (showCakes ? "block" : "hidden")} id="sect">
                                    <img className="w-full px-1" alt="img of a girl posing" src={data._id.image.url} />
                                </div>
                            </>
                        );
                        return list;
                        })}
                    </div>
                </div>
                <div>
                    <div className=" border-b border-gray-200 py-4">
                        <div onClick={() => setShowDecoration(!showDecoration)} className="flex justify-between items-center cursor-pointer">
                            <p className="text-base leading-4 text-gray-800">Decoration</p>
                            <button
                                className="
									cursor-pointer
									focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
									rounded
								"
                                aria-label="show or hide"
                            >
                                <svg className={"transform " + (showDecoration ? "rotate-180" : "rotate-0")} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 1L5 5L1 1" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        {decorations.map((data) => {
                        // console.log(data._id.name);
                        const list = (
                            <>
                                <div className={"border-t border-gray-200 py-1 flex items-center justify-between pt-1 text-base leading-normal pr-1 mt-4 text-gray-600 " + (showDecoration ? "block" : "hidden")} id="sect">
                                    <p className="text-base leading-normal text-gray-600">{data.name}</p>
                                    <div className="flex items-center justify-center">
                                    </div>
                                </div>
                                <div className={"xl:w-3/6 lg:w-2/5 w-80 flex d-block py-4 flex items-center justify-between pt-1 text-base leading-normal pr-1 text-gray-600 " + (showDecoration ? "block" : "hidden")} id="sect">
                                    <img className="w-full px-1" alt="img of a girl posing" src={data.image.url} />
                                </div>
                            </>
                        );
                        return list;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleEvent;
