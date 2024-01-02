import OTP from './pages/OTP';
import Shop from './pages/Shop';
import Login from './pages/Login';
import Library from './pages/Library';
import Class from './pages/Class';
import NavBar from './components/NavBar';
import {AuthProvider} from './contexts/Auth.context';
import FeaturedCourses from './pages/FeaturedCourses';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {FeaturedCoursesProvider} from './contexts/FeaturedCourses.context';
import {ClassCoursesProvider} from './contexts/ClassCourses.context';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <ClassCoursesProvider>
          <FeaturedCoursesProvider>
            <Routes>
              <Route index element={<FeaturedCourses />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/login" element={<Login />} />
              <Route path="/otp" element={<OTP />} />
              <Route path="/library" element={<Library />} />
              <Route path="/class" element={<Class />} />
            </Routes>
          </FeaturedCoursesProvider>
        </ClassCoursesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
