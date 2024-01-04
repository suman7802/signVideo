import {useContext} from 'react';
import {AuthContext} from '../contexts/Auth.context';
import {ShopContext} from '../contexts/Shop.context';
import {Container, Row, Form} from 'react-bootstrap';
import {FeaturedCoursesContext} from '../contexts/FeaturedCourses.context';
import ShopItem from '../components/ShopItem';

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
            <ShopItem key={course._id} course={course} />
          ))}
        </Row>
      </Form>
    </Container>
  );
}
