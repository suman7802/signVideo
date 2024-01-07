import axios from 'axios';
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';
import {AuthContext} from './Auth.context';
import {createContext, useState, useContext} from 'react';

const ShopContext = createContext();

function ShopContextProvider({children}) {
  const context = useContext(AuthContext);
  const [coursesToBuy, setCoursesToBuy] = useState([]);
  const [loading, setLoading] = useState(false);

  if (context === undefined) {
    throw new Error(
      'ShopContextProvider must be used within an AuthContextProvider'
    );
  }

  const {dispatch, saveToLocalStorage, url} = context;

  const checkout = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${url}/course/buy`,
        {courses: coursesToBuy},
        {withCredentials: true}
      );

      if (response.status === 200) {
        dispatch({
          type: 'UPDATE_COURSES',
          payload: response.data.courses,
        });
        saveToLocalStorage(true, response.data.role, response.data.courses);
        toast.success('Checkout successful');
      }
    } catch (error) {
      console.error('Checkout failed', error);
      toast.error('Checkout failed');
    } finally {
      setLoading(false);
      setCoursesToBuy([]);
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
    <ShopContext.Provider value={{coursesToBuy, loading, addToCart, checkout}}>
      {children}
    </ShopContext.Provider>
  );
}

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {ShopContextProvider, ShopContext};
