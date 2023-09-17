import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import UserList from './components/users/list/UserList.js'
import TokenView from './components/token/TokenView.js'
import TokenList from './components/token/TokenList.js'
function App() {
  
  return (
    <div className='container'>
      <Router>
        <Routes>
          <Route path="/" exact element={<UserList/>} />
          <Route path="token/:user_id" exact element={<TokenView/>} />
          <Route path="token/list/:user_id" exact element={<TokenList/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
