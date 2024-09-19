import './login.css';
import React from 'react';

export default function login() {
  return (
    <div>
        <div className="login-container">
            <form action="" className="LoginForm">
                <div className="welcomeText">
                    Welcome to <span>Coffee Cafe</span> POS System
                </div>
            <div className="image-loginForm">
                <div className="coffeeImage">
                    <img src="./images/loginImage.png" alt="Coffee cup for login page" className="coffee-image" />
                </div>
                <div className="login">
                    <h1>- LOGIN -</h1>
                    <div className='email-password'>
                        <table>
                            <tr>
                                <td>Email</td>
                                <td><input type="text" className="email" placeholder='Enter Your Email' required /></td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td><input type="password" className="password" placeholder='Enter Your Password' required /></td>
                            </tr>
                        </table>
                        <input type="submit" value={'Login'} className="submitButton" />
                    </div>
                </div>
            </div>
            </form>
        </div>
    </div>
  )
}
