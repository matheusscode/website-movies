import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
} from "react-icons/bs";
import "./styles.css";
import MovieCard from "../../components/MovieCard";
import { toast } from "react-toastify";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setMovie(data);
  };

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}?${apiKey}`;
    getMovie(movieUrl);
  }, []);

  const saveMovie = () => {
    const myList = localStorage.getItem("@primehd");

    let savedMovies = JSON.parse(myList) || [];

    const hasMovie = savedMovies.some(
      (savedmovie) => savedmovie.id === movie.id
    );

    if (hasMovie) {
      toast.warn("ESTE FILME JÁ ESTA NA LISTA!");
      return;
    }

    savedMovies.push(movie);
    localStorage.setItem("@primehd", JSON.stringify(savedMovies));
    toast.success("FILME SALVO COM SUCESSO!");
  };

  return (
    <div className="movie-page">
      {movie && (
        <div className="movie-page-container">
          <div className="card-container">
            <MovieCard movie={movie} showLink={false} />
          </div>

          <div className="about-movie">
            <p className="tagline">{movie.tagline || "Titulo do filme"}</p>
            <div className="info">
              <h2>
                <BsWallet2 /> Orçamento:
              </h2>
              <p>{formatCurrency(movie.budget)}</p>
            </div>
            <div className="info">
              <h2>
                <BsGraphUp /> Receita:
              </h2>
              <p>{formatCurrency(movie.revenue)}</p>
            </div>
            <div className="info">
              <h2>
                <BsHourglassSplit /> Duração:
              </h2>
              <p>{movie.runtime}</p>
            </div>
            <div className="info description">
              <h2>
                <BsFillFileEarmarkTextFill /> Sinopse:
              </h2>
              <p>{movie.overview}</p>

              <div className="buttons">
                <button>
                  {" "}
                  <a
                    target="_blank"
                    rel="external"
                    href={`https://youtube.com/results?search_query=${movie.title} Trailer`}
                  >
                    Ver Trailer
                  </a>
                </button>
                <button onClick={saveMovie}>Salvar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
