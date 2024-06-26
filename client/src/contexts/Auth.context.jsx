import Axios from 'axios';
import {useEffect} from 'react';
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import {useReducer, createContext} from 'react';

const AuthContext = createContext();
const url = '/api';
// const url = 'http://localhost:8000/api';

const initialState = {
  otp: '',
  role: '',
  email: '',
  courses: [],
  admin: false,
  adminPassword: '',
  showPassword: false,
  isAuthenticated: false,
  loading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_AUTHENTICATED':
      return {
        ...state,
        isAuthenticated: true,
        role: action.payload.role,
        courses: action.payload.courses,
      };
    case 'SET_ADMIN':
      return {...state, admin: !state.admin};
    case 'SET_LOADING':
      return {...state, loading: action.payload};
    case 'UPDATE_COURSES':
      return {...state, courses: action.payload};
    case 'SET_OTP':
      return {...state, otp: action.payload};
    case 'SET_EMAIL':
      return {...state, email: action.payload};
    case 'SET_ADMIN_PASSWORD':
      return {...state, adminPassword: action.payload};
    case 'SET_SHOW_PASSWORD':
      return {...state, showPassword: !state.showPassword};
    case 'RESET':
      return initialState;
    default:
      throw new Error();
  }
}

function AuthProvider({children}) {
  const navigate = useNavigate();
  const [
    {
      otp,
      role,
      email,
      admin,
      courses,
      loading,
      showPassword,
      adminPassword,
      isAuthenticated,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    const Role = localStorage.getItem('role');
    const Courses = localStorage.getItem('courses');
    const Authenticated = localStorage.getItem('isAuthenticated');

    if ((Role, Courses, Authenticated)) {
      const savedRole = Role ? JSON.parse(Role) : null;
      const savedIsAuthenticated = JSON.parse(Authenticated);
      const savedCourses = Courses ? JSON.parse(Courses) : null;

      if (savedIsAuthenticated) {
        dispatch({
          type: 'SET_AUTHENTICATED',
          payload: {
            role: savedRole,
            courses: savedCourses,
          },
        });
      }
    }
  }, []);

  const saveToLocalStorage = (Authenticated, Role, Courses) => {
    if (Role) {
      localStorage.setItem('role', JSON.stringify(Role));
    }
    if (Courses) {
      localStorage.setItem('courses', JSON.stringify(Courses));
    }
    if (Authenticated) {
      localStorage.setItem('isAuthenticated', JSON.stringify(Authenticated));
    }
  };

  const handleLogout = () => {
    document.cookie =
      'signVideo=; expires=Thu, 01 Jan 1970 00:00:01 UTC; path=/';
    localStorage.clear();
    navigate('/login');
    dispatch({type: 'RESET'});
    toast.success('Logout success');
  };

  const reqOtp = async (event) => {
    event.preventDefault();

    if (email) {
      dispatch({type: 'SET_LOADING', payload: true});
    } else {
      toast.error('Please enter your email');
    }

    try {
      const res = await Axios.post(
        `${url}/user/reqotp`,
        {
          email,
          adminPassword,
        },
        {headers: {'Content-Type': 'application/json'}, withCredentials: true}
      );
      if (res.status === 200) {
        navigate('/otp');
        toast.success('OTP sent to your Email Address');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      toast.error('Login failed');
    } finally {
      dispatch({type: 'SET_LOADING', payload: false});
    }
  };

  const submitOtp = async (event) => {
    event.preventDefault();

    if (otp && email) {
      dispatch({type: 'SET_LOADING', payload: true});
    } else {
      toast.error('Please enter your Email & OTP');
    }

    try {
      const res = await Axios.post(
        `${url}/user/auth`,
        {
          email,
          otp,
        },
        {headers: {'Content-Type': 'application/json'}, withCredentials: true}
      );

      if (res.status === 200) {
        const Authenticated = true;
        const Role = res.data.user.role;
        const Courses = res.data.user.courses;

        dispatch({
          type: 'SET_AUTHENTICATED',
          payload: {
            role: res.data.user.role,
            courses: res.data.user.courses,
          },
        });
        saveToLocalStorage(Authenticated, Role, Courses);
        navigate('/library');
        toast.success('Login success');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      toast.error('Login failed');
    } finally {
      dispatch({type: 'SET_LOADING', payload: false});
    }
  };

  return (
    <AuthContext.Provider
      value={{
        url,
        otp,
        role,
        email,
        admin,
        courses,
        loading,
        showPassword,
        adminPassword,
        isAuthenticated,
        reqOtp,
        dispatch,
        submitOtp,
        handleLogout,
        saveToLocalStorage,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {AuthProvider, AuthContext};
