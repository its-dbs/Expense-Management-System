import React from 'react';

const Loading = () => {
  return (
    <>
       <div classname="d-flex justify-content-center">
          <div classname="spinner-grow text-light" role="status">
            <span classname="visually-hidden">Loading...</span>
          </div>
        </div>

    </>
  );
};

export default Loading;