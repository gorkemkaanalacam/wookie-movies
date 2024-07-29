import React from 'react'
import SearchBar from './SearchBar';
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    return (
        <div style={style.headerContainer}>
            <h1 onClick={() => navigate("/")}>Wookie Movies</h1>
            <SearchBar />
        </div>
    );
}

export default Header;

const style = {
    headerContainer: { 
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "space-between",
        borderBottom:"2px solid",
        paddingBottom: 20
    }
}
