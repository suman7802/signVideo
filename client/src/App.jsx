import OTP from './pages/OTP';
import Shop from './pages/Shop';
import Login from './pages/Login';
import Class from './pages/Class';
import Cart from './pages/Cart';
import Library from './pages/Library';
import NavBar from './components/NavBar';
import UploadForm from './pages/Upload';
import Logout from './pages/Logout';
import {AuthProvider} from './contexts/Auth.context';
import FeaturedCourses from './pages/FeaturedCourses';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ClassCoursesProvider} from './contexts/ClassCourses.context';
import {FeaturedCoursesProvider} from './contexts/FeaturedCourses.context';
import {UploadProvider} from './contexts/Upload.context';
import {ShopContextProvider} from './contexts/Shop.context';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                  <Route index element={<FeaturedCourses />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/otp" element={<OTP />} />
                  <Route path="/library" element={<Library />} />
                  <Route path="/class" element={<Class />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/upload" element={<UploadForm />} />
                  <Route path="/logout" element={<Logout />} />
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
