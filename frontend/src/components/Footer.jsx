import {Container, Row, Col} from 'react-bootstrap'

const Footer = () => {
    const currentYear= new Date().getFullYear()
  return <>
  <footer style={{backgroundColor:'#212529', color:'white'}}>
    <Container>
        <Row>
            <Col className='text-center py-3'>
                <p>Brand &copy; {currentYear}</p>
            </Col>
        </Row>
    </Container>
  </footer>
  
        </>
};

export default Footer;
