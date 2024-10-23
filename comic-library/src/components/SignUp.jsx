import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:3000/users', {
        email,
        password,
      });
      console.log('회원가입 성공:', response.data);
      // 회원가입 후 자동으로 로그인 페이지로 리다이렉트
      navigate('/'); // 로그인 페이지로 리다이렉트
    } catch (error) {
      console.error('회원가입 실패:', error.response.data);
    }
  };

  return (
    <div>
      <h2>Sign-Up</h2>
      <input
        type="email"
        placeholder="Email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign-Up</button>
      <button onClick={() => navigate('/')}>Back to Log-In</button>
    </div>
  );
};

export default SignUp;
