import { useSelector } from "react-redux";
import { selectedIslogged } from "../redux/slices/AuthSlices";

export const ShowLoggin = ({children}) =>{
    const isLogged = useSelector(selectedIslogged);
    if(isLogged){
        return children;
    }
    return null
}

export const ShowLogout = ({children}) =>{
    const isLogged = useSelector(selectedIslogged);
    if(!isLogged){
        return children;
    }
    return null;
}