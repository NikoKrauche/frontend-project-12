import routes from '../routes.js';

const Navigation = () => (
  <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
    <div className="container">
      <a className="navbar-brand" href={routes.mainPath()}>
        Hexlet Chat
      </a>
    </div>
  </nav>
);

export default Navigation;
