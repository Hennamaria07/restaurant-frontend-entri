import React, { useState } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userAuth } from '../redux/userAuthSlice';
import instance from '../axios';

const Login = () => {
    const [validated, setValidated] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
              
               try {
                // const res = { data: { success: true, message: 'Registration successful' } };
                const result = await instance.post('/api/v1/login', {
                    email: userEmail,
                    password: userPassword
                },{
                  withCredentials: true
                });
                if (result.data.success) {
                  if(result.data.isAuthenticated) {
                    dispatch(userAuth({
                      user: result.data.user,
                      token: result.data.token,
                      isAuthenticated: result.data.isAuthenticated
                    }))
                  }
                 toast.success(result.data.message);
                 await new Promise((resolve) => setTimeout(resolve, 1000));
                                navigate('/');
              } else {
                toast.error(result.data.message);
              }
                console.log(result.data);
               } catch (err) {
                toast.error(err.response.data.message);
                console.log(err.response.data.message);
               }
            }
            setValidated(true);
         }
  return (
   <>
   <Container>
    <Row>
        <Col className='mt-4 text-center'>
        <h1>Login</h1>
        </Col>
    </Row>
    <Row>
    <ToastContainer theme="dark" autoClose={1000} position='top-center'/>
   <Form className='my-3' noValidate validated={validated} onSubmit={handleSubmit}>
   <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className='fs-5'>Email :</Form.Label>
                <Form.Control type="email" className='bg-secondary text-white' required size='lg' onChange={(e)=>handleEmail(e)} placeholder="Enter your email here" />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className='fs-5'>Password</Form.Label>
                <Form.Control type="password" className='bg-secondary text-white' required size='lg' onChange={(e)=>handlePassword(e)} placeholder="Enter your password here" />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid password.
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="warning" className='text-dark' type="submit">
                login
              </Button>
   </Form>
    </Row>
   </Container>
   </>
  )
}

export default Login
