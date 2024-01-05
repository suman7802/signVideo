import axios from 'axios';
import PropTypes from 'prop-types';
import {createContext, useContext, useEffect, useRef, useState} from 'react';
import AllowedCourse from '../utils/AllowedCourse';
import {AuthContext} from './Auth.context';

const url = 'http://localhost:8000/api';
const FeaturedCoursesContext = createContext();

function FeaturedCoursesProvider({children}) {
  const context = useContext(AuthContext);
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const originalCourses = useRef([]);

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  const {courses} = context;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await axios.get(`${url}/course/getThumbnail`);
        originalCourses.current = data;
        setFeaturedCourses(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleFeaturedCourseClick = async (public_id) => {
    const ownedCourse = AllowedCourse(public_id, courses);

    if (!ownedCourse) {
      return console.error("you don't have access to this course");
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
    }
  };

  const search = (searchTerm) => {
    if (searchTerm) {
      const filteredCourses = originalCourses.current.filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFeaturedCourses(filteredCourses);
    } else {
      setFeaturedCourses(originalCourses.current);
    }
  };

  return (
    <FeaturedCoursesContext.Provider
      value={{featuredCourses, handleFeaturedCourseClick, search}}>
      {children}
    </FeaturedCoursesContext.Provider>
  );
}

FeaturedCoursesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {FeaturedCoursesProvider, FeaturedCoursesContext};
