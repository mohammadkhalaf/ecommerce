import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch , useSelector} from "react-redux";
import {Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import {toast} from 'react-toastify'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {useCreateOrderMutation} from '../statemanagement/slices/orderApiSlice'
import { clearCartItems } from "../statemanagement/slices/cartSlice";

const PlaceOrder = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const cart=useSelector((state)=>state.cart)
  const [createOrder, {isLoading, isError}]=useCreateOrderMutation()
  useEffect(()=>{

    if(!cart.shippingAddress.address){
      navigate('/shipping')
    }else if(!cart.paymentMethod){
      navigate('/payment')
    }
  },[cart.paymentMethod,cart.shippingAddress,navigate])
  const placeOrderHandler=async()=>{
    try {
      const response= await  createOrder({cartItems:cart.cartItems,
      shippingAddress:cart.shippingAddress,
      paymentMethod:cart.paymentMethod,itemsPrice:cart.itemsPrice,
      shippingPrice:cart.shippingPrice,totalPrice:cart.totalPrice,taxPrice:cart.taxPrice
      }).unwrap()
       dispatch(clearCartItems())
       navigate(`/order/${response._id}`)       
    } catch (error) {
      toast.error(error)
    }
  }
  return  <>
  <CheckoutSteps step1 step2 step3 step4/>
  <Row>
    <Col md={8}>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h2>Shipping</h2>
          <p>
            <strong>Address:</strong>
            {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
          </p>
        </ListGroup.Item>
        <ListGroup.Item>
          <h2>Payment method</h2>
          <strong>Method: </strong>
          {cart.paymentMethod}
        </ListGroup.Item>
        <ListGroup.Item>
          <h2>Order items:</h2>
          {cart.cartItems.length===0 ?(
           <Message>You cart is empty</Message>
          ):(
            <ListGroup variant="flush">
              {cart.cartItems.map((i, index)=>{
                return <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={i.image} fluid rounded/>
                    </Col>
                    <Col>
                     <Link to={`/products/${i.product}`}>{i.name}</Link>
                    </Col>
                    <Col md={4}>
                      {i.quantity} x ${i.price} = ${i.quantity * i.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              })}

            </ListGroup>
          )}
        </ListGroup.Item>
      </ListGroup>
    </Col>
    <Col md={4}>
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>Order Summary</h2>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>
              <p>Items: </p>
              </Col>
              <Col>
                ${cart.itemsPrice}
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>
              <p>Shipping: </p>
              </Col>
              <Col>
                ${cart.shippingPrice}
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>
              <p>Tax: </p>
              </Col>
              <Col>
                ${cart.taxPrice}
              </Col>
            </Row>
          </ListGroup.Item>
           <ListGroup.Item>
            <Row>
              <Col>
              <p>Total: </p>
              </Col>
              <Col>
                ${cart.totalPrice}
              </Col>
            </Row>
          </ListGroup.Item>
  
          <ListGroup.Item>
            <Button type="button" disabled={cart.cartItems.length===0} onClick={placeOrderHandler}>Place order</Button>
            {isLoading && <Loader/>}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  </Row>
  </>
};

export default PlaceOrder;
