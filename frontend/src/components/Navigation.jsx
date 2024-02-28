import { Container, Navbar, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { logout } from '../slices/authorizationSlice.js';
import routes from '../utilities/routes.js';

const NavigationBar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    navigate(routes.loginPath());
  };

  return (
    <Navbar className="bg-body-tertiary shadow-sm navbar-expand-lg navbar-light">
      <Container>
        <Navbar.Brand href={routes.mainPath()}>{t('Navigate.brand')}</Navbar.Brand>
        <Button
          className="ml"
          type="button"
          onClick={handleLogout}
        >
          {isAuthenticated ? t('Navigate.buttonLogOut') : t('Navigate.buttonLogIn')}
        </Button>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
