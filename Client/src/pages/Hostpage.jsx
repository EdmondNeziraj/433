import { useState } from "react";

function Hostpage() {
    const [location, setLocation] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const match = {location, time}

        const response = await fetch('/matches', {
            method: 'POST',
            body: JSON.stringify(match),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(response);
        const json = await response.json();

        if (response.ok) {
            setLocation('');
            setTime('');
            console.log('new match added', json);
        }
        
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>This is going to be the hostpage</h1>
                <form onSubmit={handleSubmit}>
                    <h3>Host a Match</h3>
                    <label>Location: </label>
                    <input
                        type='text'
                        onChange={(e) => setLocation(e.target.value)}
                        value={location}
                    />

                    <label>Time: </label>
                    <input
                        type='text'
                        onChange={(e) => setTime(e.target.value)}
                        value={time}
                    />
                    <button>Submit!</button>
                </form>
            </header>
        </div>
    );
}

export default Hostpage;
