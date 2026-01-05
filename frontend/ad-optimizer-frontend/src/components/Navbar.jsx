import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">AdOptimizer</div>

      <div className="nav-links">
        <NavLink to="/" end className="nav-link">
          Home
        </NavLink>
        <NavLink to="/analyze" className="nav-link">
          Analyze
        </NavLink>
        <NavLink to="/strategies" className="nav-link">
          Strategies
        </NavLink>
        
      </div>
    </nav>
  );
}

export default Navbar;
