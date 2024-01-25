import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../axios';
import { useNavigate, useParams } from 'react-router-dom';

export const User = () => {
        const [validated, setValidated] = useState(false);
        const [user, setUser] = useState({
          fullname: "",
          email:""
        })
        console.log(user);
        const {id} = useParams();
        const navigate = useNavigate();
        useEffect(() => {
          const getUserDetails = async() => {
           try {
            const res = await instance.get(`/api/v1/user/${id}`, {withCredentials:true});
            setUser({
              fullname: res.data.user.fullname,
              email: res.data.user.email
            });
            if(!res.data.user) {
              navigate('/users')
            }
           } catch (error) {
            navigate('/users')
           }
          }
          getUserDetails();
        }, [id, navigate])
        

     const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if(form.checkValidity() === false) {
          e.stopPropagation();
        } else {
          try {
            const res = await instance.put(`user/${id}`, {
                      fullname: user.fullname,
                      email: user.email
                  }, {
                    withCredentials:true
                  })
                  if(!res.data.success) {
                    toast.error(res.data.message);
                  }
                  toast.success(res.data.message);

                  await new Promise((resolve) => setTimeout(resolve, 2000))
                                     // Optional: You can navigate after a delay if needed
                                     setTimeout(() => {
                                       navigate('/users');
                                   }, 2000);
          } catch (error) {
            toast.error(error.message);
          }

        }
        setValidated(true);
     }
  return (
    <>
            <Container>
            <Row>
                <Col>
                <h1 className='text-center mt-2'>Edit User</h1>
                </Col>
            </Row>
          <Row>
          <ToastContainer theme="dark" autoClose={2000} position='top-center'/>
            <Form className='my-3' noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label className='fs-5'>Full Name :</Form.Label>
                <Form.Control type="text" defaultValue={user.fullname} className='bg-secondary text-white' required size='lg' onChange={(e)=>setUser({...user, fullname:e.target.value})} placeholder="Enter the your name here" />
                <Form.Control.Feedback type="invalid">
                  Please enter your name.
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">
                  looks good!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className='fs-5'>Email :</Form.Label>
                <Form.Control type="email" defaultValue={user.email} className='bg-secondary text-white' required size='lg' onChange={(e)=>setUser({...user, email:e.target.value})} placeholder="Enter your email here" />
                <Form.Control.Feedback type="invalid">
                  Please enter your email.
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">
                  looks good!
                </Form.Control.Feedback>
              </Form.Group>
              <div className='d-flex justify-content-center'>
              <Button variant="warning" className='text-dark' type="submit">
                Update
              </Button>
              </div>
            </Form>
          </Row>
        </Container>
    </>
  )
}
