import {useContext} from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import {FeaturedCoursesContext} from '../contexts/FeaturedCourses.context';
import {AuthContext} from '../contexts/Auth.context';
import {ClassCoursesContext} from '../contexts/ClassCourses.context';
import {useNavigate} from 'react-router-dom';

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
  const {featuredCourses} = context;
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
              height: '50vh', // This will center the text vertically. Adjust as needed.
              fontSize: '1.5em', // This will make the text larger. Adjust as needed.
              color: '#333', // This will make the text darker. Adjust as needed.
            }}>
            You have no subscribed courses.
          </div>
        )}
      </Row>
    </Container>
  );
}
