import {Navbar, Nav, Container, Badge, NavDropdown}from 'react-bootstrap'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import {FaShoppingCart, FaUser} from 'react-icons/fa'
import {LinkContainer} from 'react-router-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import { useLogoutMutation } from '../statemanagement/slices/authApiSlice';
import {logout} from '../statemanagement/slices/authSlice'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const {cartItems}= useSelector((state)=>state.cart)
   const {userInfo}= useSelector((state)=>state.auth)
   const dispatch=useDispatch()
   const navigate=useNavigate()
   const [logoutApiCall]= useLogoutMutation()
const logoutHandler=async()=>{
try {
  await logoutApiCall().unwrap()
  dispatch(logout())
  navigate('/login')
  
} catch (error) {
  console.log(error);
}

}

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
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id='username'>
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>

                    </NavDropdown>

                  ):( 
                     <LinkContainer to='/login'>
                   <Nav.Link ><FaUser/> Sign in</Nav.Link> 
                  </LinkContainer>
                  )}
                  {userInfo && userInfo.isAdmin&& (
                    <NavDropdown title='Admin' id='adminmenu'>
                      <LinkContainer to='/admin/orderlist'>
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/productslist'>
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/userslist'>
                        <NavDropdown.Item>Users List</NavDropdown.Item>
                      </LinkContainer> 
                    </NavDropdown>
                  )}
               
               </Nav>

            </NavbarCollapse>
        </Container>
    </Navbar>
  </header>
  </>
};

export default Header;
