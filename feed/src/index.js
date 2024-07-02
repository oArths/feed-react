import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Cadastro from './pages/cadastro';
import Login from './pages/login';
import Home from './pages/home';
import ArticleComments from './pages/articlePage';
import './index.css';
import { TokenProvider } from './context/TokenContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

function renderPage (){
  const path = window.location.pathname

  switch (path) {
    case '/':
      return <Login/>
    case '/cadastro':
      return <Cadastro/>
    case '/home':
      return <Home/>
    case '/home/article':
      return <ArticleComments/>
    default:
      return <Login/>
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
