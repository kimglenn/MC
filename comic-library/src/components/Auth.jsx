import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.scss';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (savedUser) {
      navigate('/search'); // 이미 로그인된 경우 검색 페이지로 리다이렉트
    }
  }, [navigate]);

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:3000/users', {
        email,
        password,
      });
      console.log('회원가입 성공:', response.data);
      setIsLogin(true);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('회원가입 실패:', error.response.data);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
      const users = response.data;

      const user = users.find((user) => user.email === email && user.password === password);
      
      if (user) {
        console.log('로그인 성공:', user);
        localStorage.setItem("currentUser", JSON.stringify(user));
        navigate('/search'); // 로그인 성공 시 /search 페이지로 리다이렉트
      } else {
        console.error('로그인 실패: 잘못된 자격 증명');
      }
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate('/'); // 로그인 페이지로 리다이렉트
  };

  return (
    <div>
      <h2>{isLogin ? 'Log-In' : 'Sign-Up'}</h2>
      <input
        type="email"
        placeholder="your Id.."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="your password.."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={isLogin ? handleLogin : handleSignUp}>
        {isLogin ? 'Log-In' : 'Sign-Up'}
      </button>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Make your account!' : 'Gonna Log-In?'}
      </button>
     
      {/* 로그인 페이지에서는 로그아웃 버튼을 표시하지 않음 */}
      {false && <button onClick={handleLogout}>Log-Out</button>} {/* 그냥 조건을 false로 설정 */}
    </div>
  );
};

export default Auth;
