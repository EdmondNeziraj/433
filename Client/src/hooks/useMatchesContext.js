import { MatchesContext } from "../context/MatchesContext";
import { useContext } from "react";

export const useMatchesContext = () => {
    const context = useContext(MatchesContext);

    if (!context) {
        throw Error('useMatchesContext must be used inside an MatchesContextProvider');
    }
 
    return context;
}