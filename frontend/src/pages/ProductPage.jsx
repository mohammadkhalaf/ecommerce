import {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {Row, Col, Image, Card, Button, ListGroup, ListGroupItem} from 'react-bootstrap'
import Rating from "../components/Rating";
import axios from 'axios';



const ProductPage = () => {
    const [product,setProduct]=useState({})
    const {id:id}=useParams()

  useEffect(()=>{
    const getProduct=async()=>{
      const { data}=await axios.get((`/api/products/${id}`))
      setProduct(data)
    }
    getProduct()

  },[])
  return  <>

   <Link className="btn btn-light my-3" to='/'>  Go back </Link>
  <Row>
    <Col md={5}>
        <Image src={product.image} alt={product.name} fluid/>

    </Col>
    <Col md={4}>
        <ListGroup>
            <ListGroupItem>
                <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
               <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
            </ListGroupItem>
             <ListGroupItem>
              Description: ${product.description}
            </ListGroupItem>

        </ListGroup>
    </Col>
    <Col md={3}>
        <Card>
            <ListGroup variant="flush">
                <ListGroupItem>
                <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                </Row>

                </ListGroupItem>
                <ListGroupItem>
                <Row>
                    <Col>status:</Col>
                    <Col>${product.countInStock>0?"In stock":"Out of stock"}</Col>
                </Row>
                </ListGroupItem>
                <ListGroupItem>

                 <Button className="btn-block" type="button" disabled={product.countInStock===0}>Add to Card</Button>
                </ListGroupItem>

          

            </ListGroup>
        </Card>
    </Col>
  </Row>
   
         </>
};

export default ProductPage;
