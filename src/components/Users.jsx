import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteUser from './DeleteUser';
import instance from '../axios';

export const Users = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const getAllUsers = async () => {
          try {
            const response = await instance.get('/api/v1/users', { withCredentials: true });
            setData(response.data.users);
          } catch (error) {
            toast.error(error.message)
          }
          
        }
        getAllUsers();
    }, [data])
  return (
    <>
    <Container>
        <Row>
            <Col>
                <h2 className='text-center py-5'>Users List</h2>
            </Col>
        </Row>
        <Row>
          <ToastContainer theme="dark" autoClose={2000} position='top-center'/>
            <Col>
            <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>FULL NAME</th>
          <th>EMAIL</th>
          <th>EDIT</th>
          <th>DELETE</th>
        </tr>
      </thead>
      <tbody>
        {data && data.map((user, index) => (
            <tr key={user._id}>
            <td className='py-3'>{index+1}</td>
            <td className='py-3'>{user.fullname}</td>
            <td className='py-3'>{user.email}</td>
            <td className='py-3'><Link to={`/users/${user._id}`} className='text-white'><EditIcon /></Link></td>
            <td className='py-3'><Link className='text-white'><DeleteUser id={user._id}/></Link></td>
          </tr>
        ))}
      </tbody>
    </Table>
            </Col>
        </Row>
    </Container>
    </>
  )
}
