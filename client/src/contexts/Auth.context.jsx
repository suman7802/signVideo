import Axios from 'axios';
import {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import {useReducer, createContext} from 'react';

const AuthContext = createContext();
const url = 'http://localhost:8000/api';

const initialState = {
  otp: '',
  role: '',
  email: '',
  courses: [],
  admin: false,
  adminPassword: '',
  showPassword: false,
  isAuthenticated: false,
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
    console.log('logout');
    document.cookie =
      'signVideo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.clear();
    // navigate('/login');
  };

  const reqOtp = async (event) => {
    event.preventDefault();
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
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  const submitOtp = async (event) => {
    event.preventDefault();
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
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        otp,
        role,
        email,
        admin,
        courses,
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
