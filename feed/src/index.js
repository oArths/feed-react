import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Cadastro from './pages/cadastro';
import Login from './pages/login';
import Home from './pages/home';
import ArticleComments from './pages/articlePage';
import Profile from './pages/profile';
import './index.css';
import { TokenProvider } from './context/TokenContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

function renderPage() {
  const path = window.location.pathname
  const pathClear = path.split('/')

  switch (pathClear[1]) {
    case '':
      return <Login />
    case 'cadastro':
      return <Cadastro />
    case 'home':
      if (pathClear[2] === 'article') {
        return <ArticleComments />
      }
      return <Home />
    case 'profile':
      return <Profile />
    default:
      return <Login />
  }
}
root.render(
  <TokenProvider>
    <React.StrictMode>
      {renderPage()}
    </React.StrictMode>
  </TokenProvider>

);

reportWebVitals();
