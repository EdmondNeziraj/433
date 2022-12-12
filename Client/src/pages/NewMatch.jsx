import React from "react";

function NewMatch() {

    return (
        <div className="App">
            <form action="/matches" method="POST">
                <div>
                    <label>
                        Location
                        <input type="text" name="matches[location]"/>
                    </label>
                </div>
                <div>
                    <label>
                        Time
                        <input type="text" name="matches[time]"/>
                    </label>
                </div>
                <button>Create Match</button>
            </form>
        </div>
    );
}

export default NewMatch;
