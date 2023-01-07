import "./add_venue.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateVenue = () => {
  const { venueId } = useParams();

  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  const [venue_name, setVenue] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:90/venue/display_single/" + venueId)
      .then((response) => {
        console.log(response);
        setVenue(response.data.data.venue_name);
        setDescription(response.data.data.description);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newVenue = {
        venue_name: venue_name,
        description: description,
      };

      await axios
        .put(
          "http://localhost:90/venue/update/" + venueId,
          newVenue
        )
        .then(() => {
          window.location.replace("/venue");
          toast.success("Updated successfully");
        })
        .catch((e) => {
          toast.failed("Failed to update");
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="new">
        <div className="newContainer mt-1">
          <div className="top mt-5">
            <h1 className="text-center pb-5">Update Venue</h1>
          </div>
          <div className="bottom">
            <div className="right">
            <form class="w-full max-w-lg">
            <div class="flex flex-wrap -mx-3 -mb-6">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block tracking-wide text-gray-700 text-meduim mb-2" for="grid-first-name">
                  Name
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 
                  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none
                  focus:bg-white" id="grid-first-name" type="text" placeholder="Enter venue..."
                  onChange={(e) => setVenue(e.target.value)}
                 />
              </div>
              <div class="w-full md:w-1/2 px-3 -mb-6">
                <label class="block tracking-wide text-gray-700 text-meduim mb-2" for="grid-last-name">
                  Description
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded
                 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name"
                  type="Enter description..." placeholder="Enter description..." 
                  onChange={(e) => setDescription(e.target.value)}
                  />
              </div>
            </div>
              <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mt-3 rounded inline-flex items-center" onClick={handleClick}>
              Update Venue
              </button>
          </form>
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

export default UpdateVenue;
