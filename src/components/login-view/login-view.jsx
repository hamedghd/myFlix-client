import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  const handleRegister = () => {
    let register = false;
    props.onRegister(register);

  }

  return (
    <div>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="submit" onClick={handleSubmit}>Submit</button>

      </form>
      {" or "}<button type="submit" onClick={handleRegister}>Sign up!</button>
    </div>
  );
}
LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired
};