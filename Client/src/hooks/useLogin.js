import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (username, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('http://localhost:5000/user/login', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const json = await response.json();
         
        console.log(json);

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        
        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update the AuthContext
            dispatch({ type: 'LOGIN', payload: json })

            setIsLoading(false);
        }
    }

    return { login, isLoading, error }
}
