import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import MoviesList from './pages/MoviesList';
import MovieDetail from './pages/MovieDetail';
import Header from './components/Header';

function App() {
  return (
    <div className='App' style={{ margin: 20 }}>
      <Provider store={store}>
        <BrowserRouter>
        <Header />
          <Routes>
            <Route path='/' element={<MoviesList />} />
            <Route path='/detail/:id' element={<MovieDetail />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
