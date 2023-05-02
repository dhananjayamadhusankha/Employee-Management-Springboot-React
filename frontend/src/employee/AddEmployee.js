import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AddEmployee() {

    let navigate = useNavigate();

    const [employee, setEmployee] = useState({
        name:"",
        address:"",
        nationality:"",
        nic:"",
        phone:"",
    })

    const [error, setError] = useState({
        name:"",
        address:"",
        nationality:"",
        nic:"",
        phone:"",
    });

    const { name, address, nationality, nic, phone } = employee

    const onInputChange = (e) => {
        setEmployee({...employee, [e.target.name]:e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (validateFields()) {
            await axios.post("http://localhost:9191/employee", employee);
            navigate("/")
        }
    }

    const validateFields = () => {
        let isValid = true;
        let nameError = "";
        let mobileError = "";
        let nationalityError = "";
        let addressError= "";
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

        setError({ phone: mobileError, nic: nicError, name: nameError ,nationality:nationalityError,address:addressError});
        return isValid;
    };

  return (
   


    // <div className="container-xxl position-relative bg-white d-flex p-0">
	// 	{/* <!-- Spinner Start --> */}
	// 	<div id="spinner"
	// 		className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
	// 		<div className="spinner-border text-primary"
	// 			style={{width: '3rem', height: '3rem', role:"status"}}>
	// 			<span className="sr-only">Loading...</span>
	// 		</div>
	// 	</div>
	// 	{/* <!-- Spinner End --> */}


	// 	{/* <!-- Sign Up Start --> */}
	// 	<div className="container-fluid">
	// 		<div className="row h-100 align-items-center justify-content-center"
	// 			style={{minHeight: '100vh'}}>
	// 			<div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
	// 				<div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
	// 					<form onSubmit={(e) => onSubmit(e)}>
	// 						<div
	// 							className="d-flex align-items-center justify-content-between mb-3">
	// 							<a href="home.jsp" className="">
	// 								<h3 className="text-primary">
	// 									<i className="fa fa-hashtag me-2"></i>Atlas
	// 								</h3>
	// 							</a>
	// 							<h3>Sign Up</h3>
	// 						</div>
	// 						<div className="form-floating mb-3">
    //                         <label className='form-label' htmlFor='Name'>Name
    //                  </label>
    //                  <input className='form-control' type={'text'} placeholder='Enter your name' name='name' value={name} onChange={(e) => onInputChange(e)} />
    //                  {error.name && (
    //                              <div className="text-danger fw-semibold ">{error.name}</div>
    //                  )}
	// 						</div>
	// 						<div className="form-floating mb-3">
    //                         <label className='form-label' htmlFor='Address'>
    //                      Address
    //                  </label>
    //                  <input className='form-control' type={'text'} placeholder='Enter your address' name='address' value={address} onChange={(e) => onInputChange(e)} />
    //                  {error.address && (
    //                              <div className="text-danger fw-semibold ">{error.address}</div>
    //                  )}
	// 						</div>
	// 						<div className="form-floating mb-3">
    //                         <label className='form-label' htmlFor='Nationality'>
    //                      Nationality
    //                  </label>
    //                  <input className='form-control' type={'text'} placeholder='Enter your nationality' name='nationality' value={nationality} onChange={(e) => onInputChange(e)} />
    //                  {error.nationality && (
    //                              <div className="text-danger fw-semibold ">{error.nationality}</div>
    //                 )}
	// 						</div>
	// 						<div className="form-floating mb-3">
    //                         <label className='form-label' htmlFor='NIC'>
    //                      NIC
    //                  </label>
    //                  <input className='form-control' type={'text'} placeholder='Enter your nic' name='nic' value={nic} onChange={(e) => onInputChange(e)} />
    //                  {error.nic && (
    //                             <div className="text-danger fw-semibold ">{error.nic}</div>
    //                 )}
	// 						</div>
	// 						<div className="form-floating mb-3">
    //                         <label className='form-label' htmlFor='Phone'>
    //                      Phone
    //                  </label>
    //                  <input className='form-control' type={'text'} placeholder='Enter your phone' name='phone' value={phone} onChange={(e) => onInputChange(e)} />
    //                  {error.phone && (
    //                             <div className="text-danger fw-semibold ">{error.phone}</div>
    //                 )}
	// 						</div>
	// 						<br />

	// 						<button type="submit" className="btn btn-primary py-3 w-100 mb-4">Sign
	// 							Up</button>
    //                             {/* <Link to='/' type='submit' className="btn btn-primary py-3 w-100 mb-4 mx-2">Cancel</Link> */}
	// 						<p className="text-center mb-0">
	// 							Don't you necessary? <Link to='/' type='submit'>Dashboard</Link>
	// 						</p>
	// 					</form>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	</div>
	// 	{/* <!-- Sign Up End --> */}
	// </div>



    <div className='container'>
        <div className='raw'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Register Employee</h2>

                <form onSubmit={(e) => onSubmit(e)}>
                <div className='mb-3'>
                    <label className='form-label' htmlFor='Name'>
                        Name
                    </label>
                    <input className='form-control' type={'text'} placeholder='Enter your name' name='name' value={name} onChange={(e) => onInputChange(e)} />
                    {error.name && (
                                <div className="text-danger fw-semibold ">{error.name}</div>
                    )}
                </div>

                <div className='mb-3'>
                    <label className='form-label' htmlFor='Address'>
                        Address
                    </label>
                    <input className='form-control' type={'text'} placeholder='Enter your address' name='address' value={address} onChange={(e) => onInputChange(e)} />
                    {error.address && (
                                <div className="text-danger fw-semibold ">{error.address}</div>
                    )}
                </div>

                <div className='mb-3'>
                    <label className='form-label' htmlFor='Nationality'>
                        Nationality
                    </label>
                    <input className='form-control' type={'text'} placeholder='Enter your nationality' name='nationality' value={nationality} onChange={(e) => onInputChange(e)} />
                    {error.nationality && (
                                <div className="text-danger fw-semibold ">{error.nationality}</div>
                    )}
                </div>

                <div className='mb-3'>
                    <label className='form-label' htmlFor='NIC'>
                        NIC
                    </label>
                    <input className='form-control' type={'text'} placeholder='Enter your nic' name='nic' value={nic} onChange={(e) => onInputChange(e)} />
                    {error.nic && (
                                <div className="text-danger fw-semibold ">{error.nic}</div>
                    )}
                </div>

                <div className='mb-3'>
                    <label className='form-label' htmlFor='Phone'>
                        Phone
                    </label>
                    <input className='form-control' type={'text'} placeholder='Enter your phone' name='phone' value={phone} onChange={(e) => onInputChange(e)} />
                    {error.phone && (
                                <div className="text-danger fw-semibold ">{error.phone}</div>
                    )}
                </div>
                
                <button type='submit' className='btn btn-outline-primary'>Submit</button>
                <Link to='/' type='submit' className='btn btn-outline-danger mx-2'>Cancel</Link>
                </form>
            </div>
        </div>
    </div>

  )
}

export default AddEmployee