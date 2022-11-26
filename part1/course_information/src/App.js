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
  return (
    <div>
      <Part partName={props.firstPart} partExercises={props.firstExercises} />
      <Part partName={props.secondPart} partExercises={props.secondExercises} />
      <Part partName={props.thirdPart} partExercises={props.thirdxercises} />
    </div>
  );
};

const Total = (props) => {
  return <p>Number of exercises {props.totalExercises}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header title={course} />
      <Content
        firstPart={part1}
        firstExercises={exercises1}
        secondPart={part2}
        secondExercises={exercises2}
        thirdPart={part3}
        thirdxercises={exercises3}
      />
      <Total totalExercises={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

export default App;
