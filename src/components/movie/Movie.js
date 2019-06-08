import React, { useState } from 'react';
import hxh from '../../images/hunterxhunter.jpg';
import './Movie.scss';
import LikeSvg from './LikeSvg';
import user from '../../images/user.svg';
import StarSvg from './StarSvg';

const Movie = () => {
  const [liked, setLiked] = useState(false);

  const hitLike = () => {
    setLiked(true);
  }

  const toggleLike = () => {
    setLiked(!liked);
  }

  return (
    <article className="movie">
      <header className="movie__header">
        <a href="#" className="movie__userAvatarLink">
          <img src={user} alt="Yurio's avatar" className="image avatar avatar_size_med"/>
        </a> {/* User's avatar */}
        <a href="#" className="movie__userNameLink">Yurio</a> {/* User's name */}
      </header> {/* Header */}

      <button 
        className="button movie__imageButton" 
        type="button"
        onDoubleClick={hitLike}
        onMouseDown={(e) => e.preventDefault()} 
      >
        <img src={hxh} className="image movie__image"/>
      </button> {/* Movie image */}
      <h4 className="movie__name">Hunter x Hunter</h4> {/* Movie name */}
      <span className="movie__genre">Animation, Adventure</span> {/* Genre */}
      <ul className="list movie__starList">
      {
        Array(5).fill(null).map((e, i) => (
          <li className="movie__starItem" key={i}>
            <StarSvg />
          </li>
        ))
      }
      </ul> {/* Rating */}
      <p className="movie__review">
        Fugit enim veniam mollitia ea illum voluptatem fuga aperiam. Esse dolorem nobis autem fuga non.
      </p> {/* Review */}
      <button 
        type="button"
        onClick={toggleLike}
        onMouseDown={(e) => e.preventDefault()} 
        className="button movie__likeButton"
      >
        <LikeSvg clicked={liked} />
      </button> {/* Like */}
      <p className="movie__likeNumber">
        <a className="movie__liker" href="#">Mohamed</a> and <a className="movie__otherLikers" href="#">5 others</a> liked your post.
      </p> {/* Likes Number */}

      <footer className="movie__footer">
        <time className="movie__time">28 minutes ago</time>
      </footer> {/* Time */}
    </article>
  );
}

export default Movie;