import axios from 'axios';
import PropTypes from 'prop-types';
import {createContext, useState} from 'react';

const url = 'http://localhost:8000/api';
const ShopContext = createContext();

function ShopContextProvider({children}) {
  const [coursesToBuy, setCoursesToBuy] = useState([]);

  const checkout = async () => {
    try {
      const response = await axios.post(
        `${url}/course/buy`,
        {courses: coursesToBuy},
        {withCredentials: true}
      );

      console.log(response.data.courses);

      setCoursesToBuy([]);
    } catch (error) {
      console.error('Checkout failed', error);
    }
  };

  const addToCart = (course) => {
    setCoursesToBuy((prevCourses) => {
      const courseExists = prevCourses.some(
        (prevCourse) => prevCourse.course_name === course.course_name
      );

      if (courseExists) {
        return prevCourses;
      } else {
        return [...prevCourses, course];
      }
    });
  };

  return (
    <ShopContext.Provider value={{coursesToBuy, addToCart, checkout}}>
      {children}
    </ShopContext.Provider>
  );
}

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {ShopContextProvider, ShopContext};
