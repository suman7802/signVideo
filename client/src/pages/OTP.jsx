import {useContext} from 'react';
import {AuthContext} from '../contexts/Auth.context';
import {Form, Button, Container, Row, Col, Spinner} from 'react-bootstrap';

export default function OTP() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  const {email, otp, submitOtp, dispatch, loading} = context;

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{span: 6, offset: 3}}>
          <h2 className="mb-4">Login</h2>
          <Form onSubmit={submitOtp}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                  dispatch({type: 'SET_EMAIL', payload: e.target.value})
                }
              />
            </Form.Group>

            <Form.Group controlId="formBasicAdminPassword">
              <Form.Control
                type="text"
                placeholder="OTP"
                value={otp}
                onChange={(e) =>
                  dispatch({type: 'SET_OTP', payload: e.target.value})
                }
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login {'  '}
              {loading && <Spinner animation="border" size="sm" />}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
