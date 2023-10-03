import {Col, Row} from 'react-bootstrap';
import products from '../dummyproducts';
import Product from '../components/Product';

const HomePage = () => {
  return <>
  <h1>products</h1>
  {
    <Row>
       {products.map((product)=>{
            
          return  <Col sm={12} md={6} lg={4} xl={3}>
                  <Product product={product}  />           
                  </Col>
        })
    }

    </Row>
  }
  </>
};

export default HomePage;
