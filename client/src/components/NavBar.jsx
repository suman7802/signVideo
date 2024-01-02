import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import CartLogo from '../assets/cart.svg';

export default function NavBar() {
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
          <NavDropdown title="Account" id="basic-nav-dropdown">
            <NavDropdown.Item as={NavLink} to="/account">
              My Account
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={NavLink} to="/login">
              LogIn
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/logout">
              Logout
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={NavLink} to="/disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav>
        <div className="d-flex">
          <Form inline="true" className="d-flex">
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button
              variant="outline-success"
              style={{marginRight: '10px', marginLeft: '10px'}}>
              Search
            </Button>
          </Form>
          <Nav className="ml-auto">
            <Nav.Link as={NavLink} to="/cart">
              <img
                src={CartLogo}
                alt="Cart"
                style={{width: '30px', marginRight: '10px'}}
              />
              Cart
            </Nav.Link>
          </Nav>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}
