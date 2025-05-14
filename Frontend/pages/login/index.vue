<template>
    <div class="login-wrapper bg-white dark:bg-gray-800 min-h-screen flex items-center justify-center">
      
      




      <div class="login-card">

  
        <div class="input-group">
          <label>Email</label>
          <div class="input-icon">
            <i class="fas fa-envelope"></i>
            <input type="email" placeholder="Enter your email" />
          </div>
        </div>
  
        <div class="input-group">
          <label>Password</label>
          <div class="input-icon">
            <i class="fas fa-lock"></i>
            <input type="password" placeholder="Enter your password" />
            <i class="fas fa-eye-slash toggle-icon"></i>
          </div>
        </div>
  
        <div class="options-row">
          <label><input type="checkbox" /> Keep me logged in</label>
          <a href="#">Forgot password?</a>
        </div>
  
        <button class="sign-in-btn">Sign in</button>
  
        <div class="divider">OR</div>
  
        <div class="social-buttons">
          <button><i class="fab fa-google"></i></button>
          <button><i class="fab fa-facebook-f"></i></button>
          <button><i class="fab fa-apple"></i></button>
        </div>
  
        <p class="register-text">
          Not a member yet? <a href="#">Register now</a>
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  // No script logic needed unless you want to handle form submissions
  </script>
  
  <style scoped>
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
  
  .login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #9CA3AF;
    position: relative;
    padding: 1rem;
    overflow: hidden;
  }
  
  .login-card {
    background: #e2e4e9;
    padding: 2rem;
    max-width: 600px;
    width: 100%;
    border-radius: 8px;
    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.1);
    margin-top: -10px;
  }
  
  .welcome {
    text-align: center;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }
  
  .input-group {
    margin-bottom: 1rem;
  }
  
  .input-group label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  .input-icon {
    background: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding: 0.5rem;
  }
  
  .input-icon i {
    margin-right: 0.5rem;
    color: #888;
  }
  
  .input-icon input {
    border: none;
    outline: none;
    flex: 1;
  }
  
  .toggle-icon {
    cursor: pointer;
    margin-left: auto;
  }
  
  .options-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
  
  .sign-in-btn {
    width: 100%;
    background: #4a5262;
    color: white;
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  
  .divider {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    color: #555;
  }
  
  .social-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .social-buttons button {
    background: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
  }
  
  .register-text {
    text-align: center;
    font-size: 0.9rem;
  }
  
  
  </style>
  