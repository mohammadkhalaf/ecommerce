import {Navbar, Nav, Container, Badge}from 'react-bootstrap'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import {FaShoppingCart, FaUser} from 'react-icons/fa'
import {LinkContainer} from 'react-router-bootstrap'
import {useSelector} from 'react-redux'

const Header = () => {
  const {cartItems}= useSelector((state)=>state.cart)
  console.log(cartItems);

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
                     {cartItems.length>0 && (
                      <Badge pill bg='success' style={{marginLeft:'5px'}}>{
                        cartItems.reduce((a,c)=>{
                          a+=c.quantity
                          return a
                        },0)
                      }</Badge>
                     )                    
                     }
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
