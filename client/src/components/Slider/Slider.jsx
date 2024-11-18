import React from 'react'
import './Slider.scss'
import CardSlider from '../CardSlider/CardSlider'
import { useNavigate } from 'react-router-dom';

const Slider = ({ movies }) => {
  const navigate = useNavigate();

  const getMovies = (from, to) => {
    return movies.slice(from, to)
  }

  return (
    <div className='sliderContainer'>

      {movies?.map((item, index) => {
        return (
          <div
            onClick={() => 
                navigate("/addUpdate" , {
                    replace : true,
                    state : item
                })
            }
            key={index} className=''>
            <img  src={`https://image.tmdb.org/t/p/w500${item.image}`} />
            <p className='textTitle'>{item.title}</p>
            <p className='releaseYr'>{'item.RELEAS'}</p>
          </div>
        )
      })

      }
    </div>
  )
}

export default Slider   