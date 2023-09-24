import {Navbar, Nav, Container}from 'react-bootstrap'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import {FaShoppingCart, FaUser} from 'react-icons/fa'

const Header = () => {
  return <>
  <header>
    <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
            <Navbar.Brand href='/'>Brand</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <NavbarCollapse id='basic-navbar-nav'>
                <Nav className='ms-auto'>
                <Nav.Link href='/cart'><FaShoppingCart/> Cart</Nav.Link> 
                   <Nav.Link href='/login'><FaUser/> Sign in</Nav.Link> 
                </Nav>

            </NavbarCollapse>
        </Container>
    </Navbar>
  </header>
  </>
};

export default Header;
