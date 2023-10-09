import { useState , useEffect} from "react";
import { Form, Col, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../statemanagement/slices/cartSlice";




const PaymentPage = () => {
  const [paymentMethod,setPaymentMethod]=useState('paypal')
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const cart= useSelector((state)=>state.cart)
  const {shippingAddress}=cart
  useEffect(()=>{
    if(!shippingAddress){
      navigate('/shipping')
    }

  },[shippingAddress, navigate])
  const submitHandler=e=>{
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }
  return  <>
  <FormContainer>
    <CheckoutSteps step1 step2 step3/>
    <h1>Payment Method</h1>
    <Form onSubmit={submitHandler}>
      <Form.Group>
        <Form.Label >Select Method</Form.Label>
      <Col>
      <Form.Check type="radio" label='paypal' id="paypal" checked onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check>
      </Col>
      </Form.Group>
      <Button type="submit" variant="primary">Continue</Button>

    </Form>
  </FormContainer>
  </>
};

export default PaymentPage;
