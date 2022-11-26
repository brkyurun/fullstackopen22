const Header = (props) => {
  return <h1>{props.title}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.partName} {props.partExercises}
    </p>
  );
};

const Content = (props) => {
  let keyNumber = 0;

  return (
    <div>
      {props.parts.map((part) => (
        <Part
          key={keyNumber++}
          partName={part.name}
          partExercises={part.exercises}
        />
      ))}
    </div>
  );
};

const Total = (props) => {
  let total = 0;
  props.parts.forEach((part) => (total += part.exercises));
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header title={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
