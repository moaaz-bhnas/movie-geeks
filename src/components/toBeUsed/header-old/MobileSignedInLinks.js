import React, { memo } from 'react';
import user from '../../images/avatar.svg';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MobileSignedInLinks = React.forwardRef((props, lastInteractiveElement) => {
  const {signOut} = props;

  return (
    <React.Fragment>
      <li className="mobileNavMenu__item">
        <Link
          to='/profile'
          className="mobileNavMenu__link" 
        >
          <img src={user} alt="" className="image avatar avatar_size_small mobileNavMenu__avatar"/>
          <span className="mobileNavMenu__userName">Yurio</span>
        </Link>
      </li>
      <li className="mobileNavMenu__item">
        <a 
          href="#" 
          className="mobileNavMenu__link" 
        >Add Movie</a>
      </li>
      <li className="mobileNavMenu__item">
        <a 
          ref={lastInteractiveElement} 
          href="#" 
          className="mobileNavMenu__link" 
          onClick={signOut}
        >Sign Out</a>
      </li>
    </React.Fragment>
  );
})

MobileSignedInLinks.propTypes = {
  signOut: PropTypes.func
}

export default memo(MobileSignedInLinks);