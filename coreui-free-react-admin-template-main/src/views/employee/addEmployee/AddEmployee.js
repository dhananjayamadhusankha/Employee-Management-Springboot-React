import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import { CButton } from "@coreui/react";

export default function AddEmployee() {
  const [user, SetUser] = useState({
    name: "",
    phone: "",
    nationality: "",
    address: "",
    nic: "",
  });

  const [error, setError] = useState({
    name: "",
    phone: "",
    nationality: "",
    address: "",
    nic: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const { name, phone, nationality, address, nic } = user;

  const onInputChange = (e) => {
    SetUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      try {
        await axios.post("/employee", user);
        setSuccessMessage("Employee added successfully!"); // Show success message
        setTimeout(() => {
          window.location.href = "/users/view"; // Navigate to user details page after 1 seconds
        }, 1000);
      } catch (error) {
        console.error("Error adding employee:", error);
      }
    }
  };

  // var nationalities = [
  //   {
  //     nationality: "Sinhala",
  //     id: 1,
  //   },
  //   {
  //     nationality: "Tamil",
  //     id: 2,
  //   },
  //   {
  //     nationality: "Muslim",
  //     id: 3,
  //   },
  // ];

  const validateFields = () => {
    let isValid = true;
    let nameError = "";
    let phoneError = "";
    let nationalityError = "";
    let addressError = "";
    let nicError = "";

    // phone number validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      isValid = false;
      phoneError = "Please Enter a Valid phone Number!";
    }

    // NIC validation
    if (
      nic.substring(2, 5) <= 366 ||
      (nic.substring(2, 5) >= 501 && nic.substring(2, 5) <= 866)
    ) {
      const nicRegex = /^([0-9]{9}[v|V]|[0-9]{12})$/;
      if (!nicRegex.test(nic)) {
        isValid = false;
        nicError = "Invalid NIC Number!";
      }
    } else {
      isValid = false;
      nicError = "Invalid NIC Number!";
    }

    // Name validation
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    if (!nameRegex.test(name)) {
      isValid = false;
      nameError = "Please Enter a Valid Name!";
    }

    //Nationality validation
    if (nationality.length === 0) {
      isValid = false;
      nationalityError = "Please Enter Nationality!";
    }

    //Address validation
    if (address.length === 0) {
      isValid = false;
      addressError = "Please Enter Address!";
    }

    setError({
      phone: phoneError,
      nic: nicError,
      name: nameError,
      nationality: nationalityError,
      address: addressError,
    });
    return isValid;
  };

  return (
    <div className="container">
      <div className="row">
        <div className=" col-md-6 offset-md-3 border rounded p-4 shadow">
          <h2 className="text-center m-4 fw-bold">Add User Details</h2>
          <form onSubmit={(e) => onSubmit(e)} method="post">
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}
            <div className="form-floating mb-3">
              <input
                id="floatingInput"
                name="name"
                type="text"
                className="form-control"
                placeholder="Employee Name"
                onChange={(e) => onInputChange(e)}
                required
              />
              <label htmlFor="floatingInput">Employee Name</label>
              {error.name && (
                <div className="text-danger fw-semibold ">{error.name}</div>
              )}
            </div>
            <div className="form-floating mb-3">
              <input
                id="floatingInput"
                name="address"
                type="text"
                className="form-control"
                placeholder="Address"
                onChange={(e) => onInputChange(e)}
                required
              />
              <label htmlFor="floatingInput">Address</label>
              {error.address && (
                <div className="text-danger fw-semibold ">{error.address}</div>
              )}
            </div>
            {/* <div className="form-outline mb-3">
              <label className="form-label" htmlFor="form8Example5">
                Nationality
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                id="size"
                name="size"
                onChange={(e) => onInputChange(e)}
              >
                <option selected>Select nationality</option>
                {nationalities.map((nationality) => (
                  <option value={nationality.nationality} key={nationality.id}>
                    {nationality.nationality}
                  </option>
                ))}
                {error.nationality && (
                  <div className="text-danger fw-semibold ">
                    {error.nationality}
                  </div>
                )}
              </select>
            </div> */}
            <div className="form-floating mb-3">
              <input
                id="floatingInput"
                name="nationality"
                type="text"
                className="form-control"
                placeholder="Address"
                onChange={(e) => onInputChange(e)}
                required
              />
              <label htmlFor="floatingInput">Nationality</label>
              {error.nationality && (
                <div className="text-danger fw-semibold ">
                  {error.nationality}
                </div>
              )}
            </div>
            <div className="form-floating mb-3">
              <input
                id="floatingInput"
                name="nic"
                type="text"
                className="form-control"
                placeholder="NIC"
                onChange={(e) => onInputChange(e)}
                required
              />
              <label htmlFor="floatingInput">NIC</label>
              {error.nic && (
                <div className="text-danger fw-semibold ">{error.nic}</div>
              )}
            </div>
            <div className="form-floating mb-5">
              <input
                id="floatingInput"
                name="phone"
                type="text"
                className="form-control"
                placeholder="Phone Number"
                onChange={(e) => onInputChange(e)}
                required
              />
              <label htmlFor="floatingInput">Phone Number</label>
              {error.phone && (
                <div className="text-danger fw-semibold ">{error.phone}</div>
              )}
            </div>
            <button type="submit" className="btn btn-dark mb-4">
              Add Employee
            </button>
            &nbsp;&nbsp;
            <Link to={"/"} className="btn btn-outline-dark mb-4 mr-4">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
