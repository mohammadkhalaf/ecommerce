import { Card } from "react-bootstrap";

const Product = ({product}) => {
    console.log(product.image);
  return (
    <Card className="my-3 py-3 rounded  card">
       <a href={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top"/>
       </a>
       <Card.Body>
        <a href={`/product/${product._id}`}>
            <Card.Title as="div">
                <strong>{product.name}</strong>
            </Card.Title>
            <Card.Text as='h3'>
                ${product.price}
            </Card.Text>

        </a>
       </Card.Body>

    </Card>
  )
};

export default Product;
