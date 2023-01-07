import "./add_venue.scss";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdCloudUpload } from "react-icons/io";
import { Link } from "react-router-dom";

function initialPriceState(from, to, amount) {
  return {
    paxRange: {
      from,
      to,
    },
    amount,
  };
}
const initialFormState = {
  name: "",
  capacity: {
    max: null,
    min: null,
  },
  contact: "",
  location: "",
  remarks: "",
  price: [
    {
      paxRange: {
        from: null,
        to: null,
      },
      amount: null,
    },
  ],
  established: null,
  spaceIndooor: false,
  spaceOutdoor: false,
  venueType: "",
  additionalService: {
    dj: null,
    spaceOnly: null,
  },
};

const AddVenue = () => {
  const [formState, setFormState] = useState(initialFormState);
  // const [priceState, setPriceState] = useState(initialPriceState);
  const [listPrice, setListPrice] = useState([]);

  const [image, setImage] = useState("");
  const [spaceIndooor, setSpaceIndoor] = useState("");
  const [spaceOutdoor, setSpaceOutdoor] = useState("");
  const [venueType, setVenueType] = useState("");

  const [priceFrom, setFrom] = useState("");
  const [priceTo, setTo] = useState("");
  const [priceAmount, setAmount] = useState("");

  var isSpaceIndoor = spaceIndooor === "true";
  var isSpaceOutdoor = spaceOutdoor === "true";

  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  const handleClick = async (e) => {
    e.preventDefault();

    var from_paxRange = priceFrom.split(",");
    var to_paxRange = priceTo.split(",");
    var amount_paxRange = priceAmount.split(",");
    var contact_paxRange = formState.contact.split(",");
    var remarks_paxRange = formState.remarks.split(",");

    console.log(from_paxRange[0]);

    for (var i = 0; i < from_paxRange.length; i++) {
      // initialPriceState(from_paxRange[i],to_paxRange[i],amount_paxRange[i]);
      // setPriceState(prevState => ({...prevState, paxRange: {...prevState.paxRange, from: from_paxRange[i]}}))
      // setPriceState(prevState => ({...prevState, paxRange: {...prevState.paxRange, to: to_paxRange[i]}}))
      // setPriceState(prevState => ({...prevState, amount :amount_paxRange[i] }))
      if (listPrice.length < from_paxRange.length) {
        // const newValue = initialPriceState(
        //   parseInt(from_paxRange[i]),
        //   parseInt(to_paxRange[i]),
        //   parseInt(amount_paxRange[i])
        // )
        listPrice.push(
          {
            paxRange: {
              from: from_paxRange[i],
              to: to_paxRange[i],
            },
            amount: amount_paxRange[i],
          },
        );
      }
    }
    console.log(listPrice);

    const formData = new FormData();
    formData.append("name", formState.name);
    formData.append("capacity.max", formState.capacity.max || 0);
    formData.append("capacity.min", formState.capacity.min || 0);
    formData.append("location", formState.location);
    formData.append("contact", contact_paxRange);
    formData.append("remarks", remarks_paxRange);
    formData.append("established", formState.established || 0);
    formData.append("venueType", venueType);
    formData.append("image", image);
    formData.append("spaceIndoor", isSpaceIndoor);
    formData.append("spaceOutdoor", isSpaceOutdoor);
    formData.append("price", listPrice);

    console.log(listPrice)

    // formData.append('address.ward', formState.address.ward);
    // formData.append('address.tole', formState.address.tole);

    try {
      await axios
        .post("http://localhost:8000/admin/venue", formData, config)
        .then((response) => {
          window.location.replace("/all_venue");
          toast.success("Successfully added");
          console.log(response.data.msg);
        });
    } catch (e) {
      toast.failed("Failed to add");
      console.log(e);
    }
  };
  const getInitialState = () => {
    const value = "RESORT";
    return value;
  };

  const [value, setValue] = useState(getInitialState);

  const handleChange = (e) => {
    setValue(e.target.value);
    setVenueType(e.target.value);
  };

  const handleFieldChange = (e) => {
    const { value, name } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCapacityChange = (e) => {
    const { value, name } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      capacity: { ...prevState.capacity, [name]: value },
    }));
  };

  const handleAdditionalChange = (e) => {
    const { value, name } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      additionalService: { ...prevState.additionalService, [name]: value },
    }));
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
                        objectFit: "cover",
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
                    <h6 className="text-blueGray-700 text-2xl font-bold">
                      Add Venue
                    </h6>
                    <Link
                      className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      type="button"
                      to={""}
                      onClick={handleClick}
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
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            onChange={handleFieldChange}
                            name="name"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Enter venue name"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Established Year
                          </label>
                          <input
                            type="number"
                            onChange={handleFieldChange}
                            name="established"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Enter established year"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Contact number
                          </label>
                          <input
                            type="text"
                            onChange={handleFieldChange}
                            name="contact"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Seperate numbers with comma"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Type
                          </label>
                          <div>
                            <select
                              value={value}
                              onChange={handleChange}
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            >
                              <option value="RESORT">RESORT</option>
                              <option value="BANQUET">BANQUET</option>
                              <option value="STADIUM">STADIUM</option>
                              <option value="NIGHT CLUB">NIGHT CLUB</option>
                              <option value="ACADEMIC VENUE">
                                ACADEMIC VENU
                              </option>
                              <option value="COMMMUNITY CENTER">
                                COMMMUNITY CENTER
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="w-full lg:w-12/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Location
                          </label>
                          <input
                            type="text"
                            onChange={handleFieldChange}
                            name="location"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Enter location"
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
                            Remarks
                          </label>
                          <textarea
                            onChange={handleFieldChange}
                            name="remarks"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Enter remarks"
                          />
                        </div>
                      </div>
                    </div>

                    <h6 className="text-blueGray-400 text-sm mt-3 mb-2 font-bold px-4">
                      Select capacity
                    </h6>

                    <div className="flex flex-wrap">
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Minimum
                          </label>
                          <input
                            type="number"
                            onChange={handleCapacityChange}
                            name="min"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Enter minimum number of people"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            maximum
                          </label>
                          <input
                            type="number"
                            onChange={handleCapacityChange}
                            name="max"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Enter maximum number of people"
                          />
                        </div>
                      </div>
                    </div>

                    <h6 className="text-blueGray-400 text-sm mt-3 mb-2 font-bold px-4">
                      Pricing
                    </h6>

                    <div className="flex flex-wrap">
                      <div className="w-full lg:w-4/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            From (no of people)
                          </label>
                          <input
                            type="text"
                            onChange={(e) => setFrom(e.target.value)}
                            name="from"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="From (no of people)"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-4/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            To (no of people)
                          </label>
                          <input
                            type="text"
                            onChange={(e) => setTo(e.target.value)}
                            name="to"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="To (no of people)"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-4/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Amount
                          </label>
                          <input
                            type="text"
                            onChange={(e) => setAmount(e.target.value)}
                            name="amount"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Enter total amount"
                          />
                        </div>
                      </div>

                      <div className="w-full lg:w-4/12 px-4 mt-3">
                        <div className="relative w-full mb-3">
                          <label
                            className="block text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Space Indoor ?
                          </label>
                          <div class="flex">
                            <div class="flex items-center mr-4">
                              <input
                                id="inline-radio"
                                type="radio"
                                value={true}
                                name="inline-radio-group"
                                onChange={(e) => setSpaceIndoor(e.target.value)}
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                for="inline-radio"
                                class="ml-2 text-sm font-medium text-blueGray-500"
                              >
                                YES
                              </label>
                            </div>
                            <div class="flex items-center mr-4">
                              <input
                                id="inline-2-radio"
                                type="radio"
                                value={false}
                                name="inline-radio-group"
                                onChange={(e) => setSpaceIndoor(e.target.value)}
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                for="inline-2-radio"
                                class="ml-2 text-sm font-medium text-blueGray-500"
                              >
                                NO
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full lg:w-4/12 px-4 mt-3">
                        <div className="relative w-full mb-3">
                          <label
                            className="block text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Space Outdoor ?
                          </label>
                          <div class="flex">
                            <div class="flex items-center mr-4">
                              <input
                                id="inline-radio"
                                type="radio"
                                value={true}
                                name="inline-radio-group-available"
                                onChange={(e) =>
                                  setSpaceOutdoor(e.target.value)
                                }
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                for="inline-radio"
                                class="ml-2 text-sm font-medium text-blueGray-500"
                              >
                                YES
                              </label>
                            </div>
                            <div class="flex items-center mr-4">
                              <input
                                id="inline-2-radio"
                                type="radio"
                                value={false}
                                name="inline-radio-group-available"
                                onChange={(e) =>
                                  setSpaceOutdoor(e.target.value)
                                }
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                for="inline-2-radio"
                                class="ml-2 text-sm font-medium text-blueGray-500"
                              >
                                NO
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr className="mt-2 border-b-1 border-blueGray-300" />

                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                      Additional Services (If available)
                    </h6>
                    <div className="flex flex-wrap">
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            DJ (price)
                          </label>
                          <input
                            type="number"
                            onChange={handleAdditionalChange}
                            name="dj"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Enter DJ price"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            SpaceOnly (Price)
                          </label>
                          <input
                            type="number"
                            onChange={handleAdditionalChange}
                            name="spaceOnly"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Enter spaceonly price"
                          />
                        </div>
                      </div>
                    </div>

                    <hr className="mb-4 mt-3 border-b-1 border-blueGray-300" />

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
                            <input
                              type="file"
                              id="file"
                              onChange={(e) => {
                                setImage(e.target.files[0]);
                              }}
                            />
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

export default AddVenue;
