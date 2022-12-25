import { useState } from 'react'
// import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import '../styles/Login.css'

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(email, password);
    }

    return (
        <div className='background'>
            <div className='welcome'>
                <h1>Welcome</h1>
                <p>4-3-3 is a platform to schedule and organize pick up soccer games</p>
                {/* <Link to='/matches's className='item'>Browse Matches</Link> */}
                <button className='w-btn'><a href='/matches'>Browse Matches</a></button>

            </div>

            <div className='login-container'>
                <div className='login-header'>
                    <h3>Log in</h3>
                </div>
                <div className='login-main'>
                    <form className="login" onSubmit={handleSubmit}>
                        <input
                            placeholder='Email'
                            type='email'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <input
                            placeholder='Password'
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <button disabled={isLoading}>Log in</button>
                        <p>Don't have an account? <a href='/signup'>Sign up</a></p>
                        {error && <div className='error'>{error}</div>}
                        {props.error && <div className='error'>{props.error}</div>}
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Login