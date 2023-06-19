import { useState } from 'react'
import { useSignup } from '../hooks/useSignup';
import '../styles/Signup.css'

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isLoading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(username, email, password)
    }

    return (
        <div className='background'>
            <div className='welcome'>
                <h1>Welcome</h1>
                <h5><span>4-3-3</span> is a platform to schedule and organize pick up soccer games</h5>
                <a className='home-btn home-btn-link' href='/matches'>Browse Matches</a>
            </div>

            <div className='signup-container'>
                <h3 className='signup-container__title'>Sign up</h3>
                <div className='signup-main'>
                    <form className="signup" onSubmit={handleSubmit}>
                        <input
                            placeholder='Username'
                            type='text'
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />
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
                        <button className='home-btn' disabled={isLoading}>Sign up</button>
                        <p className='account-text'>Already have an account? <a href='/login'>Log in</a></p>
                        {error && <div className='error'>{error}</div>}
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Signup