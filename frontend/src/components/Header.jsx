import {Navbar, Nav, Container}from 'react-bootstrap'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import {FaShoppingCart, FaUser} from 'react-icons/fa'
import {LinkContainer} from 'react-router-bootstrap'

const Header = () => {
  return <>
  <header>
    <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand >Brand</Navbar.Brand>
          </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <NavbarCollapse id='basic-navbar-nav'>
                <Nav className='ms-auto'>
                  <LinkContainer to='/cart'>
                     <Nav.Link><FaShoppingCart/> cart
                     </Nav.Link> 
                  </LinkContainer>
                  <LinkContainer to='/login'>
                   <Nav.Link ><FaUser/> Sign in</Nav.Link> 
                  </LinkContainer>
              
               
           
                </Nav>

            </NavbarCollapse>
        </Container>
    </Navbar>
  </header>
  </>
};

export default Header;
