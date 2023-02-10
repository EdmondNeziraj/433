import { MatchContext } from "../context/MatchContext";
import { useContext } from "react";

export const useMatchContext = () => {
    const context = useContext(MatchContext);

    if (!context) {
        throw Error('useMatchContext must be used inside an MatchContextProvider');
    }

    return context;
}