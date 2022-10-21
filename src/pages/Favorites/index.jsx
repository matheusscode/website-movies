import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./styles.css";

export const Favorites = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const myList = localStorage.getItem("@primehd");
    setMovies(JSON.parse(myList) || []);
  }, []);

  const deleteMovie = (id) => {
    let filterMovie = movies.filter((item) => {
      return item.id !== id;
    });

    setMovies(filterMovie);
    localStorage.setItem("@primehd", JSON.stringify(filterMovie));
    toast.success("FILME REMOVIDO COM SUCESSO");
  };

  return (
    <div className="container-favorites">
      <h1>Meus Filmes:</h1>

      {movies.length === 0 && (
        <span className="empty-title">Sua Lista esta fazia.</span>
      )}

      <ul>
        {movies.map((item) => {
          return (
            <li key={item.id}>
              <span>{item.title}</span>
              <div>
                <Link className="show-movie-details" to={`/movie/${item.id}`}>
                  Ver Detalhes
                </Link>
                <button onClick={() => deleteMovie(item.id)}>Excluir</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
