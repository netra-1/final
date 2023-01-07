import axios from "axios";
import React from "react";
import Chart from "chart.js";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import moment from "moment";

const CardLineChart = () => {
  const token = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  const [details, setDetails] = useState([]);
  const [prevYear, setPrevYear] = useState([]);
  const [currYear, setCurrYear] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/admin/event/", token)
      .then((response) => {
        console.log(response);
        setDetails(response.data.data);
        // console.log(response.data.data)
        var currentJan = 0;
        var currentFeb = 0;
        var currentMar = 0;
        var currentApr = 0;
        var currentMay = 0;
        var currentJun = 0;
        var currentJul = 0;
        var currentAug = 0;
        var currentSep = 0;
        var currentOct = 0;
        var currentNov = 0;
        var currentDec = 0;

        var prevJan = 0;
        var prevFeb = 0;
        var prevMar = 0;
        var prevApr = 0;
        var prevMay = 0;
        var prevJun = 0;
        var prevJul = 0;
        var prevAug = 0;
        var prevSep = 0;
        var prevOct = 0;
        var prevNov = 0;
        var prevDec = 0;

        const allDetails = response.data.data;
        // console.log(allDetails)
        // const currentJan = 0;
        if (allDetails != null) {
          allDetails.map((items) => {
            const date_time = items.date.split("T")[0].split("-")[1];
            console.log(moment(items.date).format("YYYY"))
            if (moment(items.date).format("YYYY") == moment().year()) {
              if (date_time.toString()=="01") {
                // const newVar = 0;
                currentJan += 1;
                setCurrYear([currentJan,currentFeb,currentMar,currentApr,currentMay,currentJun,currentJul,currentAug,currentSep,currentOct,currentNov,currentDec]);
              }if (date_time.toString() == "02") {
                currentFeb += 1;
                setCurrYear([currentJan,currentFeb,currentMar,currentApr,currentMay,currentJun,currentJul,currentAug,currentSep,currentOct,currentNov,currentDec]);
              }
              if (date_time.toString() == "03") {
                currentMar += 1;
                setCurrYear([currentJan,currentFeb,currentMar,currentApr,currentMay,currentJun,currentJul,currentAug,currentSep,currentOct,currentNov,currentDec]);
              }
              if (date_time.toString() == "04") {
                currentApr += 1;
                setCurrYear([currentJan,currentFeb,currentMar,currentApr,currentMay,currentJun,currentJul,currentAug,currentSep,currentOct,currentNov,currentDec]);
              }
              if (date_time.toString() == "05") {
                currentMay += 1;
                setCurrYear([currentJan,currentFeb,currentMar,currentApr,currentMay,currentJun,currentJul,currentAug,currentSep,currentOct,currentNov,currentDec]);
              }
              if (date_time.toString() == "06") {
                currentJun += 1;
                setCurrYear([currentJan,currentFeb,currentMar,currentApr,currentMay,currentJun,currentJul,currentAug,currentSep,currentOct,currentNov,currentDec]);
              }
              if (date_time.toString() == "07") {
                currentJul += 1;
                setCurrYear([currentJan,currentFeb,currentMar,currentApr,currentMay,currentJun,currentJul,currentAug,currentSep,currentOct,currentNov,currentDec]);
              }
              if (date_time.toString() == "08") {
                currentAug += 1;
                setCurrYear([currentJan,currentFeb,currentMar,currentApr,currentMay,currentJun,currentJul,currentAug,currentSep,currentOct,currentNov,currentDec]);
              }
              if (date_time.toString() == "09") {
                console.log("abc")
                currentSep += 1;
                setCurrYear([currentJan,currentFeb,currentMar,currentApr,currentMay,currentJun,currentJul,currentAug,currentSep,currentOct,currentNov,currentDec]);
              }
              if (date_time.toString() == "10") {
                currentOct += 1;
                setCurrYear([currentJan,currentFeb,currentMar,currentApr,currentMay,currentJun,currentJul,currentAug,currentSep,currentOct,currentNov,currentDec]);
              }
              if (date_time.toString() == "11") {
                currentNov += 1;
                setCurrYear([currentJan,currentFeb,currentMar,currentApr,currentMay,currentJun,currentJul,currentAug,currentSep,currentOct,currentNov,currentDec]);
              }
              if (date_time.toString() == "12") {
                console.log("abc")
                currentDec += 1;
                setCurrYear([currentJan,currentFeb,currentMar,currentApr,currentMay,currentJun,currentJul,currentAug,currentSep,currentOct,currentNov,currentDec]);
              }
            } else{
              if (date_time.toString()=="01") {
                // const newVar = 0;
                prevJan += 1;
                setPrevYear([prevJan,prevFeb,prevMar,prevApr,prevMay,prevJun,prevJul,prevAug,prevSep,prevOct,prevNov,prevDec]);
              }if (date_time.toString() == "02") {
                prevFeb += 1;
                setPrevYear([prevJan,prevFeb,prevMar,prevApr,prevMay,prevJun,prevJul,prevAug,prevSep,prevOct,prevNov,prevDec]);
              }
              if (date_time.toString() == "03") {
                prevMar += 1;
                setPrevYear([prevJan,prevFeb,prevMar,prevApr,prevMay,prevJun,prevJul,prevAug,prevSep,prevOct,prevNov,prevDec]);
              }
              if (date_time.toString() == "04") {
                prevApr += 1;
                setPrevYear([prevJan,prevFeb,prevMar,prevApr,prevMay,prevJun,prevJul,prevAug,prevSep,prevOct,prevNov,prevDec]);
              }
              if (date_time.toString() == "05") {
                prevMay += 1;
                setPrevYear([prevJan,prevFeb,prevMar,prevApr,prevMay,prevJun,prevJul,prevAug,prevSep,prevOct,prevNov,prevDec]);
              }
              if (date_time.toString() == "06") {
                prevJun += 1;
                setPrevYear([prevJan,prevFeb,prevMar,prevApr,prevMay,prevJun,prevJul,prevAug,prevSep,prevOct,prevNov,prevDec]);
              }
              if (date_time.toString() == "07") {
                prevJul += 1;
                setPrevYear([prevJan,prevFeb,prevMar,prevApr,prevMay,prevJun,prevJul,prevAug,prevSep,prevOct,prevNov,prevDec]);
              }
              if (date_time.toString() == "08") {
                prevAug += 1;
                setPrevYear([prevJan,prevFeb,prevMar,prevApr,prevMay,prevJun,prevJul,prevAug,prevSep,prevOct,prevNov,prevDec]);
              }
              if (date_time.toString() == "09") {
                prevSep += 1;
                setPrevYear([prevJan,prevFeb,prevMar,prevApr,prevMay,prevJun,prevJul,prevAug,prevSep,prevOct,prevNov,prevDec]);
              }
              if (date_time.toString() == "10") {
                prevOct += 1;
                setPrevYear([prevJan,prevFeb,prevMar,prevApr,prevMay,prevJun,prevJul,prevAug,prevSep,prevOct,prevNov,prevDec]);
              }
              if (date_time.toString() == "11") {
                prevNov += 1;
                setPrevYear([prevJan,prevFeb,prevMar,prevApr,prevMay,prevJun,prevJul,prevAug,prevSep,prevOct,prevNov,prevDec]);
              }
              if (date_time.toString() == "12") {
                prevDec += 1;
                setPrevYear([prevJan,prevFeb,prevMar,prevApr,prevMay,prevJun,prevJul,prevAug,prevSep,prevOct,prevNov,prevDec]);
              }
            }
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });

  }, []);

  useEffect(()=>{
    // console.log(details[0]);
    if(prevYear.length == 12){
      var config = {
        type: "line",
        data: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: new Date().getFullYear(),
              backgroundColor: "#4c51bf",
              borderColor: "#4c51bf",
              data: currYear,
              fill: false,
            },
            {
              label: `${new Date().getFullYear() - 1}` + " or below",
              fill: false,
              backgroundColor: "#fff",
              borderColor: "#fff",
              data: prevYear,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: false,
            text: "Sales Charts",
            fontColor: "white",
          },
          legend: {
            labels: {
              fontColor: "white",
            },
            align: "end",
            position: "bottom",
          },
          tooltips: {
            mode: "index",
            intersect: false,
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  fontColor: "rgba(255,255,255,.7)",
                },
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Month",
                  fontColor: "white",
                },
                gridLines: {
                  display: false,
                  borderDash: [2],
                  borderDashOffset: [2],
                  color: "rgba(33, 37, 41, 0.3)",
                  zeroLineColor: "rgba(0, 0, 0, 0)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  fontColor: "rgba(255,255,255,.7)",
                },
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Value",
                  fontColor: "white",
                },
                gridLines: {
                  borderDash: [3],
                  borderDashOffset: [3],
                  drawBorder: false,
                  color: "rgba(255, 255, 255, 0.15)",
                  zeroLineColor: "rgba(33, 37, 41, 0)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
          },
        },
      };
      var ctx = document.getElementById("line-chart").getContext("2d");
      window.myLine = new Chart(ctx, config);
    }
    // console.log(currYear)
  },[prevYear.length]);

  // if(currYear != 12){
  //   return 'Waiting'
  // }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                Overview
              </h6>
              <h2 className="text-white text-xl font-semibold">
                Events
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardLineChart;
