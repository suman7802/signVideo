import {useContext} from 'react';
import {ShopContext} from '../contexts/Shop.context';
import {Container, Row, Form} from 'react-bootstrap';
import {FeaturedCoursesContext} from '../contexts/FeaturedCourses.context';
import ShopItem from '../components/ShopItem';

export default function Shop() {
  const Shop = useContext(ShopContext);
  const FeaturedCourses = useContext(FeaturedCoursesContext);

  if (Shop === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }

  if (FeaturedCourses === undefined) {
    throw new Error(
      'useFeaturedCourses must be used within a FeaturedCoursesProvider'
    );
  }

  const {featuredCourses} = FeaturedCourses;

  const unsubscribedCourses = featuredCourses.filter(
    (course, index, self) =>
      index === self.findIndex((t) => t.category === course.category)
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
