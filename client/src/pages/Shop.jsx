import {useContext} from 'react';
import {AuthContext} from '../contexts/Auth.context';
import {ShopContext} from '../contexts/Shop.context';
import {Container, Row, Col, Button, Form} from 'react-bootstrap';
import {FeaturedCoursesContext} from '../contexts/FeaturedCourses.context';

export default function Shop() {
  const Auth = useContext(AuthContext);
  const Shop = useContext(ShopContext);
  const FeaturedCourses = useContext(FeaturedCoursesContext);

  if (Auth === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  if (Shop === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }

  if (FeaturedCourses === undefined) {
    throw new Error(
      'useFeaturedCourses must be used within a FeaturedCoursesProvider'
    );
  }

  const {courses} = Auth;
  const {featuredCourses} = FeaturedCourses;
  const {handleBuyCourseClick, selectedDays, setSelectedDays} = Shop;

  const enrolledCourses = courses.map((course) => course.course);

  const unsubscribedCourses = featuredCourses.filter(
    (course) => !enrolledCourses.includes(course.category)
  );

  return (
    <Container>
      <h2>Shop Course</h2>
      <Form>
        <Row>
          {unsubscribedCourses.map((course) => (
            <Col key={course._id} md={4} className="mb-3">
              <div className="card">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">{course.category}</h5>
                  <Form.Group controlId="formDays">
                    <Form.Control
                      as="select"
                      value={selectedDays}
                      onChange={(e) => setSelectedDays(e.target.value)}>
                      <option value={7}>7 days</option>
                      <option value={30}>30 days</option>
                    </Form.Control>
                  </Form.Group>
                  <Button
                    variant="primary"
                    onClick={() => handleBuyCourseClick(course.category)}>
                    Add to cart
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Form>
    </Container>
  );
}
