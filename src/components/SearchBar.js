import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import useDebounce from '../hooks/useDebounce';
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
    const navigate = useNavigate();
    const [term, setTerm] = useState();
    const [movies, setMovies] = useState([]);
    const debouncedValue = useDebounce(term, 400);

    useEffect(() => {
        if (debouncedValue) {
            const fetchSearchedMovies = async () => {
                try {
                    const response = await fetch("https://wookie.codesubmit.io/movies?q=" + debouncedValue, {
                        method: "get",
                        headers: {
                            "Authorization": "Bearer Wookie2021"
                        }
                    });
                    const movies = await response.json()
                    setMovies(movies.movies);
                } catch (error) {
                }
            }
            fetchSearchedMovies();
        }
    }, [debouncedValue]);

    const search = (id) => {
        navigate("/detail/" + id);
        setTerm("");
        setMovies([]);
    }

    const onChange = (e) => {
        const value = e.target.value;
        if (value) {
            setTerm(e.target.value)
        }
        else {
            setTerm("");
            setMovies([]);
        }
    }

    return (
        <div style={style.searchBarContainer}>
            <div style={style.searchBarInnerContainer}>
                <div style={style.searchBarIconContainer}>
                    <FaSearch style={style.icon} />
                    <input type='text' value={term} onChange={onChange} />
                </div>
                <div style={style.movies}>
                    {
                        movies.map((movie) => {
                            return (
                                <div key={movie.id} onClick={() => search(movie.id)} style={style.movie}>
                                    {movie.title}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default SearchBar;

const style = {
    searchBarContainer: { display: "flex", alignItems: "end" },
    searchBarInnerContainer: { display: "flex", flexDirection: "column" },
    searchBarIconContainer: { display: "flex" },
    icon: { marginRight: 10 },
    movies: { position: "absolute", top: 110, backgroundColor: "#FFF", marginRight: 20 },
    movie: { margin: 5, borderBottom: "1px solid", padding: 5, cursor: "pointer" }
}
