import React from "react";
import moment from 'moment';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import "./datatable.scss";

const config = {
  headers : {
      Authorization : localStorage.getItem('token'),
  }
}

const accessAccount = (id) => {
  axios.put(`http://localhost:8000/admin/user/access/${id}`, {}, config)
    .then((res)=>{
    window.location.reload();
    toast.success(res.response.data.message);
    })
    .catch((err)=>{
      toast.error(err.response.data.message)
    });
};

const toggleDrinkAvailabiliy = (id) => {
  axios.put(`http://localhost:8000/admin/drink/availability/${id}`, {}, config)
    .then((res)=>{
    window.location.reload();
    toast.success(res.response.data.message);
    })
    .catch((err)=>{
      toast.error(err.response.data.message)
    });
};

const actionReset = (id) => {
    axios.put(`http://localhost:8000/admin/user/set-default-password/${id}`, {}, config)
      .then(()=>{
      window.location.reload();
      toast.success('Password Reset to Default');
      })
      .catch(()=>{
        toast.error("No request for reset password")
      });
};

export const venueColumns = [
  {
    field: "name",
    headerName: "Name",
    width: 180,
  },
  {
    field: "location",
    headerName: "Location",
    width: 250,
  },
  {
    field: "contact",
    headerName: "Contact",
    width: 180,
  },
  {
    field: "capacity",
    headerName: "Capacity [min-max]",
    width: 160,
    renderCell:(params)=>{
      return(
        <div className="">
          min: {params.row.capacity.min} <br/> max: {params.row.capacity.max}
        </div>
      )
    }
  },
  {
    field: "price",
    headerName: "(min - max) people : Amount",
    width: 250,
    // renderCell:(params)=>{
    //   return(
    //     <>
    //     <div className="">
    //     {params.row.price.reduce((acc, curr)=> acc +=
    //       `${curr.paxRange.from} - ${curr.paxRange.to} : ${curr.amount}\n`
    //       )
    //     }
    //     </div>
    //     </>
    //   )
    // },


    valueGetter: (params) => params.row.price.reduce((acc, curr) => acc += `${curr.paxRange.from} - ${curr.paxRange.to} : ${curr.amount}\n`, '')
  },
];

export const themeColumns = [
  {
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      console.log(params.row.image)
      return (
        <>
        <div className="cellWithImg">
          <img className="cellImg" src={params?.row?.image?.url || "https://cdn4.iconfinder.com/data/icons/prohibited/100/16-1024.png"} alt="avatar" />
        </div>
      </>
      );
    },
  },
  {
    field: "name",
    headerName: "Theme Name",
    width: 200,
  },
  {
    field: "description",
    headerName: "Description",
    width: 400,
  },
  {
    field: "speciality",
    headerName: "Speciality",
    width: 200,
  },
];

export const cakeColumns = [
  {
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      console.log(params.row.image)
      return (
        <>
        <div className="cellWithImg">
          <img className="cellImg" src={params?.row?.image?.url || "https://cdn4.iconfinder.com/data/icons/prohibited/100/16-1024.png"} alt="avatar" />
        </div>
      </>
      );
    },
  },
  {
    field: "name",
    headerName: "Cake Name",
    width: 170,
  },
  {
    field: "description",
    headerName: "Description",
    width: 400,
  },
  {
    field: "price",
    headerName: "Price",
    width: 200,
  },
];

export const decorationColumns = [
  {
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      console.log(params.row.image)
      return (
        <>
        <div className="cellWithImg">
          <img className="cellImg" src={params?.row?.image?.url || "https://cdn4.iconfinder.com/data/icons/prohibited/100/16-1024.png"} alt="avatar" />
        </div>
      </>
      );
    },
  },
  {
    field: "name",
    headerName: "Decoration Name",
    width: 200,
  },
  // {
  //   field: "type",
  //   headerName: "Type",
  //   width: 150,
  // },
  {
    field: "description",
    headerName: "Description",
    width: 350,
  },
  {
    field: "price",
    headerName: "Price",
    width: 115,
  },
];


export const drinksColumns = [
  {
    field: "image",
    headerName: "Image",
    width: 60,
    renderCell: (params) => {
      console.log(params.row.image)
      return (
        <>
        <div className="cellWithImg">
          <img className="cellImg" src={params?.row?.image?.url || "https://cdn4.iconfinder.com/data/icons/prohibited/100/16-1024.png"} alt="avatar" />
        </div>
      </>
      );
    },
  },
  {
    field: "name",
    headerName: "Drink Name",
    width: 150,
  },
  {
    field: "description",
    headerName: "Description",
    width: 260,
  },
  {
    field: "price",
    headerName: "Price",
    width: 95,
  },
  {
    field: "category",
    headerName: "Category",
    width: 115,
  },
  {
    field: "available",
    headerName: "Availability",
    width: 105,
    renderCell: (params) => {
      const isAvaialable = params.row.available;
      return (
        <>
          <div className="cellAction">
            <button
            title={`Click if drink is ${isAvaialable ? 'unavailable' : 'available'}`}
              onClick={() => {
                if(window.confirm(`Are you sure, you want to make this drink ${isAvaialable ? 'unavailable' : 'available'} ?`)){
                  toggleDrinkAvailabiliy(params.row._id)
                }
              }}
              className={`${isAvaialable ? 'successButton' : 'deleteButton'}`}
              >
              {isAvaialable ? 'Available' : 'Unavailable'}
            </button>
          </div>
        </>
      );
    },
  },
  {
    field: "imported",
    headerName: "Imported",
    width: 80,
    renderCell: (params) => {
      const isImported = params.row.imported;
      return (
        <>
          {(() => {
            if (isImported == true) {
              return (
                <p className="">
                  Yes
                </p>
              )
            } else {
              return (
                <div className="">
                  No
                </div>
              )
            }
          })()}
        </>
      );
    },
  },
  {
    field: "alcoholic",
    headerName: "Alcoholic",
    width: 120,
    renderCell: (params) => {
      const isAlcoholic = params.row.alcoholic;
      return (
        <>
          {(() => {
            if (isAlcoholic == true) {
              return (
                <p className="">
                  Alcoholic
                </p>
              )
            } else {
              return (
                <div className="">
                  Non-alchoholic
                </div>
              )
            }
          })()}
        </>
      );
    },
  },
  
  
];

