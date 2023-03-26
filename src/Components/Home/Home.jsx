import React, {useState, useEffect} from 'react'
import "./Home.scss";
import axios from "axios";
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai'; 
import { BsFillPlayFill } from 'react-icons/bs';



const apiKey = "ec6db3189e14e94dbafa834e26a2a6b2";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";



const Card = ({img}) => (
  <img className='card' src={img} alt='cover' />
)

const Row = ({title, arr=[]}) => (
    <div className='row'>
      <h2>{title}</h2>
      
      <div>
      {arr.map((item, index) => (
        <Card key={index} img={`${imgUrl}${item.poster_path}`} />
      ))}
      </div>
    </div>
)

const Home = () => {

  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [allGenre, setAllGenre] = useState([]);


  useEffect(() => {

    const fetchUpcoming = async () => {
      const { data: {results} } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}&page=3`);
      setUpcomingMovies(results);
    };

    const fetchNowPlaying = async () => {
      const { data: {results} } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}&page=2`);
      setNowPlayingMovies(results);
    };

    const fetchPopular = async () => {
      const { data: {results} } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}&page=1`);
      setPopularMovies(results);
    };

    const fetchTopRated = async () => {
      const { data: {results} } = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}&page=1`);
      setTopRatedMovies(results);
    };

    const getAllGenre = async () => {
      const { data: {genres} } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
      setAllGenre(genres);
      console.log(allGenre);
    };


    fetchUpcoming();
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();
    getAllGenre();

  }, [])
  


  return (
    <section className='home'>
      <div className='banner' style={{
        backgroundImage: popularMovies[0] ? `url("${`${imgUrl}/${popularMovies[0].poster_path}`}")` : "rgb(16, 16, 16)"
      }}>

        {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
        {popularMovies[0] && <p>{popularMovies[0].overview}</p>}

        <div>
          <button><BsFillPlayFill /> Play </button>
          <button>My List <AiOutlinePlus /></button>
        </div>

      </div>

      <Row title={"Popular"} arr={popularMovies} />
      <Row title={"Now Playing"} arr={nowPlayingMovies} />
      <Row title={"Upcoming"} arr={upcomingMovies} />
      <Row title={"Top Rated"} arr={topRatedMovies} />
      <Row title={"Dramas"} arr={popularMovies} />
      <Row title={"Only on Netflix"} arr={nowPlayingMovies} />
      <Row title={"New Releases"} arr={upcomingMovies} />
      <Row title={"Released in the Past Year"} arr={topRatedMovies} />

      <div className='genreBox'>
        {allGenre.map((item, index) => (
          <Link key={item.id} to={``}>{item.name}</Link>
        ))}
      </div>
      
    </section>
  )
}

export default Home