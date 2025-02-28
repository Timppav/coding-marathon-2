import React from 'react';
import { Form } from '../components/Login';

const Login = () => {
  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-md ">
        <h2 className="text-2xl font-bold mb-6">Log in</h2>
        <Form />
        <div className="text-center mt-6">
          <a href="/reset" className="text-blue-600">
            Forgot your password?
          </a>
        </div>
        <div className="text-center mt-2">
          <span className="text-gray-600">
            Don't have an account?
          </span>
          <a href="/signup" className="text-blue-600">
              Sign up
          </a>
        </div>
        <div className="flex items-center justify-center mt-6">
          <hr className="w-1/4 border-gray-300" />
          <span className="mx-2 text-gray-500">or</span>
          <hr className="w-1/4 border-gray-300" />
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;