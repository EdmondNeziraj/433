import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isLoading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(email, password)
    }

    return (

        <div className='background'>
            <div className='welcome'>
                <h1>Welcome</h1>
                <p>4-3-3 is a platform to schedule and organize pick up soccer games</p>
                {/* <Link to='/matches' s className='item'>Browse Matches</Link> */}
                <button className='w-btn'><a href='/matches'>Browse Matches</a></button>
            </div>

            <div className='login-container'>
                <div className='login-header'>
                    <h3>Sign up</h3>
                </div>
                <div className='login-main'>
                    <form className="signup" onSubmit={handleSubmit}>
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
                        <button disabled={isLoading}>Sign up</button>
                        <p>Already have an account? <a href='/login'>Log in</a></p>
                        {error && <div className='error'>{error}</div>}
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Signup