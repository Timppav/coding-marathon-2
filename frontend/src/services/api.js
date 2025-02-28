export const handleLogin = async (payload) => {
    try {
      const response = await axios.post(apiLoginURL, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response) {
        console.error(`Error! Status: ${response.status}`);
        return;
      }
      console.log('Login process is successful');
      return response.data;
    } catch (error) {
      console.error('Error during sign-in process:', error.message);
      return;
    }
  };