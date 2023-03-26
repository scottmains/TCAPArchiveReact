// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Layout from "./pages/Layout";
import Predators from './pages/Predators';
import Chat from './pages/Chat';
function App() {
return (
<Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="predators" element={<Predators/>} />
        <Route path="/chatlog/:id" element={<Chat/>}/>
      </Route>
    </Routes>
  </Router>
);
}

export default App;
