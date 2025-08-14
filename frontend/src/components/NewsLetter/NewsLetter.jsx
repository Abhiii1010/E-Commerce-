import React from 'react';
import './NewsLetter.css';

function NewsLetter() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle email submission logic here
  };

  return (
    <div className="newsletter">
      <h1>Get Exclusive Offers on Your Email</h1>
      <p>Subscribe to our newsletter and stay updated</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className="visually-hidden">Email address</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your email id"
          required
          autoComplete="email"
        />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
}

export default NewsLetter;
