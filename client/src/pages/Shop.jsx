import {useContext} from 'react';
import {AuthContext} from '../contexts/Auth.context';
import {Container, Row, Col, Button} from 'react-bootstrap';
import {FeaturedCoursesContext} from '../contexts/FeaturedCourses.context';

export default function Shop() {
  const {courses} = useContext(AuthContext);
  const {featuredCourses} = useContext(FeaturedCoursesContext);
  
  const enrolledCourses = courses.map((course) => course.course);

  const unsubscribedCourses = featuredCourses.filter(
    (course) => !enrolledCourses.includes(course.category)
  );

  const handleCourseClick = (category) => {
    console.log(category);
  };

  return (
    <Container>
      <h2>Shop Course</h2>
      <Row>
        {unsubscribedCourses.map((course) => (
          <Col key={course._id} md={4} className="mb-3">
            <div className="card">
              <div className="card-body d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">{course.category}</h5>
                <Button
                  variant="primary"
                  onClick={() => handleCourseClick(course.category)}>
                  Add to cart
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
