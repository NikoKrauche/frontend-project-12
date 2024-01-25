import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from '../routes.js';
import MainPage from './MainPage.jsx';
import LoginPage from './LoginPage.jsx';
import Page404 from './Page404.jsx';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.mainPath()} element={<MainPage />} />
      <Route path={routes.loginPath()} element={<LoginPage />} />
      <Route path={routes.anyPath()} element={<Page404 />} />
    </Routes>
  </BrowserRouter>
);

export default App;
