import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Landing from './components/layout/Landing';
import Auth from './view/Auth';
import Dashboard from './view/Dashboard';
import AuthContextProvider from './contexts/AuthContext';
import ProtectedRoute from './ProtectedRouting/ProtectedRoute';
import About from './view/About';
import PostContextProvider  from './contexts/PostContext';

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Switch>
            <Route exact path='/' component={Landing}></Route>
            <Route exact path='/login' render={props => <Auth {...props} authRoute ='login'/>}></Route>
            <Route exact path='/register' render={props => <Auth {...props} authRoute ='register'/>}></Route>
            <ProtectedRoute exact path='/dashboard' component={Dashboard}/>
            <ProtectedRoute exact path='/about' component={About}/>

          </Switch> 
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
