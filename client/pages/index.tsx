import React, {useEffect, useState} from 'react';

function index() {
  useEffect(() => {
    fetch('http://localhost:8080/tracks/200')
      .then(
      data => {
        console.log(data.json());
      }
    );
  }, []);
  
  return (
    <div>
      AMORG
    </div>
  )
}

export default index;
