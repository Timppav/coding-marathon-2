import React from 'react';
import { Form } from '../components/SignUp';
function SignUpPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-md ">
          <h2 className="text-2xl font-bold mb-2 text-center">Sign up</h2>
          <Form />
          <p className="mb-6 text-center text-gray-700">
            Already have an account?
            <a href="/login" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-300">
              Log in
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;