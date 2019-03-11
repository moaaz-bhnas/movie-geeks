import React from 'react';
import PropTypes from 'prop-types';

const MobileSignedOutLinks = React.forwardRef((props, refs) => {
  const {firstSideNavLink, lastSideNavLink} = refs;

  return (
    <React.Fragment>
      <li className="mobileNavMenu__item">
        <a 
          ref={firstSideNavLink} 
          href="" 
          className="mobileNavMenu__link"
        >Sign Up</a>
      </li>
      <li className="mobileNavMenu__item">
        <a 
          ref={lastSideNavLink} 
          href="" 
          className="mobileNavMenu__link"
        >Sign In</a>
      </li>
    </React.Fragment>
  );
})

MobileSignedOutLinks.propTypes = {
  navSidebarOpened: PropTypes.bool
}

export default MobileSignedOutLinks;