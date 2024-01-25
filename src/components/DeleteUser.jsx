import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../axios';

const DeleteUser = ({id}) => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const handleDelete = async (e) =>{
        try {
            const res = await instance.delete(`/api/v1/user/${id}`, {withCredentials:true});
            if(!res.data.success) {
              toast.error(res.data.message);
            }
            toast.success(res.data.message);
            setShow(false)
            await new Promise((resolve) => setTimeout(resolve, 2000));
            // Optional: You can navigate after a delay if needed
            setTimeout(() => {
              navigate('/users');
          }, 2000);
           } catch (error) {
            toast.error(error.message);
           }
    }
  return (
    <>
    <DeleteIcon onClick={handleShow} />
    <ToastContainer theme="dark" autoClose={2000} position='top-center'/>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>User Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure do you want to delete this user?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} >Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteUser
