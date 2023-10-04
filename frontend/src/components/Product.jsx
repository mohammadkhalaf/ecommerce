import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Product = ({product}) => {
    console.log(product.image);
  return (
    <Card className="my-3 py-3 rounded  card">
       <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top"/>
       </Link>
       <Card.Body>
        <Link href={`/product/${product._id}`}>
            <Card.Title as="div">
                <strong>{product.name}</strong>
            </Card.Title>
            <Card.Text as='h3'>
                ${product.price}
            </Card.Text>

        </Link>
       </Card.Body>

    </Card>
  )
};

export default Product;
