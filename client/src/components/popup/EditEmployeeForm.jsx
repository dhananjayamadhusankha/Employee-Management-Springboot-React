import React, { useState, useEffect } from "react";
import axios from "axios";

const EditEmployeeForm = ({ onHide, id }) => {
  const [name, setname] = useState("");
  const [address, setaddress] = useState("");
  const [nationality, setnationality] = useState("");
  const [nic, setnic] = useState("");
  const [phone, setphone] = useState("");
  const [error, setError] = useState("");
  const [clicked, setClicked] = useState(false);

  var nationalities = [
    {
      nationality : "Sinhala", 
      id : 1
    },
    {
      nationality : "Tamil", 
      id : 2
    },
    {
      nationality : "Muslim",
      id : 3
    },
  ];

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

  //Get specific employee
  const GetEmployee = async () => {
    await axios
      .get(`/employee/${id}`)
      .then((res) => {
          setname(res.data.name);
          setaddress(res.data.address);
          setnationality(res.data.nationality);
          setnic(res.data.nic);
          setphone(res.data.phone)
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    GetEmployee();
  }, []);

  const editAlbum = async (e) => {
    setClicked(true);
    e.preventDefault();
    if (validateFields() && clicked) {
      await axios
      .put(`/employee/${id}`, {
        name: name,
        address: address,
        nationality: nationality,
        nic: nic,
        phone: phone
      })
      .then((res) => {
        console.log(res.data);
          alert("Employee Updated!");
          window.location.href = "/employee";
      })
      .catch((err) => {
        console.log(err)
      });
    }else {
      alert("Already clicked..!");
    }
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
            value={name}
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
            value={address}
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
            <option selected>{nationality}</option>
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
            value={nic}
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
            value={phone}
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
          onClick={editAlbum}
        >
          Update Employee
        </button>
      </div>
      <div className="col"></div>
    </form>
  );
};

export default EditEmployeeForm;
