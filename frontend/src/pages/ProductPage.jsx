import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {Row, Col, Image, Card, Button, ListGroup, ListGroupItem, FormControl} from 'react-bootstrap'
import Rating from "../components/Rating";
import  {useGetProductDetailsQuery} from '../statemanagement/slices/productSlice'
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../statemanagement/slices/cartSlice";
import { useDispatch } from "react-redux";


const ProductPage = () => {
    const [quantity, setQuantity]=useState(1)
    const {id}= useParams()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const{data, error, isLoading}= useGetProductDetailsQuery(id)
    const addToCartHandler=()=>{
    dispatch(addToCart({...data, quantity}))
    navigate('/cart')
  }
  
  return  <>
  {
    isLoading?( <Loader/>):error?(<Message variant='danger'> {error?.data?.message||error.error}</Message>

    ):(

        <>
           <Link className="btn btn-light my-3" to='/'>  Go back </Link>
  <Row>
    <Col md={5}>
        <Image src={data.image} alt={data.name} fluid/>

    </Col>
    <Col md={4}>
        <ListGroup>
            <ListGroupItem>
                <h3>{data.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
               <Rating value={data.rating} text={`${data.numReviews} reviews`}/>
            </ListGroupItem>
             <ListGroupItem>
              Description: ${data.description}
            </ListGroupItem>

        </ListGroup>
    </Col>
    <Col md={3}>
        <Card>
            <ListGroup variant="flush">
                <ListGroupItem>
                <Row>
                    <Col>Price:</Col>
                    <Col>${data.price}</Col>
                </Row>

                </ListGroupItem>
                <ListGroupItem>
                <Row>
                    <Col>status:</Col>
                    <Col>${data.countInStock>0?"In stock":"Out of stock"}</Col>
                </Row>
                </ListGroupItem>
                {
                    data.countInStock>0 &&(
                        <ListGroupItem>
                            <Row>
                                <Col>Quantity</Col>
                                <Col> <FormControl as='select' value={quantity} onChange={(e)=>setQuantity(Number (e.target.value))}>
                                    {[...Array(data.countInStock).keys()].map((x)=>(
                                        <option key={x+1} value={x+1}>{x+1}</option>
                                    ))}
                                </FormControl>
                                
                                </Col>
                            </Row>
                        </ListGroupItem>
                    )
                }
                <ListGroupItem>

                 <Button className="btn-block" type="button" disabled={data.countInStock===0} onClick={addToCartHandler}>Add to Card</Button>
                </ListGroupItem>

          

            </ListGroup>
        </Card>
    </Col>
  </Row>
        </>
    )
  }


   
         </>
};

export default ProductPage;
