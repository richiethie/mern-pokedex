import { useState } from 'react'
import { LOGIN } from '../utils/mutations'
import { useMutation } from '@apollo/client'
import Auth from '../utils/auth' 

const Login = () => {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')

    const [login, { loading, error }] = useMutation(LOGIN)

    const handleSubmit = async e => {
        e.preventDefault()
        const { data } = await login({
            variables: {
                email,
                password,
            }
        })
        console.log(data)
        Auth.login(data.login.token)
    }

    return (
        <form id='login-form' onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input 
                name='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                type='email'
                placeholder='Email'
            />
            <input 
                name='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                type='password'
                placeholder='Password'
            />
            <button>Login</button>
        </form>
    )
}

export default Login