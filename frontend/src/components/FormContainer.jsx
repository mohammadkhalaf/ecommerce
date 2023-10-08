import {Container, Row, Col} from 'react-bootstrap'

const FormContainer = ({children}) => {
  return  <>
  <Container>
    <Row lg={12} m6={8} sm={12}>
        <Col xs={12} lg={8}>
            {children}
        </Col>
    </Row>
  </Container>
  </>
};

export default FormContainer;
