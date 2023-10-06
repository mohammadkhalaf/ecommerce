import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {Row, Col, Image, Card, Button, ListGroup, ListGroupItem} from 'react-bootstrap'
import Rating from "../components/Rating";
import  {useGetProductDetailsQuery} from '../statemanagement/slices/productSlice'
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductPage = () => {
    const {id}= useParams()
    const{data, error, isLoading}= useGetProductDetailsQuery(id)
  
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
                <ListGroupItem>

                 <Button className="btn-block" type="button" disabled={data.countInStock===0}>Add to Card</Button>
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
