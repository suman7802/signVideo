import axios from 'axios';
import {useReducer, useContext} from 'react';
import {createContext} from 'react';
import PropTypes from 'prop-types';
import {AuthContext} from './Auth.context';

const url = 'http://localhost:8000/api';
const ShopContext = createContext();

const initialState = {};

function reducer(state, action) {
  switch (action.type) {
    case 'set':
      return {...state, [action.course]: action.quantity};
    default:
      return state;
  }
}

function ShopContextProvider({children}) {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const {dispatch, saveToLocalStorage} = context;
  const [state, dispatchDate] = useReducer(reducer, initialState);

  const handleBuyCourseClick = async (category) => {
    dispatchDate({
      type: 'set',
      course: category,
      quantity: state[category] || 0,
    });

    const courses = Object.entries(state).map(([course_name, quantity]) => ({
      course_name,
      quantity,
    }));

    try {
      const res = await axios.post(
        `${url}/course/buy`,
        {courses},
        {withCredentials: true}
      );

      if (res.status === 200) {
        dispatch({
          type: 'UPDATE_COURSES',
          payload: {
            courses: res.data?.courses,
          },
        });
        saveToLocalStorage(courses);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ShopContext.Provider
      value={{
        handleBuyCourseClick,
        selectedDays: state,
        setSelectedDays: dispatchDate,
      }}>
      {children}
    </ShopContext.Provider>
  );
}

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {ShopContextProvider, ShopContext};
