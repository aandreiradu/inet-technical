import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import MyProfile from './pages/MyProfile';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/my-profile" element={<MyProfile />} />
      <Route path="*" element={<NotFound />} />;
    </Routes>
  );
}

export default App;
