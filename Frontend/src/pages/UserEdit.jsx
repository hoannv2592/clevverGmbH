import React, {useState, useEffect} from 'react'
import {Link, useParams} from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"
import userStatus from '../config/Constant';

function UserEdit() {
    const [id, setId] = useState(useParams().id)

    const [email, setEmail] = useState('');
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [status, setStatus] = useState('')
    const [selectedOption, setSelectedOption] = useState('')
    const [isSaving, setIsSaving] = useState(false)


    useEffect(() => {
        axios.get(`/api/users/${id}`)
            .then(function (response) {
                let user = response.data.user
                setEmail(user.email);
                setFirstName(user.first_name);
                setLastName(user.last_name);
                setLastName(user.last_name);
                setStatus(user.status);
                setSelectedOption(user.status)
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })

    }, [])

    /**
     * Event change status
     *
     * @param event
     */
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    }

    /**
     * handleSave
     */
    const handleSave = () => {
        setIsSaving(true);
        axios.post(`/api/users_update/${id}`, {
            email: email,
            first_name: first_name,
            last_name: last_name,
            status: status,
        })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Project updated successfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false)
            });
    }

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Edit User</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/">View All Projects
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="description" className="fw-bold">Firstname</label>
                                <input
                                    onChange={(event) => {
                                        setFirstName(event.target.value)
                                    }}
                                    value={first_name}
                                    type="text"
                                    className="form-control"
                                    id="first_name"
                                    name="first_name"
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="description" className="fw-bold">Lastname</label>
                                <input
                                    onChange={(event) => {
                                        setLastName(event.target.value)
                                    }}
                                    value={last_name}
                                    type="text"
                                    className="form-control"
                                    id="last_name"
                                    name="last_name"
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="name" className="fw-bold">Email</label>
                                <input
                                    onChange={(event) => {
                                        setEmail(event.target.value)
                                    }}
                                    value={email}
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"/>
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="description" className="fw-bold">Status</label>
                                <select
                                    id="status"
                                    name="status"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={selectedOption}
                                >
                                    {Object.entries(userStatus).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </div>

                            <button
                                disabled={isSaving}
                                onClick={handleSave}
                                type="button"
                                className="btn btn-outline-success mt-3">
                                Update User
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UserEdit;