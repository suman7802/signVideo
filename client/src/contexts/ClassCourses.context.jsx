import axios from 'axios';
import PropTypes from 'prop-types';
import {createContext} from 'react';
import {toast} from 'react-toastify';
import {useEffect, useReducer} from 'react';

const toastId = 'serverError';
const url = 'http://localhost:8000/api';

const initialState = {
  classCourses: [{}],
  category: null,
  classCoursesLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_CATEGORY':
      return {...state, category: action.payload};
    case 'SET_CLASS_COURSES':
      return {...state, classCourses: action.payload};
    case 'SET_CLASS_COURSES_LOADING':
      return {...state, classCoursesLoading: action.payload};
    default:
      return state;
  }
}

const ClassCoursesContext = createContext();

function ClassCoursesProvider({children}) {
  const [{classCourses, category, classCoursesLoading}, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch({type: 'SET_CLASS_COURSES_LOADING', payload: true});
      try {
        const {data} = await axios.get(
          `${url}/course/getThumbnail/${category}`
        );
        dispatch({type: 'SET_CLASS_COURSES', payload: data});
      } catch (error) {
        console.error(error);
        if (!toast.isActive(toastId)) {
          toast.error("Oops! Can't get the course right now.", {
            toastId,
          });
        }
      } finally {
        dispatch({type: 'SET_CLASS_COURSES_LOADING', payload: false});
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
      toast.error('Error, Unable to open Course');
    }
  };

  return (
    <ClassCoursesContext.Provider
      value={{
        classCourses,
        classCoursesLoading,
        handleClassCourseClick,
        setCategory,
      }}>
      {children}
    </ClassCoursesContext.Provider>
  );
}

ClassCoursesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {ClassCoursesProvider, ClassCoursesContext};
