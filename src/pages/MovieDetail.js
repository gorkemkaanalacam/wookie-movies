import React from 'react'
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetail } from "../store/movies.slice";
import { FaSpinner } from "react-icons/fa";

const MovieDetail = () => {
    const params = useParams();
    const { movie, isLoadingMovies } = useSelector(state => state.movies);
    const dispatch = useDispatch();

    useEffect(() => {
        if (params.id) {
            dispatch(fetchMovieDetail(params.id));
        }
    }, [params]);


    return (
        <div>
            {isLoadingMovies ? (
                <FaSpinner />
            ) : (
                <div style={style.container}>
                    <img src={movie.poster} height={600} style={style.poster} />
                    <div>
                        <h2>{movie.title} (IMDB: {movie.imdb_rating})</h2>
                        <div style={style.informations}>Relesed: {movie.released_on}</div>
                        <div style={style.informations}>Length: {movie.length}</div>
                        <div style={style.informations}>Director: {movie.director}</div>
                        <div style={style.informations}>Description: {movie.overview}</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MovieDetail;

const style = {
    container: { display: "flex" },
    poster: { margin: 20, objectFit: "cover" },
    informations: { marginTop: 30 }
}
