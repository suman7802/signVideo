import {useContext} from 'react';
import ShopItem from '../components/ShopItem';
import {AuthContext} from '../contexts/Auth.context';
import {ShopContext} from '../contexts/Shop.context';
import {Container, Row, Form} from 'react-bootstrap';
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

  const {featuredCourses, isLoading} = FeaturedCourses;

  const unsubscribedCourses = featuredCourses.filter(
    (featuredCourse, index, self) =>
      !courses.some((course) => course.course === featuredCourse.category) &&
      index === self.findIndex((t) => t.category === featuredCourse.category)
  );

  return (
    <Container>
      <h2>Shop Course</h2>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <Form>
          <Row>
            {unsubscribedCourses.length > 0 ? (
              unsubscribedCourses.map((course) => (
                <ShopItem key={course._id} course={course} />
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
                You have all courses subscribed.
              </div>
            )}
          </Row>
        </Form>
      )}
    </Container>
  );
}
