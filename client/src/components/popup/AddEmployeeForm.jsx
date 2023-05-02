import React, { useState } from "react";
import axios from "axios";

const AddEmployeeForm = ({ onHide }) => {
  const [name, setname] = useState("");
  const [address, setaddress] = useState("");
  const [nationality, setnationality] = useState("");
  const [nic, setnic] = useState("");
  const [phone, setphone] = useState("");
  const [error, setError] = useState("");
  const [clicked, setClicked] = useState(false);

  var nationalities = [
    {
      nationality: "Sinhala",
      id: 1,
    },
    {
      nationality: "Tamil",
      id: 2,
    },
    {
      nationality: "Muslim",
      id: 3,
    },
  ];

  const addEmployee = async (e) => {
    setClicked(true);
    e.preventDefault();
    if (validateFields() && clicked) {
      await axios
        .post(`/employee`, {
          name: name,
          address: address,
          nic: nic,
          nationality: nationality,
          phone: phone,
        })
        .then((res) => {
          setClicked(false);
          console.log(res.data);
          // if (res.data.success) {
          //   alert(res.data.message);
          window.location.href = "/employee";
          // } else {
          //   alert(res.data.message);
          // }
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    } else {
      alert("Already clicked..!");
    }
  };

  const validateFields = () => {
    let isValid = true;
    let nameError = "";
    let mobileError = "";
    let nationalityError = "";
    let addressError = "";
    let nicError = "";

    // Mobile number validation
    const mobileRegex = /^(?:7|0|(?:\+94))[0-9]{9,10}$/;
    if (!mobileRegex.test(phone)) {
      isValid = false;
      mobileError = "Please Enter a Valid Mobile Number";
    }

    // NIC validation
    const nicRegex = /^([0-9]{9}[v|V]|[0-9]{12})$/;
    if (!nicRegex.test(nic)) {
      isValid = false;
      nicError = "Please Enter a Valid NIC Number";
    }

    // Name validation
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    if (!nameRegex.test(name)) {
      isValid = false;
      nameError = "Please Enter a Valid Name";
    }

    //Nationality validation
    if (nationality.length === 0) {
      isValid = false;
      nationalityError = "Please Enter Nationality";
    }

    //Address validation
    if (address.length === 0) {
      isValid = false;
      addressError = "Please Enter Address";
    }

    setError({
      phone: mobileError,
      nic: nicError,
      name: nameError,
      nationality: nationalityError,
      address: addressError,
    });
    return isValid;
  };

  return (
    <form name="form">
      <div style={{ padding: "30px 30px 20px" }}>
        <div className="form-floating mb-3">
          <input
            id="floatingInput"
            name="name"
            type="text"
            className="form-control"
            placeholder="Employee Name"
            onChange={(e) => setname(e.target.value)}
            required
          />
          <label for="floatingInput">Employee Name</label>
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
            onChange={(e) => setaddress(e.target.value)}
            required
          />
          <label for="floatingInput">Address</label>
          {error.address && (
            <div className="text-danger fw-semibold ">{error.address}</div>
          )}
        </div>

        <div className="form-outline mb-3">
          <label className="form-label" for="form8Example5">
            Nationality
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            id="size"
            name="size"
            onChange={(e) => setnationality(e.target.value)}
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
        </div>

        <div className="form-floating mb-3">
          <input
            id="floatingInput"
            name="nic"
            type="text"
            className="form-control"
            placeholder="NIC"
            onChange={(e) => setnic(e.target.value)}
            required
          />
          <label for="floatingInput">NIC</label>
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
            onChange={(e) => setphone(e.target.value)}
            required
          />
          <label for="floatingInput">Phone Number</label>
          {error.phone && (
            <div className="text-danger fw-semibold ">{error.phone}</div>
          )}
        </div>

        <hr />

        <button
          style={{ background: "#28282B" }}
          type="submit"
          className="btn btn-primary btn-block mb-4"
          onClick={addEmployee}
        >
          Add Employee
        </button>
      </div>
      <div className="col"></div>
    </form>
  );
};

export default AddEmployeeForm;
