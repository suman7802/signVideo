import axios from 'axios';
import PropTypes from 'prop-types';
import {createContext} from 'react';
import {useEffect, useReducer} from 'react';

const url = 'http://localhost:8000/api';

const initialState = {
  classCourses: [{}],
  category: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_CATEGORY':
      return {...state, category: action.payload};
    case 'SET_CLASS_COURSES':
      return {...state, classCourses: action.payload};
    default:
      return state;
  }
}

const ClassCoursesContext = createContext();

function ClassCoursesProvider({children}) {
  const [{classCourses, category}, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await axios.get(
          `${url}/course/getThumbnail/${category}`
        );
        dispatch({type: 'SET_CLASS_COURSES', payload: data});
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [category]);

  const setCategory = (category) => {
    dispatch({type: 'SET_CATEGORY', payload: category});
  };

  const handleClassCourseClick = async (public_id) => {
    try {
      const response = await axios.post(
        `${url}/stream`,
        {public_id},
        {withCredentials: true}
      );
      if (response.data && typeof response.data === 'string') {
        window.open(response.data, '_blank');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ClassCoursesContext.Provider
      value={{classCourses, handleClassCourseClick, setCategory}}>
      {children}
    </ClassCoursesContext.Provider>
  );
}

ClassCoursesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {ClassCoursesProvider, ClassCoursesContext};
