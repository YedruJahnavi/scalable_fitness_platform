import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../lib/store';
import { LoginPage1 } from '../components/ui/login-page-1';

export default function Login() {
  const [error, setError]  = useState('');
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSignIn = async (email, password) => {
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.response?.data?.errors?.[0]?.msg ||
        err.message ||
        'Invalid credentials. Please try again.';
      setError(message);
    }
  };

  return (
    <LoginPage1
      onSubmit={handleSignIn}
      isLoading={isLoading}
      error={error}
    />
  );
}
