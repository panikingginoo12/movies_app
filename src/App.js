import { Navigate, Routes, Route, BrowserRouter } from 'react-router-dom';
import ShowDetails from './Pages/ShowDetails';
import Home from './Pages/Home';
import Custom404 from './Pages/Custom404';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='details'>
          <Route index element={<Navigate to='/' replace />} />
          <Route path=':id' element={<ShowDetails />} />
        </Route>
        <Route path='*' element={<Custom404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
