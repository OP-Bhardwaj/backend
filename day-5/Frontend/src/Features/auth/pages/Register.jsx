import React from 'react'
import "../style/register.scss"
import FormGroup from '../components/FormGroup'

const register = () => {
  return (
    <main className="register-page">
      <div className="form-container">
        <h1>Register</h1>
        <form>
          <FormGroup label="Name" placeholder="Enter your name" type="text" />
          <FormGroup label="Email" placeholder="Enter your email" type="email" />
          <FormGroup label="Password" placeholder="Enter your password" type="password" />
          <FormGroup label="Confirm Password" placeholder="Confirm your password" type="password" />
          <button className="button" type="submit">Register</button>
        </form>
      </div>
    </main>
  )
}

export default register