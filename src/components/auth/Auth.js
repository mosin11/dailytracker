  import React from 'react'
  import axios from 'axios';
  import bcrypt from 'bcryptjs';



  export async function submitSignUp({ formData,setIsAuthenticated, showMessage, navigate }) {
    try {
  
    //  console.log("formData",formData)
      const BASE_URL = process.env.REACT_APP_API_BASE_URL;
    
      const { name, email, password, phoneNumber } = formData;
     // console.log("name, email, password, phoneNumber",name, email, password, phoneNumber)


      // Hash the password using bcrypt
      const salt = await bcrypt.genSalt(10);
      const encreptPswd = await bcrypt.hash(password, salt);

      const url = `${BASE_URL}/users/auth/signup`;
      
      const response = await axios.post(url, {
        name,
        email,
        password :encreptPswd,
        phoneNumber
      });
     // console.log("response",response)
      navigate('/login');
      showMessage('Sign-up successful!',"success");

      setIsAuthenticated(false);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error occurred';
      //console.error('Error details:', error.response?.data);
      showMessage(`Error signing up: ${errorMessage}`,"error");
   
      setIsAuthenticated(false);
    }
  }

  export async function submitLogin({ email,setUserName,password,setIsAuthenticated, navigate,showMessage }) {
    try {
      const BASE_URL = process.env.REACT_APP_API_BASE_URL;
      const url = `${BASE_URL}/users/auth/login`;
      
  
      const response = await axios.post(url,{
        email,
        password
      });
      if(!response){
        showMessage(`Error Login`,"error");

        setIsAuthenticated(false);
      }
     // console.log("response.data.token",response.data.user.name)
      navigate('/home');
      showMessage('Login successful!',"success");
      sessionStorage.setItem("user",JSON.stringify(response.data.user))
      setUserName(response.data.user.name);
      setIsAuthenticated(true);
      localStorage.setItem("authToken",response.data.token);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error occurred';
     // console.error('Error details:', error.response?.data);
      showMessage(`Error Login: ${errorMessage}`,"error");
    
      setIsAuthenticated(false);
    }
  }


  
  export async function emailVerifications({email,setShowOtpForm,setIsAuthenticated,showMessage }) {
    try {
      const BASE_URL = process.env.REACT_APP_API_BASE_URL;
      const url = `${BASE_URL}/users/auth/email-verification`;
      
  
      const response = await axios.post(url,{
        email
      });
      //console.log("response in emailVerifications ",response)
      showMessage('OTP sent successful!',"success");
    
      setShowOtpForm(true)
      setIsAuthenticated(false);
      return response;
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error occurred';
      //console.error('Error details:', error.response?.data);
      showMessage(`Error Login: ${errorMessage}`,"error");
  
      setIsAuthenticated(false);
      return { error: errorMessage };
    }
  }


  
  export async function OTPVerifications({email,otp,setShowOtpForm,setIsAuthenticated,showMessage}) {
    try {
      const BASE_URL = process.env.REACT_APP_API_BASE_URL;
      const url = `${BASE_URL}/users/auth/verifyOtp`;
  
      const response = await axios.post(url,{
        email, 
        otp
      });
     // console.log("response in OTPVerifications ",response)
      showMessage('OTP verified successful!',"success");
   
      setShowOtpForm(true)
      setIsAuthenticated(false);
      return response;
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error occurred';
      //console.error('Error details:', error.response?.data);
      showMessage(`Error Login: ${errorMessage}`,"error");
  
      setIsAuthenticated(false);
      return { error: errorMessage };
    }
  }


  export async function authToken({ token, 
    setIsAuthenticated,
    setUserName,
    showMessage}) {
    // Now you can access token, setIsAuthenticated, etc., directly
   
    try {
      const BASE_URL = process.env.REACT_APP_API_BASE_URL; 
      const url = `${BASE_URL}/users/auth/authToken`;
      
      const response = await axios.get(url, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
      return {userId: response.data.userId, 
              isVerified: response.data.isVerified,
              userName: response.data.userName}
  
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error occurred';
     // console.error('Error details:', error.response?.data);
      localStorage.removeItem('authToken'); 
      showMessage(`Error signing up: ${errorMessage}`,"error");
   
      setIsAuthenticated(false);
     
     return null;
    }
  }
  
  export default function Auth() {
    return (
      <div>

      </div>
    )
  }
