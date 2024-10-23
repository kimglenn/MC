import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Search from "./components/Search";
import Auth from "./components/Auth"; // Auth 컴포넌트 import
import SignUp from './components/SignUp'; // 추가

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Auth />} /> {/* 로그인 화면 */}
          <Route path="/signup" element={<SignUp />} /> {/* 회원가입 페이지 */}
          <Route path="/search" element={<Search />} /> {/* 검색 화면 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
