import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../store/movies.slice";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const MoviesList = () => {
  const { movies, isLoadingMovies } = useSelector(state => state.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  const groupedMovies = useMemo(() => {
    if(movies.length > 0){
      let moviesByGenre = {};
      movies.forEach(movie => {
        movie.genres.forEach((genre) => {
          if(typeof moviesByGenre[genre] === "undefined"){
            moviesByGenre[genre] = [];
          }
          moviesByGenre[genre].push(movie);
        })
      });
      return moviesByGenre;
    }
  }, [movies])


  return (
    <div>
      {isLoadingMovies && !groupedMovies ? (
        <FaSpinner />
      ) : (
        <div>
            {groupedMovies && Object.keys(groupedMovies).map(genre => {
              return <div style={style.container}>
                <h2>{genre}</h2>
                <div style={style.imageContainer}>
                {
                  groupedMovies[genre].map(movie => {
                    return <Link key={movie.id} to={"detail/" + movie.id}>
                    <img src={movie.backdrop} width={200} style={style.backdrop}/>
                  </Link>
                  })
                }
              </div>
              </div>
            })}
        </div>
      )}
    </div>
  );
}

export default MoviesList;

const style = {
  container: {display:"flex", flexDirection:"column"},
  imageContainer: {display:"flex", flexDirection:"row", overflow:"auto"},
  backdrop: {margin:20}
}