export const staffColumns = [
  {
    width: 60,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image?.url || "https://www.pngfind.com/pngs/m/80-804674_png-file-male-user-vector-transparent-png.png"} alt="avatar" />
        </div>
      );
    },
  },
  
  {
    field: "profile",
    headerName: "Full name",
    width: 250,
    renderCell: (params) => {
      return (
        <>
          {params.row.profile.fullName}
        </>
      );
    },
  },
  {
    field: "email",
    headerName: "Email address",
    width: 230,
  },
  {
    field: "access",
    headerName: "Access status",
    width: 150,
    align: 'center',
    renderCell: (params) => {
      const isAccess = params.row.access;
      return (
        <div className="cellAction">
        
        {/* <div className="cellAction">
                  <Link style={{ textDecoration: "none" }} to={'/staff/single_event/' + params.row._id}>
                    <div className="viewButton">View</div>
                  </Link>
                  <div
                    className="deleteButton"
                    onClick={() => assignEvent(params.row._id)}
                  >
                    Assign
                  </div>
                </div> */}
          <button
           title={`Click to ${isAccess ? 'revoke' : 'grant'} access`}
            onClick={() => {
              if(window.confirm(`Are you sure, you want to ${isAccess ? 'revoke' : 'grant'} user's access?`)){
                accessAccount(params.row._id)
              }
            }}
             className={`${isAccess ? 'successButton' : 'deleteButton'}`}
             >
            {isAccess ? 'Granted' : 'Revoked'}
          </button>
        </div>
      );
    },
  },
  {
    field: "passwordResetRequestDate",
    headerName: "Password Requested Date",
    width: 250,
    renderCell: (params) => {
      const isRequested = params.row.passwordResetRequestDate;
      const myDate = isRequested ? moment(isRequested).format("MMMM Do YYYY") : '-'
      return (
        <>
           <div className="cellAction">
            <p className="">{myDate}</p>
            {isRequested && (
              <button  className="successButton"
              title="Click to approve reset request"
              onClick={() => {
                if(window.confirm(`Are you sure, you want to approve the reset request?`)){
                  console.log('approve ko API');
                  actionReset(params.row._id)
                }
              }}
              >
                Approve
                </button>
            )}
           </div>
        </>
      );
    },
  },
];

export const eventColumn = [
  {
    field: "eventType",
    headerName: "Event",
    width: 250,
  },
  {
    field: "UserId",
    headerName: "Requested by",
    width: 230,
    renderCell: (params) => {
      // const { data, loading, error } = useFetch(`http://localhost:8000/api/user`);
      const userId = params.row.userId;
      return (
        <>
          {userId}
        </>
      );
    },
  },
  {
    field: "assignedStaff",
    headerName: "Status",
    width: 115,
    renderCell: (params) => {
      const isAssigned = params.row.assignedStaff;
      return (
        <>
          {(() => {
            if (isAssigned != null) {
              return (
                <p className="text-green-600">
                  Assigned
                </p>
              )
            } else {
              return (
                <div className="text-rose-600">
                  Unassigned
                </div>
              )
            }
          })()}
        </>
      );
    },
  },
];

export const customerColumns = [
  {
    width: 60,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image?.url || "https://www.pngfind.com/pngs/m/80-804674_png-file-male-user-vector-transparent-png.png"} alt="avatar" />
        </div>
      );
    },
  },
  {
    field: "profile",
    headerName: "Name",
    width: 250,
    renderCell: (params) => {
      return (
        <div>
          {params.row.profile.fullName}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email address",
    width: 270,
  },
  {
    field: "access",
    headerName: "Access status",
    width: 150,
    renderCell: (params) => {
      const isAccess = params.row.access;
      return (
        <>
          {(() => {
            if (isAccess == true) {
              return (
                <p className="text-green-600">
                  Granted
                </p>
              )
            } else {
              return (
                <div className="text-rose-600">
                  Revoked
                </div>
              )
            }
          })()}
        </>
      );
    },
  }
];

export const announcementColumn = [
  {
    field: "title",
    headerName: "Title",
    width: 250,
  },
  {
    field: "message",
    headerName: "Message",
    width: 450,
  },
  {
    field: "published",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      const isPublished = params.row.published;
      return (
        <p className={isPublished ? 'text-green-600' : 'text-rose-600'}>
                  {isPublished ? 'Published' : 'Not Published'}
                </p>
      );
    },
  }
];

export const myEventsColumns = [
  {
    field: "eventType",
    headerName: "Event Name",
    width: 250,
  },
  {
    field: "date",
    headerName: "Date",
    width: 210,
    renderCell: (params) => {
      const isRequested = params.row.date;
      const myDate = moment(isRequested).format("MMMM Do YYYY")
      return (
        <>
           <div className="cellAction">
              {myDate}
           </div>
        </>
      );
    },
  }
];