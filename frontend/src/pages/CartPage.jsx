import {Link, useNavigate} from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card , FormControl} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { useDispatch , useSelector} from 'react-redux';
import { addToCart,removeFromCart } from '../statemanagement/slices/cartSlice';

const CartPage = () => {
    const navigate= useNavigate()
    const dispatch=useDispatch()
    const {cartItems}= useSelector((state)=>state.cart)
    const addToCartHandler=(item, quantity)=>{
        dispatch(addToCart({...item, quantity}))
    }
    const removeFromCartHandler=(id)=>{
        dispatch(removeFromCart(id))
    }
    const checkOutHandler=()=>{
        navigate('/login')
    }
  return  <>
  <Row>
    <Col md={8}>
        <h1 style={{marginBottom:'20px'}}>Shopping cart</h1>
        {cartItems.length===0?(
            <Message>Your cart is empty <Link to='/'>Go back</Link> </Message>
        ):(
         <ListGroup variant='flush'> 
         {cartItems.map((item)=>{
            return<ListGroup.Item key={item._id}>
                <Row>
                    <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded/> 
                    </Col>
                    <Col md={3}>
                        <Link to={`/product/${item._id}`}> {item.name}</Link>
                    </Col>
                    <Col md={2}>
                        ${item.price}
                     </Col>
                     <Col md={2}>
                     <FormControl as='select' value={item.quantity} onChange={(e)=>addToCartHandler(item,Number(e.target.value))}>
                     {[...Array(item.countInStock).keys()].map((x)=>(
                    <option key={x+1} value={x+1}>{x+1}</option>
                    ))}
                    </FormControl>
                    </Col>
                    <Col md={2}>
                    <Button type='button' variant='light' onClick={()=>removeFromCartHandler(item._id)}>
                        <FaTrash/>
                    </Button>
                    </Col>
                   
                </Row>

            </ListGroup.Item>
         })}      

         </ListGroup>

        )}
    </Col>
     <Col md={4}>
      <Card>
        <ListGroup variant='flush'>
         <ListGroup.Item>
         <h2>Subtotal {cartItems.reduce((a, c)=>a+c.quantity,0)}</h2>
          ${cartItems.reduce((a,c)=>a+c.quantity*c.price,0).toFixed(2)}  
        </ListGroup.Item>
        <ListGroup.Item>                        
         <Button type='button' className='btn-block' disabled={cartItems.length===0} onClick={checkOutHandler}>Proceed to Checkout
         </Button>

        </ListGroup.Item>

        </ListGroup>
      </Card>
    </Col>
  </Row>
  
  
  
  </>
};

export default CartPage;
