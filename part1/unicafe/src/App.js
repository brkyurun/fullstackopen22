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

const StatisticLine = ({ text, count }) => {
  return (
    <p
      style={{
        fontSize: "1.125rem",
        fontFamily: "sans-serif",
        margin: ".25rem 0",
      }}
    >
      {text} : {count}
    </p>
  );
};

const Statistics = ({ good, neutral, bad, average, positiveRating }) => {
  const total = good + neutral + bad;

  if (total === 0 && (average === 0 || positiveRating === 0)) {
    return (
      <div>
        <StatisticLine text="good" count={good} />
        <StatisticLine text="neutral" count={neutral} />
        <StatisticLine text="bad" count={bad} />
        <StatisticLine text="total votes" count={total} />
        <p>No votes cast yet!</p>
      </div>
    );
  }
  return (
    <div>
      <StatisticLine text="good" count={good} />
      <StatisticLine text="neutral" count={neutral} />
      <StatisticLine text="bad" count={bad} />
      <StatisticLine text="total votes" count={total} />
      <p
        style={{
          fontSize: "1.125rem",
          fontFamily: "sans-serif",
          margin: ".25rem 0",
        }}
      >
        average: {average}
      </p>
      <p
        style={{
          fontSize: "1.125rem",
          fontFamily: "sans-serif",
          margin: ".25rem 0",
        }}
      >
        positive rating: {positiveRating}
      </p>
    </div>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [average, setAverage] = useState(0);
  const [positiveRating, setPositiveRating] = useState(0);

  const calculateAverage = () => {
    setAverage((good - bad) / (good + neutral + bad));
  };

  const calculatePositiveRating = () => {
    setPositiveRating((good / (good + neutral + bad)) * 100);
  };

  const handleClickFactory = (state, stateSetter) => () => {
    stateSetter(state + 1);
    calculateAverage();
    calculatePositiveRating();
  };

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
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        average={average}
        positiveRating={positiveRating}
      />
    </div>
  );
}

export default App;
