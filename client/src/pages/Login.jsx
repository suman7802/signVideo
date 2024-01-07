import {AuthContext} from '../contexts/Auth.context';
import {Form, Button, Container, Row, Col, Spinner} from 'react-bootstrap';
import {useContext} from 'react';

export default function Login() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  const {email, admin, reqOtp, dispatch, loading, showPassword, adminPassword} =
    context;

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{span: 6, offset: 3}}>
          <h2 className="mb-4">Login</h2>
          <Form onSubmit={reqOtp}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                  dispatch({type: 'SET_EMAIL', payload: String(e.target.value)})
                }
              />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Admin"
                checked={admin}
                onChange={() => dispatch({type: 'SET_ADMIN'})}
              />
            </Form.Group>

            {admin && (
              <>
                <Form.Group controlId="formBasicAdminPassword">
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Admin Password"
                    value={adminPassword}
                    onChange={(e) =>
                      dispatch({
                        type: 'SET_ADMIN_PASSWORD',
                        payload: e.target.value,
                      })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="formBasicShowPasswordCheckbox">
                  <Form.Check
                    type="checkbox"
                    label={showPassword ? 'Hide' : 'Show'}
                    checked={showPassword}
                    onChange={() => dispatch({type: 'SET_SHOW_PASSWORD'})}
                  />
                </Form.Group>
              </>
            )}

            <Button variant="primary" type="submit">
              Send OTP {'  '}
              {loading && <Spinner animation="border" size="sm" />}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
