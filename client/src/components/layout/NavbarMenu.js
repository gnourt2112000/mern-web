import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import logo from '../../assets/logo.svg'
import logoutIcon from '../../assets/logout.svg'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'

const NavbarMenu = () => {
    const {authState: {user:{username}},logoutUser} = useContext(AuthContext)

    const logout = ()=>logoutUser()
    return (
        <Navbar expand='lg' bg='primary' variant='dark' className='shadow'>
            <Container>
                <Navbar.Brand className='fw-bolder text-white ms-0'>
                    <img src={logo} alt='Logo' width='32' height='32' className='me-2'></img>
                    Memo
                </Navbar.Brand>

                <Navbar.Toggle aria-controls='basic-navbar-nav'/>            
                
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        <Nav.Link className="fw-bolder text-white" to='/dashboard' as={Link}>
                            Dashboard
                        </Nav.Link>
                        <Nav.Link className="fw-bolder text-white" to='/about' as={Link}>
                            About
                        </Nav.Link>
                    </Nav>

                    <Nav>
                        <Nav.Link className="fw-bolder text-white" disabled>
                            Welcome {username}
                        </Nav.Link>
                        <Button variant='secondary' className="fw-bolder text-white" onClick={logout}>
                            <img src={logoutIcon} alt='logout icon' width='32' height='32' className='me-2'></img>
                            Logout
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarMenu
