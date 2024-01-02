import axios from 'axios';
import {useReducer} from 'react';
import PropTypes from 'prop-types';
import {createContext} from 'react';

const url = `http://localhost:8000/api`;
const UploadContext = createContext();

const initialState = {
  title: '',
  category: '',
  course: null,
  thumbnail: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'title':
      return {...state, title: action.value};
    case 'category':
      return {...state, category: action.value};
    case 'course':
      return {...state, course: action.value};
    case 'thumbnail':
      return {...state, thumbnail: action.value};
    case 'reset':
      return initialState;
    default:
      throw new Error();
  }
}

function UploadProvider({children}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {title, category, course, thumbnail} = state;

  const handleTitleChange = (event) => {
    dispatch({type: 'title', value: event.target.value});
  };

  const handleCategoryChange = (event) => {
    dispatch({type: 'category', value: event.target.value});
  };

  const handleCourseChange = (e) => {
    dispatch({type: 'course', value: e.target.files[0]});
  };

  const handleThumbnailChange = (e) => {
    dispatch({type: 'thumbnail', value: e.target.files[0]});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('title', title);
    formData.append('category', category);
    if (course) {
      formData.append('course', course);
    }
    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }

    try {
      const res = await axios.post(`${url}/course/upload`, formData, {
        withCredentials: true,
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }

    dispatch({type: 'reset'});
  };

  return (
    <UploadContext.Provider
      value={{
        title,
        category,
        course,
        thumbnail,
        handleTitleChange,
        handleCategoryChange,
        handleCourseChange,
        handleThumbnailChange,
        handleSubmit,
      }}>
      {children}
    </UploadContext.Provider>
  );
}

UploadProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {UploadProvider, UploadContext};
