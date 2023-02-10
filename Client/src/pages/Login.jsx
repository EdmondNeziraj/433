import { useState } from 'react'
import { useLogin } from '../hooks/useLogin';
import '../styles/Login.css'

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(username, password);
    }

    return (
        <div className='background'>
            <div className='welcome'>
                <h1>Welcome</h1>
                <h5><span>4-3-3</span> is a platform to schedule and organize pick up soccer games</h5>
                <a className='home-btn home-btn-link' href='/matches'>Browse Matches</a>
            </div>
 
            <div className='login-container'>
                <h3 className='login-container__title'>Log in</h3>
                <div className='login-main'>
                    <form className="login" onSubmit={handleSubmit}>
                        <input
                            placeholder='Username'
                            type='username'
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />
                        <input
                            placeholder='Password'
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <button className='home-btn' disabled={isLoading}>Log in</button>
                        <p className='account-text'>Don't have an account? <a href='/signup'>Sign up</a></p>
                        {error && <div className='error text-danger'>{error}</div>}
                        {props.error && <div className='error text-danger'>{props.error}</div>}
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Login