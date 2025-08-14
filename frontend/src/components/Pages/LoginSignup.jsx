import React, { useState } from 'react';
import './CSS/Loginsignup.css';

const PORT = process.env.PORT || 4000;

function LoginSignup() {
  const [state, setState] = useState('Login');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signup = async () => {
    console.log('Signing Up:', formData);
    try {
      const res = await fetch(`${PORT}/signup`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await res.json();
      if (responseData.success) {
        localStorage.setItem('token', responseData.token);
        window.location.replace('/');
      } else {
        alert('Signup failed: ' + responseData.errors);
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Something went wrong');
    }
  };

  const login = async () => {
    console.log('Logging In:', formData);
    try {
      const res = await fetch(`${PORT}/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const responseData = await res.json();
      if (responseData.success) {
        localStorage.setItem('token', responseData.token);
        window.location.replace('/');
      } else {
        alert('Login failed: ' + responseData.errors);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong');
    }
  };

  return (
    <div className="loginsignup">
      <h1>{state}</h1>
      <div className="loginsignup-fields">
        {state === 'Sign Up' && (
          <input
            type="text"
            name="username"
            placeholder="Your Name"
            value={formData.username}
            onChange={changeHandler}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={changeHandler}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={changeHandler}
        />
      </div>
      <button onClick={() => (state === 'Sign Up' ? signup() : login())}>
        Continue
      </button>

      {state === 'Sign Up' ? (
        <p className="loginsignup-login">
          Already have an account?{' '}
          <span onClick={() => setState('Login')}>Login</span>
        </p>
      ) : (
        <p className="loginsignup-login">
          Create an account?{' '}
          <span onClick={() => setState('Sign Up')}>Click here</span>
        </p>
      )}

      <div className="loginsignup-agree">
        <input type="checkbox" id="terms" />
        <label htmlFor="terms">
          By continuing, I agree to the terms of use and privacy.
        </label>
      </div>
    </div>
  );
}

export default LoginSignup;
