import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../contexts/Auth.context';
import {Container, Row, Col, Button} from 'react-bootstrap';
import {ClassCoursesContext} from '../contexts/ClassCourses.context';
import {FeaturedCoursesContext} from '../contexts/FeaturedCourses.context';

export default function Library() {
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  const context = useContext(FeaturedCoursesContext);
  const classContext = useContext(ClassCoursesContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a CourseProvider');
  }
  if (authContext === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  if (classContext === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  const {courses} = authContext;
  const {featuredCourses, isLoading} = context;
  const {setCategory} = classContext;

  const uniqueFeaturedCourses = featuredCourses.reduce(
    (unique, featuredCourse) => {
      return unique.findIndex(
        (course) => course.category === featuredCourse.category
      ) < 0
        ? [...unique, featuredCourse]
        : unique;
    },
    []
  );

  const handleCourseClick = (category) => {
    navigate('/class');
    setCategory(category);
  };

  return (
    <Container>
      <h2>Subscribed subject list</h2>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <Row>
          {uniqueFeaturedCourses.filter((featuredCourse) =>
            courses.some((course) => course.course === featuredCourse.category)
          ).length > 0 ? (
            uniqueFeaturedCourses
              .filter((featuredCourse) =>
                courses.some(
                  (course) => course.course === featuredCourse.category
                )
              )
              .map((course) => (
                <Col key={course._id} md={4} className="mb-3">
                  <div className="card">
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <h5 className="card-title mb-0">{course.category}</h5>
                      <Button
                        variant="primary"
                        onClick={() => handleCourseClick(course.category)}>
                        Go to Course
                      </Button>
                    </div>
                  </div>
                </Col>
              ))
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
                fontSize: '1.5em',
                color: '#333',
              }}>
              You have no subscribed courses.
            </div>
          )}
        </Row>
      )}
    </Container>
  );
}
