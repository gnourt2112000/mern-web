import {Route,Redirect} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import Spinner from 'react-bootstrap/Spinner'
import NavbarMenu from '../components/layout/NavbarMenu'


const ProtectedRoute = ({component: Component, ...rest}) => {
    const {authState:{authLoading,isAuthenticated}} = useContext(AuthContext)
    
    if(authLoading){
        return (
            <div className="spinner-container">
                <Spinner animation='border' variant='info'></Spinner>
            </div>
        )
    }
    return (
        <Route {...rest} render={props => isAuthenticated ? (<> 
            <NavbarMenu></NavbarMenu>
            <Component {...rest} {...props}></Component>

        </>): (<Redirect to='/login'></Redirect>)}/>
    )
}

export default ProtectedRoute
