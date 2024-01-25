// import axios from 'axios';
import React, { useState } from 'react'
import { Button, Container, Form, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantAddress, setRestaurantAddress] = useState('');
  const [restaurantNeighborhood, setRestaurantNeighborhood] = useState('');
  const [validated, setValidated] = useState(false);
  const [Photograph, setPhotograph] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if(form.checkValidity() === false) {
      e.stopPropagation();
    }
    //PASSING THE FORMDATA TO THE BACKEND
    //WE USE AXIOS FOR THAT
    //IT WILL RETURNS A PROMISE
    else {
      const formData = new FormData();
      formData.append('name', restaurantName);
      formData.append('address', restaurantAddress);
      formData.append('neighborhood', restaurantNeighborhood);
      formData.append('photograph', Photograph);
      // console.log(formData);
      try {
        const res = await instance.post('/api/v1/restaurant',formData, {withCredentials: true, headers: {
          // for sending attached files to backend
          'Content-type': 'multipart/form-data', 
        }});
        if (res.data.success) {
          toast.success(res.data.message);
          await new Promise((resolve) => setTimeout(resolve, 2000))
                       setTimeout(() => {
                         navigate('/');
                     }, 2000);
       }
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    setValidated(true);
  }
  const handleName = (e) => {
    e.preventDefault();
    setRestaurantName(e.target.value);
  }
  console.log(`Restaurant Name--------> ${restaurantName}`);
  const handleAddress = (e) => {
    e.preventDefault();
    setRestaurantAddress(e.target.value);
  }
  console.log(`Restaurant Address--------> ${restaurantAddress}`);
  const handleNeighborhood = (e) => {
    e.preventDefault();
    setRestaurantNeighborhood(e.target.value);
  }
  console.log(`Restaurant Neighborhood--------> ${restaurantNeighborhood}`);
  return (
    <Container>
      <Row>
      <ToastContainer theme="dark" position='top-center'/>
        <Form className='my-3' noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className='fs-5'>Restaurant Name</Form.Label>
            <Form.Control type="text" className='bg-secondary text-white' required size='lg' onChange={(e)=>handleName(e)} placeholder="Enter the restaurant name here" />
            <Form.Control.Feedback type="invalid">
              Please enter the restaurant name.
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid">
              looks good!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className='fs-5'>Restaurant Address</Form.Label>
            <Form.Control type="Address" className='bg-secondary text-white' required size='lg' onChange={(e)=>handleAddress(e)} placeholder="Enter the restaurant address here" />
            <Form.Control.Feedback type="invalid">
              Please enter the restaurant address.
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid">
              looks good!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className='fs-5'>Restaurant Neighborhood</Form.Label>
            <Form.Control type="Address" className='bg-secondary text-white' required size='lg' onChange={(e)=>handleNeighborhood(e)} placeholder="Enter the restaurant neighborhood here" />
            <Form.Control.Feedback type="invalid">
              Please enter the restaurant neighborhood.
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid">
              looks good!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="position-relative mb-3">
            <Form.Label className='fs-5'>Photograph</Form.Label>
            <Form.Control
              className='bg-secondary text-white' size='lg' 
              type="file"
              name="file"
              onChange={(e) => setPhotograph(e.target.files[0])}
            />
          </Form.Group>
          <Button variant="warning" className='text-dark' type="submit">
            Add Restaurant
          </Button>
        </Form>
      </Row>
    </Container>
  )
}

export default Add;