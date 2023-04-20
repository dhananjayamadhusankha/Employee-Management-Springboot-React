import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Home() {

    const [employees, setEmployees] = useState([]);

    // const {id} = useParams();

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        const result = await axios.get("http://localhost:9191/employees")
        setEmployees(result.data);
        // console.log(result.data);
    }

    const deleteEmployee = async (id) => {
        await axios.delete(`http://localhost:9191/employee/${id}`)
        loadEmployees()
    }

    return (
    <div className="container">
        <div className="py-4">
        <table className="table border shadow">
        {console.log("data")}

            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Nationality</th>
                    <th scope="col">NIC</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map((employee, index) => (
                        <tr>
                            <th scope="row" key={index}>{index + 1}</th>
                            <td>{employee.name}</td>
                            <td>{employee.address}</td>
                            <td>{employee.nationality}</td>
                            <td>{employee.nic}</td>
                            <td>{employee.phone}</td>
                            <td>
                                <Link className="btn btn-primary mx-2" to={`/viewEmployee/${employee.id}`}>View</Link>
                                <Link className="btn btn-outline-primary mx-2"
                                to={`/editEmployee/${employee.id}`}>
                                    Edit</Link>
                                <button className="btn btn-danger mx-2"
                                onClick={() => deleteEmployee(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
            </table>
        </div>
    </div>
  )
}

export default Home