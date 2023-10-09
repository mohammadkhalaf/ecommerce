import {Link, useParams} from 'react-router-dom'
import {Row, Col, ListGroup, Image, Button, Card, Form} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {PayPalButtons, usePayPalScriptReducer} from '@paypal/react-paypal-js'
import { useGetOrderDetailsQuery , usePayOrderMutation, useGetPayPalClintIdQuery} from '../statemanagement/slices/orderApiSlice'
import {toast} from 'react-toastify'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'


const OrderPage = () => {
    const{id}= useParams()
    const {data:order, isError, isLoading, refetch}=useGetOrderDetailsQuery(id)
    const [payOrder,{isLoading:lodingPay}]=usePayOrderMutation()
    const {data:paypal,loadingPaypal,errPaypal}=useGetPayPalClintIdQuery()
    const [{isPending}, paypalDispatch]=usePayPalScriptReducer()
    const {userInfo}=useSelector((state)=>state.auth)
    console.log(order);
    useEffect(()=>{
        if(!errPaypal &&!loadingPaypal &&paypal.clientId){
            const loadPaypalScript=async()=>{
                paypalDispatch({
                    type:'resetOptions',
                    value:{
                        "clientId":paypal.clientId,
                        currency:'USD'
                    }
                })
                paypalDispatch({type:'setLoadingStatus',value:'pending'})
            }
            if(order&&!order.isPaid){
                if(!window.paypal){
                    loadingPaypal()
                }
            }
        }

    },[order,paypal,loadingPaypal,errPaypal,paypalDispatch])
  return  <>
      {isLoading ?(<Loader/>):isError?<Message variant='danger'/>:(
        <>
        <h1>Order {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping </h2>
                        <p> <strong>Name: </strong>  {order.user.name}</p>
                        <p> <strong>Email: </strong> {order.user.email}</p>
                        <p> <strong>Address: </strong> {order.shippingAddress.address}, {order.shippingAddress.city}</p> 
                        {order.isDelivered? ( 
                            <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                        ):(
                            <Message variant='danger'>Not delivered</Message>
                        )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? (
                            <Message variant='success'>Paid on {order.paidAt}</Message>
                        ) : (
                            <Message variant='danger'>Not Paid</Message>
                        )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.cartItems.length === 0 ? (
                            <Message>Order is empty</Message>
                        ) : (
                            <ListGroup variant='flush'>
                            {order.cartItems.map((item, index) => (
                                <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}>
                            <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                            />
                            </Col>
                            <Col>
                            <Link to={`/product/${item.product}`}>
                                {item.name}
                            </Link>
                            </Col>
                            <Col md={4}>
                            {item.quantity} x ${item.price} = ${item.quantity * item.price}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
                    </ListGroup.Item>

                  
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>Order summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items </Col>
                                <Col>${order.itemsPrice} </Col>
                            </Row>
                            <Row>
                                <Col>Shipping </Col>
                                <Col>${order.shippingPrice} </Col>
                            </Row> 
                             <Row>
                                <Col>Tax </Col>
                                <Col>${order.taxPrice} </Col>
                            </Row>  
                             <Row>
                                <Col>Total </Col>
                                <Col>${order.totalPrice} </Col>
                            </Row>  
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>


        </Row>
        </>
        
      )}
  </>
};

export default OrderPage;
