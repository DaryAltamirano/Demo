import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import UserList from './components/users/list/UserList.js'
function App() {
  return (
    <div className='container'>
      <Router>
        <Routes>
          <Route path="/" exact element={<UserList/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
