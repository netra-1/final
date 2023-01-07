// import React from "react";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import "react-toastify/dist/ReactToastify.css";
// import Chart from "chart.js";
// import moment from "moment";

// const CardSocialTraffic = () => {
//   const token = {
//     headers: {
//       Authorization: localStorage.getItem("token"),
//     },
//   };
//   const [details, setDetails] = useState([]);
//   const [eventName, setEventName] = useState("");
//   const [totalRequest, setTotalRequest] = useState("");
//   const [status, setStatus] = useState("");
//   // const [status, setStatus] = useState("");

//   useEffect(() => {
//     axios
//       .get("http://localhost:8000/admin/event/", token)
//       .then((response) => {
//         // console.log(response);
//         setDetails(response.data.data);
//         // console.log(response.data.data)

//         const allDetails = response.data.data;
//         console.log(allDetails)

//         if (allDetails != null) {
//           allDetails.map((items) => {
//             const eventname = items.eventType;
//             setEventName(items.eventType);

//             if(eventname ){}
            
            
//           });
//         }
//       })
//       .catch((e) => {
//         console.log(e);
//       });

//   }, []);
//   return (
//     <>
//       <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
//         <div className="rounded-t mb-0 px-4 py-3 border-0">
//           <div className="flex flex-wrap items-center">
//             <div className="relative w-full px-4 max-w-full flex-grow flex-1">
//               <h3 className="font-semibold text-base text-blueGray-700">
//                 Event analysis
//               </h3>
//             </div>
//             <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
//               <button
//                 className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                 type="button"
//               >
//                 See all
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="block w-full overflow-x-auto">
//           {/* Projects table */}
//           <table className="items-center w-full bg-transparent border-collapse">
//             <thead className="thead-light">
//               <tr>
//                 <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                   Event Name
//                 </th>
//                 <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                   Total Requests
//                 </th>
//                 <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                   Progress status
//                 </th>
//                 <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                   Completion rate
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
//                   Facebook
//                 </th>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   1,480
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   Done
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   <div className="flex items-center">
//                     <span className="mr-2">60%</span>
//                     <div className="relative w-full">
//                       <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
//                         <div
//                           style={{ width: "60%" }}
//                           className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
//                         ></div>
//                       </div>
//                     </div>
//                   </div>
//                 </td>
//               </tr>
//               <tr>
//                 <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
//                   Facebook
//                 </th>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   5,480
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   <div className="flex items-center">
//                     <span className="mr-2">70%</span>
//                     <div className="relative w-full">
//                       <div className="overflow-hidden h-2 text-xs flex rounded bg-emerald-200">
//                         <div
//                           style={{ width: "70%" }}
//                           className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
//                         ></div>
//                       </div>
//                     </div>
//                   </div>
//                 </td>
//               </tr>
//               <tr>
//                 <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
//                   Google
//                 </th>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   4,807
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   <div className="flex items-center">
//                     <span className="mr-2">80%</span>
//                     <div className="relative w-full">
//                       <div className="overflow-hidden h-2 text-xs flex rounded bg-purple-200">
//                         <div
//                           style={{ width: "80%" }}
//                           className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
//                         ></div>
//                       </div>
//                     </div>
//                   </div>
//                 </td>
//               </tr>
//               <tr>
//                 <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
//                   Instagram
//                 </th>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   3,678
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   <div className="flex items-center">
//                     <span className="mr-2">75%</span>
//                     <div className="relative w-full">
//                       <div className="overflow-hidden h-2 text-xs flex rounded bg-lightBlue-200">
//                         <div
//                           style={{ width: "75%" }}
//                           className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-lightBlue-500"
//                         ></div>
//                       </div>
//                     </div>
//                   </div>
//                 </td>
//               </tr>
//               <tr>
//                 <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
//                   twitter
//                 </th>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   2,645
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   <div className="flex items-center">
//                     <span className="mr-2">30%</span>
//                     <div className="relative w-full">
//                       <div className="overflow-hidden h-2 text-xs flex rounded bg-orange-200">
//                         <div
//                           style={{ width: "30%" }}
//                           className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
//                         ></div>
//                       </div>
//                     </div>
//                   </div>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }


// export default CardSocialTraffic;



import React from 'react';
import Chart from 'chart.js';
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";

const CardSocialTraffic = () => {
  const token = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  const [lastYear, setLastYear] = useState(0);
  const [thirdYear, setThirdYear] = useState(0);
  const [currYear, setCurrYear] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8000/admin/event/", token)
      .then((response) => {
        console.log(response);
        // console.log(response.data.data)

        const allDetails = response.data.data;
        // console.log(allDetails)
        // const currentJan = 0;

        var year1 = 0;
        var year2 = 0;
        var year3 = 0;
        if (allDetails != null) {
          allDetails.map((items) => {
            console.log(moment(items.date).format("YYYY"))
            if (moment(items.date).format("YYYY") == moment().year()) {
              year1 += 1;
              setCurrYear(year1)
            } else if (moment(items.date).format("YYYY") == moment().year() - 1) {
              year2 += 1;
              setLastYear(year2)
            } else {
              year3 += 1;
              setThirdYear(year3)
            }
          },
          );
        }
      })
      .catch((e) => {
        console.log(e);
      });

  }, []);

  console.log("currYear:::::::::::::::::::::::::::::" + currYear)
  console.log("lastyear:::::::::::::::::::::::::::::" + lastYear)
  console.log("thirdyear:::::::::::::::::::::::::::::" + thirdYear)
  console.log("thirdyear:::::::::::::::::::::::::::::" + thirdYear)

  const data = {
    labels: [new Date().getFullYear(), new Date().getFullYear() -1 , `${new Date().getFullYear()-2} or below`],
    datasets: [{
      data: [currYear, lastYear, thirdYear],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 20,
        fontColor: 'black'
      }
    },
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
            return previousValue + currentValue;
          });
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = Math.floor(((currentValue/total) * 100)+0.5);
          return percentage + "%";
        }
      }
    }
  }

  const createPieChart = () => {
    const pieChart = new Chart(document.getElementById('pie-chart'), {
      type: 'pie',
      data: data,
      options: options
    });
  }

  useEffect(() => {
      createPieChart();
  }, [currYear]);

  return(
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Overview
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Event Analysis
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
          <canvas id="pie-chart" width="400" height="400"></canvas>
          </div>
        </div>
      </div>
  )
}

export default CardSocialTraffic;

