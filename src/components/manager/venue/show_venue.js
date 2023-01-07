import CollapsibleTable from "../../utils/Cards/venueTable";
import { Link, useLocation } from "react-router-dom";

const ShowVenue = ()=>{
    return (
        <>
        <div className="datatable">
                <div className="datatableTitle">
                  <h3 className="datatable_h2">Venue</h3>
                  <Link to={`/venue/new`} className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 my-2 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                    Add New
                  </Link>
                </div>
            <div className="mx-10 mt-10">
                <CollapsibleTable/>
            </div>
            </div>
        </>
    )
}

export default ShowVenue;