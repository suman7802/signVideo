import {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import CartLogo from '../assets/cart.svg';
import {useLocation} from 'react-router-dom';
import {ShopContext} from '../contexts/Shop.context';
import {FeaturedCoursesContext} from '../contexts/FeaturedCourses.context';
import {AuthContext} from '../contexts/Auth.context';
import {Navbar, Nav, NavDropdown, Form, FormControl} from 'react-bootstrap';

export default function NavBar() {
  const location = useLocation();
  const context = useContext(ShopContext);
  const authContext = useContext(AuthContext);
  const featuredContext = useContext(FeaturedCoursesContext);

  if (authContext === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  if (featuredContext === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  const {role} = authContext;
  const {coursesToBuy} = context;
  const {search} = featuredContext;

  return (
    <Navbar
      bg="light"
      expand="lg"
      style={{paddingLeft: '20px', paddingRight: '20px'}}>
      <Navbar.Brand as={NavLink} to="/">
        SignVideo
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse
        id="basic-navbar-nav"
        className="justify-content-between">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/library">
            Library
          </Nav.Link>
          <Nav.Link as={NavLink} to="/shop">
            Shop
          </Nav.Link>
          {role === 'admin' && (
            <Nav.Link as={NavLink} to="/upload">
              Upload course
            </Nav.Link>
          )}
          <NavDropdown title="Account" id="basic-nav-dropdown">
            <NavDropdown.Item as={NavLink} to="/login">
              LogIn
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/logout">
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <div className="d-flex">
          {location.pathname === '/' && (
            <Form inline="true" className="d-flex">
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2 search-input"
                onChange={(e) => search(e.target.value)}
              />
            </Form>
          )}
          {location.pathname === '/shop' && (
            <Nav className="ml-auto">
              <Nav.Link as={NavLink} to="/cart">
                <img
                  src={CartLogo}
                  alt="Cart"
                  style={{width: '20px', marginRight: '10px'}}
                />
                <span style={{color: coursesToBuy.length > 0 && 'red'}}>
                  {coursesToBuy.length > 0 && coursesToBuy.length} Cart
                </span>
              </Nav.Link>
            </Nav>
          )}
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}
