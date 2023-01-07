import React from "react";


import CardLineChart from "../../utils/Cards/CardLineChart";
import CardBarChart from "../../utils/Cards/CardBarChart.js";
import CardPageVisits from "../../utils/Cards/CardPageVisits.js";
import CardSocialTraffic from "../../utils/Cards/CardSocialTraffic";

const AdminDashboard = () =>{
  return (
    <>
      <div className="flex flex-wrap my-5">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
        <CardSocialTraffic />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
        <CardBarChart />
        </div>
      </div>
    </>
  );
}
export default AdminDashboard;
