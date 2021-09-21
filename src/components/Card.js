import React from 'react';

function Card ( { title, children } ) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  )
}

export default Card;