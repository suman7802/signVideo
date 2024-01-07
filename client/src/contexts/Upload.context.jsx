import axios from 'axios';
import {useReducer} from 'react';
import PropTypes from 'prop-types';
import {createContext} from 'react';
import {toast} from 'react-toastify';

const url = `http://localhost:8000/api`;
const UploadContext = createContext();

const initialState = {
  title: '',
  category: '',
  course: null,
  thumbnail: null,
  uploading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'title':
      return {...state, title: action.payload};
    case 'category':
      return {...state, category: action.payload};
    case 'course':
      return {...state, course: action.payload};
    case 'thumbnail':
      return {...state, thumbnail: action.payload};
    case 'uploading':
      return {...state, uploading: action.payload};
    case 'reset':
      return initialState;
    default:
      throw new Error();
  }
}

function UploadProvider({children}) {
  const [{title, category, course, thumbnail, uploading}, dispatch] =
    useReducer(reducer, initialState);

  const handleTitleChange = (e) => {
    const titleWithoutSpaces = e.target.value.replace(/\s/g, '');
    dispatch({type: 'title', payload: titleWithoutSpaces});
  };

  const handleCategoryChange = (event) => {
    dispatch({type: 'category', payload: event.target.value});
  };

  const handleCourseChange = (e) => {
    dispatch({type: 'course', payload: e.target.files[0]});
  };

  const handleThumbnailChange = (e) => {
    dispatch({type: 'thumbnail', payload: e.target.files[0]});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      return toast.error('Please fill the Title');
    }

    if (!category) {
      return toast.error('Please fill the Subject');
    }

    if (!course) {
      return toast.error('Please upload a course video');
    } else if (!course.type.startsWith('video/')) {
      return toast.error('Course file must be a video');
    }

    if (!thumbnail) {
      return toast.error('Please upload a thumbnail image');
    } else if (!thumbnail.type.startsWith('image/')) {
      return toast.error('Thumbnail file must be an image');
    }

    dispatch({type: 'uploading', payload: true});

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

      if (res.status === 200) {
        toast.success('Upload success');
      }
    } catch (error) {
      console.error(error);
      toast.error('Upload failed');
    } finally {
      dispatch({type: 'reset'});
    }
  };

  return (
    <UploadContext.Provider
      value={{
        title,
        category,
        course,
        thumbnail,
        uploading,
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
