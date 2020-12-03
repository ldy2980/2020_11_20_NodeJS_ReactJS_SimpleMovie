import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  useEffect(() => {
    let variables = {
      userFrom,
      movieId
    };

    Axios.post('/api/favorite/favoriteNumber', variables).then((response) => {
      //console.log(response.data);
      setFavoriteNumber(response.data.favoriteNumber);
      if (response.data.success) {
      } else {
        alert('정보를 가져오는 데 실패하였습니다.');
      }
    });

    Axios.post('/api/favorite/favorited', variables).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        setFavorited(response.data.favorited);
      } else {
        alert('정보를 가져오는 데 실패하였습니다.');
      }
    });
  }, []);

  return (
    <div>
      <button>
        {Favorited ? 'Not Favorite' : 'Add to Favorite'} {FavoriteNumber}
      </button>
    </div>
  );
}

export default Favorite;
