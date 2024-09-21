import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const url = 'http://localhost/egaleeyesstore/login.php';

    const loginSubmit = (e) => {
        e.preventDefault(); 
        let fData = new FormData();
        fData.append('email', email);
        fData.append('password', password);
        
        axios.post(url, fData)
          .then(Response => {
            const result = Response.data;
    
            if (result.success) {
              localStorage.setItem('isLoggedIn', true);
              navigate('/AdminHome');
            } else {
                setErrorMessage('Invalid email/password');
            }
          })
          .catch(error => {
            alert('Error occurred: ' + error.message);
          });
      };
    
  return (
    <div>
        <div className="login-container">
            <form action="" className="LoginForm">
                <div className="welcomeText">
                     Add New <span>Coffee</span> Items
                </div>
            <div className="image-loginForm">
                <div className="coffeeImage">
                    <img src="./images/loginImage.png" alt="Coffee cup for login page" className="coffee-image" />
                </div>
                <div className="login">

                {errorMessage && <p className='errorMassage'>{errorMessage}</p> }

                    <h1>- LOGIN -</h1>
                    <div className='email-password'>
                        <table>
                            <tr>
                                <td>Email</td>
                                <td><input type="email" className="input" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' required /></td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td><input type="password" className="input" name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password' required /></td>
                            </tr>
                        </table>
                        <input type="submit" value={'Login'} onClick={loginSubmit} className="submitButton" />
                    </div>
                </div>
            </div>
            </form>
        </div>
    </div>
  )
}
