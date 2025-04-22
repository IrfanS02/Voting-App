import React from 'react';
import Spinner from '../assets/loading.png';

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-spinner">
        <img src={Spinner} alt="Loading..." />
      </div>
    </div>
  );
};

export default Loader;
