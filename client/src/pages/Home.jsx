import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar';
import {FaPlay} from 'react-icons/fa'
import {AiOutlineClose, AiOutlineInfoCircle} from 'react-icons/ai'
import '../assets/styles/Home.scss'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, getGenres, getMovieTrailer } from '../store/Slice/movie-slice';
import Slider from '../components/Slider/Slider';
import Loader from '../components/Loader/Loader';
import TrailerModal from '../components/TrailerModal/TrailerModal';
import { GiHamburgerMenu } from 'react-icons/gi';
import Background from '../components/Background/Background';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const genresLoaded = useSelector(state => state.movie.genresLoaded)
  const movies = useSelector(state => state.movie.movies)
  const status = useSelector(state => state.movie.status)
  const [isScrolling, setIsScrolling] = useState(false)
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 60))
  const [isTrailerActive, setTrailerActive] = useState(false)
  const trailer = useSelector(state => state.movie.trailer)


//   useEffect(() => {
//     if(status === 'idle'){
//       dispatch(getGenres())
//     }
//   },[dispatch,status])


//   useEffect(() => {
//     if(genresLoaded){
//       dispatch(fetchMovies({type : "all"}))
//     }
//   },[dispatch,genresLoaded])

//   window.onscroll = () => {
//     setIsScrolling(window.pageYOffset === 0 ? false : true);
//     return () => (window.onscroll = null);
//   }

//   const playTrailer = () => {
//     navigate("/" , {
//       replace : true,
//       state : {
//         movie : movies[randomNumber]
//       }
//     })
//   }

//   const handleModal = async (statu) => {
//     setTrailerActive(statu)
//     dispatch(getMovieTrailer(movies[randomNumber]))
// }



  return (
    <div>

    <Background>
      <h1>hello</h1>
    </Background>

    </div>
  )
}

export default Home