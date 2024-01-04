import {AuthContext} from '../contexts/Auth.context';
import {useContext} from 'react';

export default function Logout() {
  const {handleLogout} = useContext(AuthContext);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Logout</h2>
              <p className="card-text">Are you sure you want to logout?</p>
              <button className="btn btn-primary" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
