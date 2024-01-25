import React, { useState } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../axios';
// FOR NAVIGATING ANOTHER ROUTER WE USE NAVIGATE HOOK
// useNavigate
const Register = () => {
    const [validated, setValidated] = useState(false);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const navigate = useNavigate();
 const handleName = (e) => {
    setUserName(e.target.value);
 }
 const handleEmail = (e) => {
    setUserEmail(e.target.value);
 }
 const handlePassword = (e) => {
    setUserPassword(e.target.value);
 }
 const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if(form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      
        // json format il anu data backend il pokunath and vice versa
       try {
        // const res = { data: { success: true, message: 'Registration successful' } };
        const result = await instance.post('/api/v1/register', {
            id: 1,
            fullname: userName,
            email: userEmail,
            password: userPassword
        })
        if (result.data.success) {
         toast.success(result.data.message);
          new Promise((resolve) => setTimeout(resolve, 2000))
                      // Optional: You can navigate after a delay if needed
                      setTimeout(() => {
                        navigate('/login');
                    }, 2000);
      } else {

        toast.error(result.data.message);
      }
        console.log(result.data);
       } catch (error) {
        toast.error(error.response.data.message);
       }
    }
    setValidated(true);
 }
    return (
        <Container>
            <Row>
                <Col>
                <h1>Register</h1>
                </Col>
            </Row>
          <Row>
          <ToastContainer theme="dark" autoClose={2000} position='top-center'/>
            <Form className='my-3' noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label className='fs-5'>Full Name :</Form.Label>
                <Form.Control type="text" className='bg-secondary text-white' required size='lg' onChange={(e)=>handleName(e)} placeholder="Enter the your name here" />
                <Form.Control.Feedback type="invalid">
                  Please enter your name.
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">
                  looks good!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className='fs-5'>Email :</Form.Label>
                <Form.Control type="email" className='bg-secondary text-white' required size='lg' onChange={(e)=>handleEmail(e)} placeholder="Enter your email here" />
                <Form.Control.Feedback type="invalid">
                  Please enter your email.
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">
                  looks good!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className='fs-5'>Password</Form.Label>
                <Form.Control type="password" className='bg-secondary text-white' required size='lg' onChange={(e)=>handlePassword(e)} placeholder="Enter your password here" />
                <Form.Control.Feedback type="invalid">
                  Please enter your password.
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">
                  looks good!
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="warning" className='text-dark' type="submit">
                Register
              </Button>
            </Form>
          </Row>
        </Container>
      )
};

export default Register;
