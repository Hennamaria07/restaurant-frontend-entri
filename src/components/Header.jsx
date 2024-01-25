import React from 'react'
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userAuth } from '../redux/userAuthSlice';
import Cookies from 'js-cookie';

const Header = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(userAuth({
            user: null,
            token: null,
            isAuthenticated: false
          }));
          Cookies.remove("token");
          navigate("/login");
    }
    return (
        <div>
            <Navbar expand="lg" className="bg-warning">
                <Container fluid>
                    <Navbar.Brand as={Link} to= '/' >Resto World</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '80px' }}
                            navbarScroll
                        >
                            <Nav.Link as = {Link} to='/'>Home</Nav.Link>
                            <Nav.Link as = {Link} to='/about'>About</Nav.Link>
                            <Nav.Link as = {Link} to='/contact'>Contact</Nav.Link>
                            <Nav.Link as = {Link} to='/add'>Add</Nav.Link>
                            <Nav.Link as = {Link} to='/register'>Register</Nav.Link>
                            <Nav.Link as = {Link} to='/users'>Users</Nav.Link>
                        </Nav>
                        <Nav className='ms-auto'>
                        {isAuthenticated? <Button variant='outline-secondary' onClick={handleLogout}>
                        Logout</Button>: <Nav.Link as = {Link} to='/login'><Button variant='outline-secondary'>
                        Login</Button></Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;