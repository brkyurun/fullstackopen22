import { Fragment, useState } from "react";

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
    <>
      {text} : {count}
    </>
  );
};

const Statistics = ({ good, neutral, bad, average, positiveRating }) => {
  const total = good + neutral + bad;

  if (total === 0 && (average === 0 || positiveRating === 0)) {
    return (
      <>
        <table>
          <tbody>
            <tr>
              <td>
                <StatisticLine text="good" count={good} />
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLine text="neutral" count={neutral} />
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLine text="bad" count={bad} />
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLine text="total votes" count={total} />
              </td>
            </tr>
          </tbody>
        </table>
        <p>No votes cast yet!</p>
      </>
    );
  }
  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>
              <StatisticLine text="good" count={good} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="neutral" count={neutral} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="bad" count={bad} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="total votes" count={total} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="average" count={average} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="positive ratings" count={positiveRating} />
            </td>
          </tr>
        </tbody>
      </table>
    </>
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
