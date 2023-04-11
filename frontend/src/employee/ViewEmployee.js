import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function ViewEmployee() {

    const [employee, setEmployee] = useState({
        name:"",
        address:"",
        nationality:"",
        nic:"",
        phone:"",
    })

    const {id} = useParams();

    useEffect(() => {
        loadEmployee()
    })

    const loadEmployee = async () => {
        const result = await axios.get(`http://localhost:9191/employee/${id}`)
        setEmployee(result.data)
    }

    return (
    <div className='container'>
    <div className='raw'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
            <h2 className='text-center m-4'>Employee Details</h2>

            <div className='card'>
                <div className='card-header'>
                    Details of user id : {employee.id}
                    <ul className='list-group list-group-flush'>
                        <li className='list-group-item'>
                            <b>Name : </b>
                            {employee.name}
                        </li>
                        <li className='list-group-item'>
                            <b>Address : </b>
                            {employee.address}
                        </li>
                        <li className='list-group-item'>
                            <b>Nationality : </b>
                            {employee.nationality}
                        </li>
                        <li className='list-group-item'>
                            <b>NIC : </b>
                            {employee.nic}
                        </li>
                        <li className='list-group-item'>
                            <b>Phone : </b>
                            {employee.phone}
                        </li>
                    </ul> 
                </div>
            </div>
            <Link className='btn btn-primary my-2' to={"/"}>Back to Home</Link>
            </div>
        </div>
    </div>
  )
}

export default ViewEmployee