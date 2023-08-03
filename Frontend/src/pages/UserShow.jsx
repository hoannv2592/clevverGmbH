import React, {useState, useEffect} from 'react';
import axios from 'axios';
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout"
import userStatus from '../config/Constant';

function UserShow() {
    const [id, setId] = useState(useParams().id)
    const [user, setUser] = useState({name:'', description:''})

    useEffect(() => {
        axios.get(`/api/users/${id}`)
            .then(function (response) {
                setUser(response.data.user)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Show User</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/"> View All Users
                        </Link>
                    </div>
                    <div className="card-body">
                        <b className="text-muted">Email:</b>
                        <p>{user.email}</p>
                        <b className="text-muted">FirstName:</b>
                        <p>{user.first_name}</p>
                        <b className="text-muted">LastName:</b>
                        <p>{user.last_name}</p>
                        <b className="text-muted">CreateAt:</b>
                        <p>{moment(user.created_at).format("YYYY-MM-DD HH:mm:ss")}</p>
                        <b className="text-muted">Status:</b>
                        <p>{userStatus[user.status]}</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UserShow;