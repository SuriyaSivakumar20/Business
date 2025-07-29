import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import FeedPage from './pages/FeedPage';
import ExplorePage from './pages/ExplorePage';
import MessagesPage from './pages/MessagesPage';
import ChatPage from './pages/ChatPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useUser } from './contexts/UserContext';

function App() {
  const { isAuthenticated } = useUser();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="login" element={<LoginPage />} />
        
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="feed" element={<FeedPage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="profile/:id" element={<ProfilePage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="messages/:id" element={<ChatPage />} />
        </Route>
        
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;