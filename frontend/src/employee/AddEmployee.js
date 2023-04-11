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

    const { name, address, nationality, nic, phone } = employee

    const onInputChange = (e) => {
        setEmployee({...employee, [e.target.name]:e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:9191/employee", employee);
        navigate("/")
    }

  return (
    <div className='container'>
        <div className='raw'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Edit Employee</h2>

                <form onSubmit={(e) => onSubmit(e)}>
                <div className='mb-3'>
                    <label className='form-label' htmlFor='Name'>
                        Name
                    </label>
                    <input className='form-control' type={'text'} placeholder='Enter your name' name='name' value={name} onChange={(e) => onInputChange(e)} />
                </div>

                <div className='mb-3'>
                    <label className='form-label' htmlFor='Address'>
                        Address
                    </label>
                    <input className='form-control' type={'text'} placeholder='Enter your address' name='address' value={address} onChange={(e) => onInputChange(e)} />
                </div>

                <div className='mb-3'>
                    <label className='form-label' htmlFor='Nationality'>
                        Nationality
                    </label>
                    <input className='form-control' type={'text'} placeholder='Enter your nationality' name='nationality' value={nationality} onChange={(e) => onInputChange(e)} />
                </div>

                <div className='mb-3'>
                    <label className='form-label' htmlFor='NIC'>
                        NIC
                    </label>
                    <input className='form-control' type={'text'} placeholder='Enter your nic' name='nic' value={nic} onChange={(e) => onInputChange(e)} />
                </div>

                <div className='mb-3'>
                    <label className='form-label' htmlFor='Phone'>
                        Phone
                    </label>
                    <input className='form-control' type={'text'} placeholder='Enter your phone' name='phone' value={phone} onChange={(e) => onInputChange(e)} />
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