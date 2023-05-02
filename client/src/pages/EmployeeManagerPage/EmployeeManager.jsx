import React, { useState, useEffect, useMemo } from "react";
import Table from "../../components/Table";
import axios from "axios";
import MyButton from "../../components/button/Button";
import { AiFillPlusCircle } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import Popupform from "../../components/popup/Popupform";
import PopupMenu from "../../components/PopupMenu";
import AddAlbumForm from "../../components/popup/AddEmployeeForm";
import "./EmployeeManager.css";
import EditEmployeeForm from "../../components/popup/EditEmployeeForm";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";

const EmployeeManager = () => {
  const [Employees, setEmployees] = useState([]);
  const [show, setShow] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [id, setId] = useState();
  const [type, setType] = useState();

  const open = Boolean(anchorEl);
  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setId(id);
  };
  const menuClose = () => {
    setAnchorEl(null);
  };

  const getRowId = useMemo(() => {
    return (params) => params.data.id;
  }, []);

  const handleClose = () => setShow(false);
  const handleShowAdd = () => {
    setShow(true);
    setType(0);
  };
  const handleShowEdit = () => {
    setShow(true);
    setType(1);
  };

  useEffect(() => {
    //Get All Employees
    const GetAllEmployees = async () => {
      await axios
        .get("/employees")
        .then((res) => {
          setEmployees(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    GetAllEmployees();
  }, []);

  //Delete Question
  const onDelete = async (id) => {
    console.log(id);
    if (window.confirm("Are you sure! You need to delete this employee?")) {
      await axios
        .delete(`/employee/${id}`)
        .then((res) => {
          alert("Employee Deleted Successfully");

          window.location.reload();
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  // const filterData = (Employees, searchKey) => {
  //   const result = Employees.filter(
  //     (Employees) =>
  //       Employees.title.toLowerCase().includes(searchKey) ||
  //       Employees.artist.toLowerCase().includes(searchKey) ||
  //       Employees.genre.toLowerCase().includes(searchKey)
  //   );
  //   setEmployees(result);
  // };

  // const handleSearchArea = (e) => {
  //   const searchKey = e.currentTarget.value.toLowerCase();
  //   axios.get("/album/").then((res) => {
  //     if (res.data.success) {
  //       filterData(res.data.Employees, searchKey);
  //     }
  //   });
  // };

  //table columns
  const columns = [
    {
      field: "#",
      headerName: "#",
      sortable: true,
      renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,
    },
    {
      field: "name",
      headerName: "Employee Name",
      width: 250,
    },
    {
      field: "address",
      headerName: "Address",
      width: 250,
    },
    {
      field: "nationality",
      headerName: "Nationality",
      width: 250,
    },
    {
      field: "nic",
      headerName: "NIC",
      width: 250,
    },
    {
      field: "birthday",
      headerName: "Bithday",
      width: 250,
    },
    {
      field: "id",
      headerName: "Action",
      width: 250,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div>
            <Stack direction="row" spacing={2}>
              <Button
                size="small"
                color="error"
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={() => {
                  onDelete(params.row.id);
                }}
              >
                Delete
              </Button>
              <Button
                size="small"
                variant="contained"
                endIcon={<EditIcon />}
                onClick={() => {
                  handleShowEdit();
                  setId(params.row.id);
                }}
              >
                Edit
              </Button>
            </Stack>
          </div>
        );
      },
    },
  ];
  return (
    <div className="setBody">
      <div className="faq">
        <span>Employee Management</span>
      </div>

      <div className="search-container">
        <div className="albums">
          <span>Employees </span>
        </div>
        <input
          type="search"
          className="search-input"
          placeholder="Search.."
          // onChange={handleSearchArea}
        />
        <MyButton
          text={"Add New Employee"}
          icon={<AiFillPlusCircle size={26} />}
          onClick={handleShowAdd}
        />
      </div>

      <div className="table-container">
        <Table
          columns={columns}
          rows={Employees}
          getRowId={getRowId}
          style={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: "20px",
            border: "none",
            outline: "none",
          }}
        />
      </div>

      <div className="footer-container">
        <span>copyright @EMC.All Rights Reserved</span>
        <span>@ Print Policy | Terms of Service | Help Center</span>
      </div>

      {type === 0 && (
        <Popupform
          show={show}
          onHide={handleClose}
          title={"ADD NEW EMPLOYEE"}
          body={<AddAlbumForm onHide={handleClose} />}
        />
      )}
      {type === 1 && (
        <Popupform
          show={show}
          onHide={handleClose}
          title={"Edit Employee"}
          body={<EditEmployeeForm id={id} />}
        />
      )}
      <br />
    </div>
  );
};

export default EmployeeManager;
