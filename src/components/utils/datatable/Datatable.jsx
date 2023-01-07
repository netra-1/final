import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React  from 'react';

const Datatable = ({columns, apipath}) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState({});
  const { data, loading, error } = useFetch(`http://localhost:8000/admin/${apipath || path}/`);
  const [catIdForRoom, setCatIdForRoom] = useState('');
  const [isAccess, setIsAccess] = useState('');

  const config = {
    headers : {
        Authorization : localStorage.getItem('token'),
    }
  }
  useEffect(() => {
    setList(data);
    // console.log(data)
    data.map((user)=>{
      setIsAccess(user.access)
      console.log(isAccess)
    })
  }, [data]);


  const handleDelete = async (id) => {
    // console.log(id)
    try {
      if(path == 'abc'){

      await axios.delete(`http://localhost:8000/admin/${path}/${id}/${catIdForRoom}`, config)
      .then(()=>{
        toast.success('Deleted successfully');
      })
      .catch(()=>{
        toast.error("Failed to delete")
      });
      setList(list.filter((item) => item._id !== id));

      }else{
        await axios.delete(`http://localhost:8000/admin/${path}/${id}`, config)
        .then(()=>{
        toast.success('Deleted successfully');
        })
        .catch(()=>{
          toast.error("Failed to delete")
        });
        setList(list.filter((item) => item._id !== id));
      }
    } catch (err) {}
  };

  const handlePublish = (id) => {
    axios.put(`http://localhost:8000/admin/announcement/${id}`, {published : true}, config)
      .then(()=>{
        window.location.reload();
        toast.success('Announcement published');
      })
      .catch(()=>{
        toast.error("Failed to published")
      });
  };

  const assignEvent = async (id) => {
    // console.log(id)
    const data = {}
    try {
        await axios.put(`http://localhost:8000/admin/event/${id}/assign`,data, config)
        .then(()=>{
        window.location.reload();
        toast.success('Event assigned successfully');
        })
        .catch(()=>{
          toast.error("Failed to assign an event")
        });
      }
      catch (err) {}
  };

  const accessAccount = async (id) => {
    // console.log(id)
    const data = {}
    console.log(id)
    try {
        await axios.put(`http://localhost:8000/admin/user/access/${id}`, data, config)
        .then(()=>{
        window.location.reload();
        toast.success('Access Given');
        })
        .catch(()=>{
          toast.error("Unable to give access")
        });
      }
      catch (err) {}
  };

  // const actionReset = async (id) => {
  //   // console.log(id)
  //   const data = {}
  //   console.log(id)
  //   try {
  //       await axios.put(`http://localhost:8000/admin/user/set-default-password/${id}`, data, config)
  //       .then(()=>{
  //       window.location.reload();
  //       toast.success('Password Reset to Default');
  //       })
  //       .catch(()=>{
  //         toast.error("No request for reset password")
  //       });
  //     }
  //     catch (err) {}
  // };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 220,
      renderCell: (params) => {
        return (
          <>
          {(() => {
            if (path == "event") {
              return (
                <>
                  <div className="cellAction">
                  <Link style={{ textDecoration: "none" }} to={'/staff/single_event/' + params.row._id}>
                    <div className="viewButton">View</div>
                  </Link>
                  
                  {
                    params.row.assignedStaff ?
                    <div></div>
                    : <div
                        className="successButton"
                        onClick={() => assignEvent(params.row._id)}
                      >
                        Assign
                      </div>
                  }
                </div>
                </>
              )
            } else if (path == "my_events") {
              return (
                <>
                  <div className="cellAction">
                  <Link style={{ textDecoration: "none" }} to={'/staff/single_event/' + params.row._id}>
                    <div className="viewButton">View</div>
                  </Link>
                  
                  {
                    params.row.assignedStaff ?
                    <div></div>
                    : <div
                        className="successButton"
                        onClick={() => assignEvent(params.row._id)}
                      >
                        Assign
                      </div>
                  }
                </div>
                </>
              )
            }
            else if (path =="customer") {
              return (
                <>
                  {(() => {
                    if (params.row.access == true) {
                      return (
                        <>
                          <div className="cellAction">
                            <div
                              className="cellAction deleteButton"
                              onClick={() => {
                                if(window.confirm(`Are you sure you want to revoke this user's access?`)){
                                  accessAccount(params.row._id)
                                }
                              }}
                            >
                              Revoke Access
                            </div>
                          </div>
                        </>
                      )
                    } else {
                      return(
                        <div className="cellAction">
                        <div
                          className="cellAction viewButton px-4"
                          onClick={() => {
                            if(window.confirm(`Are you sure you want to grant this user's access?`)){
                              accessAccount(params.row._id)
                            }
                          }}
                        >
                          Grant Access
                        </div>
                      </div>
                      )
                    }
                  })()}
                </>
              )
            }
            else if(path == "announcement") {
              return (
                <div className="cellAction">
                  <div
                    className="deleteButton"
                    onClick={() => {
                      if(window.confirm('Are you sure you want to delete this announcement?')){
                        handleDelete(params.row._id)
                      }
                    }}
                  >
                    Delete
                  </div>
                  {!params.row.published && (
                    <>
                  <Link style={{ textDecoration: "none" }} to={'/'+path+'/update/'+params.row._id}>
                    <div className="viewButton">Update</div>
                  </Link>
                  <div
                    className="successButton"
                    onClick={() => {
                      if(window.confirm('Are you sure you want to publish this announcement?')){
                        handlePublish(params.row._id)}
                      }
                    }
                  >
                    Publish
                  </div>
                  </>
                  )}
                  
                </div>
              )
            }
             else {
              return (
                <div className="cellAction">
                  <Link style={{ textDecoration: "none" }} to={'/'+path+'/update/'+params.row._id}>
                    <div className="viewButton">Update</div>
                  </Link>
                  <div
                    className="deleteButton"
                    onClick={() => {
                      if(window.confirm(`Are you sure you want to delete this ${path}?`)){
                        handleDelete(params.row._id)
                      }
                    }}
                  >
                    Delete
                  </div>
                </div>
              )
            }
          })()}
          </>
        );
      },
    },
  ];
  return (
    <>
    <div className="datatable">
      {(() => {
            if (localStorage.getItem('category')=="STAFF" &&  path == "customer") {
              return (
                <>
                  <div className="datatableTitle">
                    <h3 className="datatable_h2">{path}</h3>
                  </div>
                  <DataGrid
                      className="datagrid"
                      rows={list}
                      columns={columns}
                      pageSize={9}
                      rowsPerPageOptions={[9]}
                      getRowId={(row) => row._id}
                    />
                </>
              )
            } else if (localStorage.getItem('category')=="MANAGER" && path == "staff") {
              return (
                <>
                  <div className="datatableTitle">
                    <h3 className="datatable_h2">{path}</h3>
                    <Link to={`/${path}/new`} className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 my-2 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                    Add Staff
                  </Link>
                  </div>

                  <DataGrid
                      className="datagrid"
                      rows={list}
                      columns={columns}
                      pageSize={9}
                      rowsPerPageOptions={[9]}
                      getRowId={(row) => row._id}
                    />
                </>
              )
            } else if (localStorage.getItem('category')=="STAFF" && path == "event" ) {
              return (
                <>
                  <div className="datatableTitle">
                    <h3 className="datatable_h2">All events</h3>
                    <Link to={'/my_events'} className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 my-2 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                    View my assigned events
                  </Link>
                  </div>
                  <DataGrid
                  className="datagrid"
                  rows={list}
                  columns={columns.concat(actionColumn)}
                  pageSize={9}
                  rowsPerPageOptions={[9]}
                  getRowId={(row) => row._id}
                />
                </>
              )
            } else if (localStorage.getItem('category')=="STAFF" && path == "my_events" ) {
              return (
                <>
                  <div className="datatableTitle">
                    <h3 className="datatable_h2">Assigned Events</h3>
                  </div>
                  <DataGrid
                  className="datagrid"
                  rows={list}
                  columns={columns.concat(actionColumn)}
                  pageSize={9}
                  rowsPerPageOptions={[9]}
                  getRowId={(row) => row._id}
                />
                </>
              )
            } else if (localStorage.getItem('category')=="MANAGER" && path == "customer" ) {
              return (
                <>
                  <div className="datatableTitle">
                    <h3 className="datatable_h2 my-2">Customer</h3>
                  </div>
                  <DataGrid
                  className="datagrid"
                  rows={list}
                  columns={columns.concat(actionColumn)}
                  pageSize={9}
                  rowsPerPageOptions={[9]}
                  getRowId={(row) => row._id}
                />
                </>
              )
            }
             else {
              return (
                <>
                <div className="datatableTitle">
                  <h3 className="datatable_h2">{path}</h3>
                  <Link to={`/${path}/new`} className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 my-2 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                    Add New
                  </Link>
                </div>

                <DataGrid
                  className="datagrid"
                  rows={list}
                  columns={columns.concat(actionColumn)}
                  pageSize={9}
                  rowsPerPageOptions={[9]}
                  getRowId={(row) => row._id}
                />
                </>
                
              )
            }
          })()}
      
    </div>
    <ToastContainer
          position="top-center"
          autoClose={1000}
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

export default Datatable;
