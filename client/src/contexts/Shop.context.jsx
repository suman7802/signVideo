import {createContext, useState} from 'react';
import PropTypes from 'prop-types';

const ShopContext = createContext();

function ShopContextProvider({children}) {
  const [coursesToBuy, setCoursesToBuy] = useState([]);

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
    <ShopContext.Provider value={{coursesToBuy, addToCart}}>
      {children}
    </ShopContext.Provider>
  );
}

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {ShopContextProvider, ShopContext};
