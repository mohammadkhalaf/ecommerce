import {Col, Row} from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery} from '../statemanagement/slices/productSlice.js';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { Link, useParams } from 'react-router-dom';


const HomePage = () => {
  const {pageNumber,keyword}= useParams()
const {data,error,isLoading}=useGetProductsQuery({keyword,pageNumber})

  return <>
  {keyword && <Link to='/' className='primary'>Go back</Link>}
  {
    isLoading?(<Loader/>):error?(<Message variant='danger'> {error?.data?.message||error.error}</Message>

    ):( 
    <>
            <h1>products</h1>
            <Row>
              {data.products.map((product)=>{            
                  return  <Col sm={12} md={6} lg={4} xl={3 } key={product._id}>
                          <Product product={product}   />           
                          </Col>
                })
            }
            </Row>    
            <Paginate pages={data.pages} page={data.page} keyword={keyword?keyword:''}/>    
      </>
      )
  }

  </>
};

export default HomePage;
