import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk("movies/fetch", async () => {
    const response = await fetch("https://wookie.codesubmit.io/movies", {
        method: "get",
        headers: {
            "Authorization": "Bearer Wookie2021"
        }
    });
    return response.json();
});

export const fetchMovieDetail = createAsyncThunk("movieDetail/fetch", async (id) => {
    const response = await fetch("https://wookie.codesubmit.io/movies/" + id, {
        method: "get",
        headers: {
            "Authorization": "Bearer Wookie2021"
        }
    });
    return response.json();
});

const initialState = {
    movies: [],
    movie: {},
    isLoadingMovies: false,
};

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchMovies.pending, (state, action) => {
            return {
                ...state,
                isLoadingMovies: true,
            };
        });
        builder.addCase(fetchMovieDetail.pending, (state, action) => {
            return {
                ...state,
                isLoadingMovies: true,
            };
        });
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            return {
                ...state,
                movies: action.payload.movies,
                isLoadingMovies: false,
            };
        });
        builder.addCase(fetchMovieDetail.fulfilled, (state, action) => {
            return {
                ...state,
                movie: action.payload,
                isLoadingMovies: false,
            };
        });
    },
});

export default moviesSlice.reducer;