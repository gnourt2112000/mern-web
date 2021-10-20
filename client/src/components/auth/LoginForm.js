import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link,useHistory} from 'react-router-dom'
import { useState,useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'
const LoginForm = () => {
    const {loginUser} = useContext(AuthContext)

    const history = useHistory()


    const [loginForm,setLoginForm] = useState({
        username:'',
        password:''
    })

    const [alert,setAlert] = useState(null)
    const {username,password} = loginForm
    const onChangeLoginForm = event => setLoginForm({...loginForm,[event.target.name]:event.target.value})
    
    const login = async event =>{
        event.preventDefault()
        try{
            const loginData = await loginUser(loginForm)
            if(loginData.success){
                history.push('/dashboard')
            }else{
                setAlert({type:'danger',message:loginData.message})
                setTimeout(()=>setAlert(null),5000)
            }
        }catch(error){
            console.log(error)
        }
    }
    return (
        <>
            <Form className="my-4" onSubmit={login}>
                <AlertMessage info={alert}/>
                <Form.Group className="mb-3">
                    <Form.Control type='text' placeholder='Username' name='username' value ={username} onChange={onChangeLoginForm} required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control type='password' placeholder='Password' name='password' value ={password} onChange={onChangeLoginForm} required/>
                </Form.Group>

                <Button variant='success' type='submit'>Login</Button>
            </Form>
            <p>Don't have an account?
                <Link to='/register'>
                    <Button variant='info' size='sm' className='ms-2'>Register</Button>
                </Link>
            </p>
        </>
    )
}

export default LoginForm
