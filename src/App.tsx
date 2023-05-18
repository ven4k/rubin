import { FC, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Guard } from './components/Guard/Guard';
import { NotFound } from './components/NotFound/NotFound';
import { Footer } from './components/Footer/Footer';
import './App.scss';
import { Iphotos, Iposts } from './types/types';


const App: FC = () => {


  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/guard' element={<Guard />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
