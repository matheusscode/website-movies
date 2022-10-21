import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiCameraMovie, BiSearchAlt2 } from "react-icons/bi";

import "./style.css";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search) return;

    navigate(`/search?q=${search}`, { replace: true });
    setSearch("");
  };

  return (
    <nav id="navbar">
      <Link className="logo-title" to="/">
        <BiCameraMovie className="logo-icon" /> CentralHD
      </Link>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Busque um filme"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button type="submit">
          <BiSearchAlt2 />
        </button>
      </form>
      <div className="navigation">
        <Link className="link" to="/">
          {" "}
          Home
        </Link>
        <Link className="link" to="/favoritos">
          Filmes Salvos
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
