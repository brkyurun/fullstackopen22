const Header = ({ course }) => <h2>{course.name}</h2>;

const Total = ({ course }) => {
  const numbers = course.parts.map((part) => part.exercises);
  const total = numbers.reduce((prev, curr) => {
    return prev + curr;
  });
  return <p>total of {total} exercises</p>;
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </div>
);

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total course={course} />
    </div>
  );
};

export default Course;
