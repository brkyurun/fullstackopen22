import { useState } from "react";

const Button = ({ onClick, content }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: ".5rem 1.5rem",
        backgroundColor: "dodgerblue",
        color: "white",
        fontSize: "1.125rem",
        border: "none",
        borderRadius: ".25rem",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.4)",
        cursor: "pointer",
      }}
    >
      {content}
    </button>
  );
};

const Rating = ({ rating, count }) => {
  return (
    <p
      style={{
        fontSize: "1.125rem",
        fontFamily: "sans-serif",
        margin: ".25rem 0",
      }}
    >
      {rating} : {count}
    </p>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickFactory = (state, stateSetter) => () =>
    stateSetter(state + 1);

  return (
    <div>
      <h1>Give feedback</h1>
      <div style={{ display: "flex", gap: ".5rem", marginBlockEnd: "1rem" }}>
        <Button onClick={handleClickFactory(good, setGood)} content="Good" />
        <Button
          onClick={handleClickFactory(neutral, setNeutral)}
          content="Neutral"
        />
        <Button onClick={handleClickFactory(bad, setBad)} content="Bad" />
      </div>
      <Rating rating="good" count={good} />
      <Rating rating="neutral" count={neutral} />
      <Rating rating="bad" count={bad} />
    </div>
  );
}

export default App;
