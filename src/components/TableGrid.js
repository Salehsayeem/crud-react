import React, { useState, useEffect } from 'react'
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'react-bootstrap';
import FormPage from './Form';



const url = 'https://rest-api-without-db.herokuapp.com/users/';
const TableGrid = () => {
    const [users, setUsers] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [updateFlag, setUpdateFlag] = useState(false);
    const [selectedUser, setSelectedUser] = useState({
        username: '',
        email: ''
    });
    const [selectedUserId, setSelectedUserId] = useState("")
    const getAllUsers = () => {
        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    toast("Error Occured",
                        {
                            autoClose: 5000,
                            type: toast.TYPE.WARNING,
                            closeButton: true,
                            transition: Bounce,
                            position: toast.POSITION.BOTTOM_RIGHT
                        })
                }
                return res.json();
            })
            .then((data) => {
                setUsers(data.users)
            })
            .catch((e) => {
                setError(e.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }
    useEffect(() => {
        getAllUsers()
    }, [])
    const handleDelete = (id) => {
        fetch(url + `/${id}`, {
            method: 'DELETE'
        })
            .then((res) => {
                if (!res.ok) {
                    toast(res.message,
                        {
                            autoClose: 5000,
                            type: toast.TYPE.WARNING,
                            closeButton: true,
                            transition: Bounce,
                            position: toast.POSITION.BOTTOM_RIGHT
                        })
                }
                toast("Deleted SuccessFully",
                    {
                        autoClose: 5000,
                        type: toast.TYPE.SUCCESS,
                        closeButton: true,
                        transition: Bounce,
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                getAllUsers()
            })
            .catch((e) => {
                setError(e.message)
            })
    }

    const handleGetData = (id) => {
        setSelectedUserId(id)
        setUpdateFlag(true)
        const filteredData = users.filter((user) => user.id === id);
        setSelectedUser({
            username: filteredData[0].username,
            email: filteredData[0].email
        })
    }
    const handleUpdate = (user) => {
        fetch(url + `/${selectedUserId}`, {
            method: 'PUT',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user),
        })
            .then((res) => {
                if (!res.ok) {
                    toast("Error Occured",
                        {
                            autoClose: 5000,
                            type: toast.TYPE.WARNING,
                            closeButton: true,
                            transition: Bounce,
                            position: toast.POSITION.BOTTOM_RIGHT
                        })
                }
                toast("Updated Successfully",
                    {
                        autoClose: 5000,
                        type: toast.TYPE.SUCCESS,
                        closeButton: true,
                        transition: Bounce,
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                getAllUsers()
                setUpdateFlag(false)
            })
            .catch((e) => {
                setError(e.message);
            })
    }
    const addUser = (user) => {

        fetch(url, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user),
        })
            .then((res) => {
                if (res.status === 201) {
                    toast("Added SuccessFully",
                        {
                            autoClose: 5000,
                            type: toast.TYPE.SUCCESS,
                            closeButton: true,
                            transition: Bounce,
                            position: toast.POSITION.BOTTOM_RIGHT
                        })
                    getAllUsers()
                } else {
                    toast(res.message,
                    {
                        autoClose: 5000,
                        type: toast.TYPE.SUCCESS,
                        closeButton: true,
                        transition: Bounce,
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                }
            })
            .catch((e) => {
                setError(e.message);
            })
    }
    return (
        <>
            {updateFlag ?
                <FormPage btnText='Update User' selectedUser={selectedUser} handleSubmitData={handleUpdate} />
                :
                <FormPage btnText='Add New User' handleSubmitData={addUser} />
            }


            <div className='row'>
                {isLoading && <h2>Loading...</h2>}
                {error && <h2>{error}</h2>}

                {users &&
                    users.map((user) => {
                        const { id, username, email } = user;
                        return (

                            <div className='col-3 bg-info'>
                                <div className=' card shadow p-3 mb-5 bg-body rounded' >
                                    <div className=' card-body 
                                        text-center border border-primary'
                                        key={id}>
                                        <h2>{username}</h2>
                                        <p>{email}</p>
                                        <Button variant="warning" onClick={() => { handleGetData(id) }}>Update User</Button>{' '}
                                        <Button variant="danger" onClick={() => { handleDelete(id) }}>Remove User</Button>{' '}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </>
    )
}

export default TableGrid