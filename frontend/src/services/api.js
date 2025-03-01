const API_BASE_URL = 'https://coding-marathon-2-kqxf.onrender.com';
export const handleLogin = async (payload) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      console.error(`Error! Status: ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('Error during sign-in process:', error.message);
    return null;
  }
};

export const handleRegister = async (data) => {
  try {
    const { email, password, lastName, firstName } = data;
    const payload = {
      email,
      password,
      firstName,
      lastName,
    };
    
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      console.error(`Error! Status: ${response.status}`);
      return null;
    }
    
    const responseData = await response.json();
    console.log('Register process is successful');
    return responseData;
  } catch (error) {
    console.error('Error during register process:', error.message);
    return null;
  }
};

export const handleSignOut = () => {
  try {

    localStorage.removeItem('jwtToken');
    return true;
  } catch (error) {
    console.error('Error during sign-out process:', error.message);
    return false;
  }
};