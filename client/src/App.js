import { BrowserRouter as Router } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Navbar } from './components/Navbar/Navbar';

import AllRoutes from './AllRoutes';

import { fetchAllQuestions } from './actions/question'
import { fetchAllUsers } from './actions/users'
import ChatBotWidget from './components/ChatBot/ChatBotWidget';

import './App.css';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
  }, [dispatch])  
  
  return (
    <div className="App">
      <Router>
        <Navbar />
        <AllRoutes />
      </Router>
      <ChatBotWidget />
    </div>
  );
}

export default App;
