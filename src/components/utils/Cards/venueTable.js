import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";
import { TablePagination } from '@mui/material';
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function createData(_id, name, location, type, contact, capacity,price) {
  return {
    _id,
    name,
    location,
    type,
    contact,
    capacity,
    price,
    // price: [
    //   {
    //     from: 1,
    //     to: 1000,
    //     amount: 3000,
    //   },
    //   {
    //     from: "2020-01-02",
    //     to: "Anonymous",
    //     amount: 1,
    //   },
    // ],
  };
}

function createPrice(from, to, amount){
  return {
    from,
    to,
    amount,
  }
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const config = {
    headers : {
        Authorization : localStorage.getItem('token'),
    }
  }

  const handleDelete = async (id) => {
    // console.log(id)
    try {
      await axios.delete(`http://localhost:8000/admin/venue/${id}`, config)
      .then(()=>{
        window.location.reload();
      toast.success('Deleted successfully');
      })
      .catch(()=>{
        toast.error("Failed to delete")
      });
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="left">{row.location}</TableCell>
        <TableCell align="left">{row.type}</TableCell>
        <TableCell align="left">{row.contact}</TableCell>
        <TableCell align="left">{row.capacity}</TableCell>
        <TableCell align="left">
          <>
          <div className="cellAction">
            <Link style={{ textDecoration: "none" }} to={'/venue/update/'+row._id}>
              <div className="viewButton">Update</div>
            </Link>
              <div
                className="deleteButton"
                onClick={() => {
                    console.log(row._id)
                  if(window.confirm(`Are you sure you want to delete this venue?`)){
                    handleDelete(row._id)
                  }
                }}
              >
                Delete
              </div>
            </div>
            </>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Price
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>From (People)</TableCell>
                    <TableCell>To (People)</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.price.map((venue_price) => (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {venue_price.from}
                      </TableCell>
                      <TableCell>{venue_price.to}</TableCell>
                      <TableCell align="right">{venue_price.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
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
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.arrayOf(
      PropTypes.shape({
        from: PropTypes.number.isRequired,
        to: PropTypes.number.isRequired,
        amount: PropTypes.number.isRequired,
      })
    ).isRequired,
    contact: PropTypes.string.isRequired,
    capacity: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  // createData('Venue', "location", "type", "contact", "capacity"),
  // createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  // createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  // createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  // createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default function CollapsibleTable() {
  const [final_rows, setRows] = useState([]);
  const [name, setVenue] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [contact, setContact] = useState([]);
  const [capacity, setCapacity] = useState({});
  const [fromPeople, setFromPeople] = useState("");
  const [toPeople, setToPeople] = useState("");
  const [amount, setAmount] = useState("");

  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  var try_1 = 0;
  useEffect(() => {
    axios
      .get("http://localhost:8000/admin/venue/", config)
      .then((response) => {
        try_1 += 1;
        console.log("TRYING LOOP:" + try_1);
        // console.log(response);
        console.log(response.data.data);
        const details = response.data.data;
        console.log(details.length);
        if (final_rows.length <= response.data.data.length) {
          details.map((item) => {
            var price = [];
            // setRows([])
            var contact_1 = "";
            if (final_rows.length < response.data.data.length) {
              for (var i = 0; i < item.contact.length; i++) {
                if (i == 0) {
                  var contact_2 = item.contact[i];
                } else {
                  var contact_2 = ", " + item.contact[i];
                }
                contact_1 += contact_2;
              }
            }
            if (final_rows.length < response.data.data.length) {
              for (var i = 0; i < item.price.length; i++) {
                const init_price = createPrice(item.price[i].paxRange.from,item.price[i]
                  .paxRange.to, item.price[i].amount)
                  price.push(init_price);
              }
            }
            setVenue(item.name);
            console.log(name);
            setLocation(item.location);
            setType(item.venueType);
            setContact(item.contact);
            setCapacity(item.capacity);

            const init_rows = createData(
              item._id,
              item.name,
              item.location,
              item.venueType,
              contact_1,
              item.capacity.min + " - " + item.capacity.max,
              price,
            );

            // console.log(item.capacity.min);

            // setRows([createData(name,location,type,contact,capacity)])
            // setRows([init_rows].concat(final_rows))
            // setRows(final_rows=> final_rows.concat(init_rows));
            if (final_rows.length < response.data.data.length) {
              final_rows.push(init_rows);
            }
            // console.log(final_rows);
          });
        }

        setFromPeople(response.data.data.price);
        setToPeople(response.data.data.location);
        setAmount(response.data.data.location);

      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  var currentRows = final_rows.filter(function (r, ind) {
    return ind >= rowsPerPage * page && ind < rowsPerPage * (page + 1);
  });
  var handleChangePage = function (event, newPage) {
      setPage(newPage);
  };
  var handleChangeRowsPerPage = function (event) {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
  };
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell className="font-bold">Venue Name</TableCell>
            <TableCell className="font-bold" align="left">Location</TableCell>
            <TableCell className="font-bold" align="left">Venue Type</TableCell>
            <TableCell className="font-bold" align="left">Contact</TableCell>
            <TableCell className="font-bold" align="left">Capacity (Min - Max)</TableCell>
            <TableCell className="font-bold" align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentRows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={final_rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
