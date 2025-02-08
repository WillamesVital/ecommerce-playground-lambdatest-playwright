export const generateUser = () => {
    const random = Math.floor(Math.random() * 10000);
    return {
      firstName: 'Test',
      lastName: 'User',
      email: `testuser${random}@example.com`,
      telephone: '1234567890',
      password: 'Password123!'
    };
  };