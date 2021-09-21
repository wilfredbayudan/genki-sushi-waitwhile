import React from 'react';

function Card ({ title, fullWidth, children }) {
  return (
    <section className={fullWidth ? 'fullWidth' : ''}>
      <h2>{title}</h2>
      {children}
    </section>
  )
}

export default Card;