function Header(prop) {
  return <h1>{prop.course}</h1>;
}

function Part(prop) {
  return (
    <p>
      {prop.part} {prop.exercise}
    </p>
  );
}

function Content(prop) {
  return (
    <div>
      <Part part={prop.part1} exercise={prop.exercise1} />
      <Part part={prop.part2} exercise={prop.exercise2} />
      <Part part={prop.part3} exercise={prop.exercise3} />
    </div>
  );
}

function Total(prop) {
  return <p>Number of exercises {prop.one + prop.two + prop.three}</p>;
}

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />

      <Content
        part1={part1}
        part2={part2}
        part3={part3}
        exercise1={exercises1}
        exercise2={exercises2}
        exercise3={exercises3}
      />

      <Total one={exercises1} two={exercises2} three={exercises3} />
    </div>
  );
};

export default App;
