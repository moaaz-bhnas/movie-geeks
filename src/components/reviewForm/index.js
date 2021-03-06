import React, { memo, useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import MoviesResults from './components/moviesResults';
import ReactStars from '../reactStars';
import Star from '../../svgs/star';
import { addMovie } from '../../store/actions/movieActions';
import { connect } from 'react-redux';
import { AuthContext } from '../../contexts/auth';

import { 
  Form,
  Title,
  MovieNameInputContainer,
  MovieNameInput,
  FormBody,
  Overlay,
  ReviewInput,
  SubmitButton
} from './style';

const ReviewForm = ({ username, addMovie }) => {
  const { user: { email } } = useContext(AuthContext);

  const [ formFocused, setFormFocused ] = useState(false);
  const [ movies, setMovies ] = useState([]);
  const [ movieName, setMovieName ] = useState('');
  const [ movieId, setMovieId ] = useState(null);
  const [ rating, setRating ] = useState(0);
  const [ review, setReview ] = useState('');

  useEffect(function fetchMovies() {
    if (movieName === '') return;
    
    const apiKey = process.env.REACT_APP_TMDB_API_KEY;
    axios.get(`https://api.themoviedb.org/3/search/multi?query=${movieName}&api_key=${apiKey}`)
    .then(response => {
      setMovies(response.data.results)
    });
  }, [ movieName ]);

  const handleMovieNameInputChange = useCallback(event => {
    const { target: { value } } = event;

    setMovieName(value);
    const movie = movies.find(movie => value.includes(movie.name || movie.title));
    setMovieId(movie ? movie.id : null);
  });

  const handleMovieNameInputKeyDown = useCallback((event) => {
    const { key, shiftKey } = event;
    if (shiftKey && key === 'Tab') setFormFocused(false);
  }, []);

  const handleSubmitButtonKeyDown = useCallback((event) => {
    const tabKeyHit = event.keyCode === 9;
    if (tabKeyHit) {
      setFormFocused(false);
    }
  }, [ review ]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    const user = { name: username, email };
    const movie = { id: movieId, rating, review };

    addMovie(user, movie);

    resetForm();
    setFormFocused(false);
  }, [ movieId, rating, review ])

  const resetForm = useCallback(() => {
    setMovieName('');
    setMovieId(null);
    setRating(0);
    setReview('');
  }, [])
   
  return (
    <>
      <Overlay 
        data-form-focused={formFocused} 
        role="presentation" 
        onClick={() => setFormFocused(false)}
      />

      <Form 
        data-focused={formFocused}
        onSubmit={handleSubmit}
      >
        <Title>Review Movie</Title>

        <FormBody>
          <MovieNameInputContainer>
            <MovieNameInput 
              aria-label="movie name"
              placeholder="Type the movie name .."
              value={movieName}
              onChange={handleMovieNameInputChange}
              onFocus={() => setFormFocused(true)}
              onKeyDown={handleMovieNameInputKeyDown}
              list="reviewForm__moviesResults"
              required
            />

            <MoviesResults movies={movies.slice(0, 10)} />
          </MovieNameInputContainer>

          {formFocused && <><ReactStars
            size={32}
            count={5}
            half={true}
            emptyIcon={<Star fullness="empty" width="2rem" />}
            halfIcon={<Star fullness="half" width="2rem" />}
            filledIcon={<Star fullness="filled" width="2rem" />}
            value={rating}
            onChange={newRating => setRating(newRating)}
            className="reviewForm__ratingStars"
          />

          <ReviewInput
            aria-label="Add a review"
            placeholder="Add a review..."
            value={review}
            onChange={event => setReview(event.target.value)}
            required
          />

          <SubmitButton 
            type="submit"
            onKeyDown={handleSubmitButtonKeyDown}
          >Submit</SubmitButton></>}
        </FormBody>
      </Form>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    username: state.firebase.profile.username
  };
}

const mapDispatchToProps = (dipatch) => {
  return {
    addMovie: (user, movie) => dipatch(addMovie(user, movie))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(ReviewForm));