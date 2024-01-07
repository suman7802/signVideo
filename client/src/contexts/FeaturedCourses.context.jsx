import axios from 'axios';
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';
import {AuthContext} from './Auth.context';
import AllowedCourse from '../utils/AllowedCourse';
import {createContext, useContext, useEffect, useReducer, useRef} from 'react';

const url = 'http://localhost:8000/api';
const FeaturedCoursesContext = createContext();

const initialState = {
  featuredCourses: [],
  isLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return {...state, isLoading: true};
    case 'FETCH_SUCCESS':
      return {...state, featuredCourses: action.payload, isLoading: false};
    case 'SEARCH':
      return {...state, featuredCourses: action.payload};
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function FeaturedCoursesProvider({children}) {
  const context = useContext(AuthContext);
  const [{featuredCourses, isLoading}, dispatch] = useReducer(
    reducer,
    initialState
  );
  const originalCourses = useRef([]);

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  const {courses} = context;

  useEffect(() => {
    const fetchData = async () => {
      dispatch({type: 'FETCH_START'});
      try {
        const {data} = await axios.get(`${url}/course/getThumbnail`);
        originalCourses.current = data;
        dispatch({type: 'FETCH_SUCCESS', payload: data});
      } catch (error) {
        console.error(error);
        toast.error("Oops! Can't get the course Thumbnail right now.");
      }
    };
    fetchData();
  }, []);

  const handleFeaturedCourseClick = async (public_id) => {
    const ownedCourse = AllowedCourse(public_id, courses);

    if (!ownedCourse) {
      toast.error("Can't access this course.");
      return console.error("you don't have access of this course");
    }

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
      toast.error('Error Playing the video');
    }
  };

  const search = (searchTerm) => {
    if (searchTerm) {
      const filteredCourses = originalCourses.current.filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      dispatch({type: 'SEARCH', payload: filteredCourses});
    } else {
      dispatch({type: 'SEARCH', payload: originalCourses.current});
    }
  };

  return (
    <FeaturedCoursesContext.Provider
      value={{isLoading, featuredCourses, handleFeaturedCourseClick, search}}>
      {children}
    </FeaturedCoursesContext.Provider>
  );
}

FeaturedCoursesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {FeaturedCoursesProvider, FeaturedCoursesContext};
