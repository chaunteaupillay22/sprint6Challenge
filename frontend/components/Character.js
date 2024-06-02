import React, { useState } from 'react';

function Character({ name, birthYear,
   homeworld }) {// ❗ Add the props
  // ❗ Create a state to hold whether the homeworld is rendering or not
  // ❗ Create a "toggle" click handler to show or remove the homeworld
  const [showHomeworld, setShowHomeworld] = useState(false);
  const toggleHomeworld = () => {
    setShowHomeworld(prevState => !prevState);
    console.log(`Toggling homeworld for ${name}: ${!showHomeworld}`);
  };

  return (
    <div className="character-card" onClick={toggleHomeworld}>
      <h1 className="character-name">{name}</h1>
      {showHomeworld && (
        <p className="character-planet">Homeworld: {homeworld}</p>
      )}
    </div>
  )
}
export default Character; 
