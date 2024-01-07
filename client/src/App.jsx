import OTP from './pages/OTP';
import Cart from './pages/Cart';
import Shop from './pages/Shop';
import Class from './pages/Class';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Library from './pages/Library';
import UploadForm from './pages/Upload';
import NavBar from './components/NavBar';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AuthProvider} from './contexts/Auth.context';
import FeaturedCourses from './pages/FeaturedCourses';
import {UploadProvider} from './contexts/Upload.context';
import {ShopContextProvider} from './contexts/Shop.context';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ClassCoursesProvider} from './contexts/ClassCourses.context';
import {FeaturedCoursesProvider} from './contexts/FeaturedCourses.context';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FeaturedCoursesProvider>
          <ShopContextProvider>
            <ClassCoursesProvider>
              <NavBar />
              <UploadProvider>
                <Routes>
                  <Route path="/otp" element={<OTP />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/class" element={<Class />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route index element={<FeaturedCourses />} />
                  <Route path="/library" element={<Library />} />
                  <Route path="/upload" element={<UploadForm />} />
                </Routes>
              </UploadProvider>
              <ToastContainer position="bottom-right" />
            </ClassCoursesProvider>
          </ShopContextProvider>
        </FeaturedCoursesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
