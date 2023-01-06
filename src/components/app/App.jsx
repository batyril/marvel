import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Spinner from '../spinner/Spinner';

const SingleComicPage = lazy(() => import('../Pages/SingleComicPage'));
const Page404 = lazy(() => import('../Pages/404'));
const ComicsPage = lazy(() => import('../Pages/ComicsPage'));
const MainPage = lazy(() => import('../Pages/MainPage'));
const AppHeader = lazy(() => import('../appHeader/AppHeader'));

function App() {
  return (
    <Router>
      <div className='app'>
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/comics' element={<ComicsPage />} />
              <Route path='/comics/:comicId' element={<SingleComicPage />} />
              <Route path='*' element={<Page404 />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
