import { Spinner } from "react-bootstrap";

const Loader = () => {
  return  <>
  <Spinner animation="border" role="status"  style={{width:'100px', height:'100px',display:'block',  position:'absolute' ,top:'47.5%', left:'47.5%'}}/>
  </>
};

export default Loader;
