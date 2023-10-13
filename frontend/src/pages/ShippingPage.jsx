import { useState } from "react";
import {Form, Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch , useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../statemanagement/slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";



const ShippingPage = () => {
    const cart= useSelector((state)=>state.cart)
    const [address,setAddress]=useState(cart.shippingAddress?.address||'')
    const [city,setCity]=useState(cart.shippingAddress?.city||'')
    const [postalCode,setPostalCode]=useState(cart.shippingAddress?.postalCode||'')
    const dispatch= useDispatch()
    const navigate= useNavigate()
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postalCode}))
        navigate('/payment')
        
    }
  return  <>
  <FormContainer>
  <CheckoutSteps step1 step2/>
    <h1>Shipping</h1>
    <Form onSubmit={submitHandler} > 
     <Form.Group controlId="address" className="my-2">
        <Form.Label>Address:</Form.Label>
        <Form.Control type="text" placeholder="Enter address" value={address} onChange={(e)=>setAddress(e.target.value)}></Form.Control>
     </Form.Group>
      <Form.Group controlId="city" className="my-2">
        <Form.Label>City:</Form.Label>
        <Form.Control type="text" placeholder="Enter city" value={city} onChange={(e)=>setCity(e.target.value)}></Form.Control>
     </Form.Group>
      <Form.Group controlId="postalCode" className="my-2">
        <Form.Label>postal code:</Form.Label>
        <Form.Control type="text" placeholder="Enter postalCode" value={postalCode} onChange={(e)=>setPostalCode(e.target.value)}></Form.Control>
     </Form.Group>
    <Button type="submit" variant="primary">Continue</Button>

    </Form>
  </FormContainer>
  </>
};

export default ShippingPage;
