import './App.css';
import Layout from './components/layout/Layout';
import Login from './components/login/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


function App() {

  return (
    <>
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/*"
          element={
            <div className='App'>
              <Layout />
            </div>
          }
        />
      </Routes>
    </Router>
    </>
  );
  }

export default App;
