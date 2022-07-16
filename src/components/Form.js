import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'react-toastify/dist/ReactToastify.css';

const FormPage = ({ btnText,selectedUser, handleSubmitData }) => {
    const [user, setUser] = useState({
        username: '',
        email: ''
    })
   useEffect(()=>{
    setUser({
        username: selectedUser.username,
        email: selectedUser.email
    })
   },[selectedUser])
    
    const handleChange = (e) => {
        const selectedField = e.target.name
        const selectedValue = e.target.value
        setUser((prevstate) => {
            return { ...prevstate, [selectedField]: selectedValue }
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        handleSubmitData(user)
        setUser({
            username: '',
            email: ''
        })
    }


    return (
        <div>
            <Card className="text-center">
                <Card.Header>CRUD Operation</Card.Header>
                <Card.Body>
                    <div className='container'>
                        <div className="row">
                            <div className="col">
                                <Form onSubmit={handleSubmit}>
                                    <InputGroup className="mb-6" >
                                        <InputGroup.Text >User Name</InputGroup.Text>
                                        <Form.Control type='text' id='username' name='username'
                                            value={user.username}
                                            onChange={handleChange}
                                            required></Form.Control>
                                    </InputGroup >

                                    <InputGroup className="mb-6" >
                                        <InputGroup.Text >Email</InputGroup.Text>
                                        <Form.Control type='email'
                                            id='email' name='email'
                                            value={user.email}
                                            onChange={handleChange}
                                            required
                                        ></Form.Control>
                                    </InputGroup >
                                    <br></br>
                                    <Button variant="primary"
                                        type='submit'
                                    >{btnText}</Button>{' '}
                                </Form>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}
FormPage.defaultProps={
    selectedUser:{
        username:'',
        email:''
    }
}
export default FormPage