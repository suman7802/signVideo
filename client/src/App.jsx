import OTP from './pages/OTP';
import Shop from './pages/Shop';
import Login from './pages/Login';
import Class from './pages/Class';
import Cart from './pages/Cart';
import Library from './pages/Library';
import NavBar from './components/NavBar';
import UploadForm from './pages/Upload';
import {AuthProvider} from './contexts/Auth.context';
import FeaturedCourses from './pages/FeaturedCourses';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ClassCoursesProvider} from './contexts/ClassCourses.context';
import {FeaturedCoursesProvider} from './contexts/FeaturedCourses.context';
import {UploadProvider} from './contexts/Upload.context';
import {ShopContextProvider} from './contexts/Shop.context';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ShopContextProvider>
          <NavBar />
          <ClassCoursesProvider>
            <FeaturedCoursesProvider>
              <UploadProvider>
                <Routes>
                  <Route index element={<FeaturedCourses />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/otp" element={<OTP />} />
                  <Route path="/library" element={<Library />} />
                  <Route path="/class" element={<Class />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/upload" element={<UploadForm />} />
                </Routes>
              </UploadProvider>
            </FeaturedCoursesProvider>
          </ClassCoursesProvider>
        </ShopContextProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
