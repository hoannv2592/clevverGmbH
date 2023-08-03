import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"
import moment from "moment";
import userStatus from '../config/Constant';

function UserList() {
    const [UserList, setUserList] = useState([])

    /**
     *
     */
    useEffect(() => {
        fetchUserList()
    }, [])

    /**
     * Get all users
     * Call API
     * 
     */
    const fetchUserList = () => {
        axios.get('/api/users')
            .then(function (response) {
                setUserList(response.data.users);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    /**
     * Delete user
     *
     * @param id
     */
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/users_delete/${id}`)
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'User deleted successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        fetchUserList()
                    })
                    .catch(function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'An Error Occured!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    });
            }
        })
    }

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Project User Manager</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-primary"
                            to="/create">Create New User
                        </Link>
                    </div>
                    <div className="card-body">

                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>Email</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Status</th>
                                <th>CreateAt</th>
                                <th width="240px">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {UserList.map((user, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{user.email}</td>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                        <td>{userStatus[user.status]}</td>
                                        <td>{moment(user.created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
                                        <td>
                                            <Link
                                                to={`/show/${user.id}`}
                                                className="btn btn-outline-info mx-1">
                                                Show
                                            </Link>
                                            <Link
                                                className="btn btn-outline-success mx-1"
                                                to={`/edit/${user.id}`}>
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="btn btn-outline-danger mx-1">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UserList;