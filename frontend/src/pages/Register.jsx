import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../lib/store';
import SignupForm from '../components/ui/SignupForm';

export default function Register() {
  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleRegister = async (data) => {
    setError('');
    try {
      await register(data);
      navigate('/dashboard');
    } catch (err) {
      const message = err.response?.data?.error || err.response?.data?.errors?.[0]?.msg || err.message || 'Registration failed';
      setError(message);
    }
  };

  return <SignupForm onSubmit={handleRegister} isLoading={isLoading} error={error} />;
}
