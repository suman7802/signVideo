import PropTypes from 'prop-types';
import {useState, useContext} from 'react';
import {Col, Button, Form} from 'react-bootstrap';
import {ShopContext} from '../contexts/Shop.context';

export default function ShopItem({course}) {
  const [day, setDay] = useState(30);
  const shop = useContext(ShopContext);

  if (shop === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }

  const {addToCart} = shop;

  const data = {
    currency: 'usd',
    course_name: course.category,
    course_price: 0.1,
    quantity: day,
  };

  return (
    <Col md={4} className="mb-3">
      <div className="card">
        <div className="card-body d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">{course.category}</h5>
          <Form.Group controlId="formDays">
            <Form.Control
              as="select"
              value={day}
              onChange={(e) => setDay(e.target.value)}>
              <option value={7}>7 days</option>
              <option value={30}>30 days</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" onClick={() => addToCart(data)}>
            Add to cart
          </Button>
        </div>
      </div>
    </Col>
  );
}

ShopItem.propTypes = {
  course: PropTypes.object.isRequired,
};
