import React from 'react';

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

function Loader() {
  return (
    <div style={styles.wrapper}>
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h2>Loading...</h2>
    </div>
  );
}

export default Loader;
