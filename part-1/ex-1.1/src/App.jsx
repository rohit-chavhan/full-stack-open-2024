const Header = (prop) => {
  return <h1>{prop.course}</h1>;
};

const Part = (prop) => {
  console.log(prop);
  return (
    <p>
      {prop.part} {prop.ex}
    </p>
  );
};

const Content = (prop) => {
  console.log(prop);
  return (
    <div>
      <Part part={prop.part1} ex={prop.ex1} />
      <Part part={prop.part2} ex={prop.ex2} />
      <Part part={prop.part3} ex={prop.ex3} />
    </div>
  );
};

const Total = (prop) => {
  console.log(prop);
  return <p>Number of exercises {prop.one + prop.two + prop.three}</p>;
};

const App = () => {
  const course = 'Half Stack application development';

  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10,
  };
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7,
  };
  const part3 = {
    name: 'State of a component',
    exercises: 14,
  };

  return (
    <div>
      <Header course={course} />

      <Content
        part1={part1.name}
        ex1={part1.exercises}
        ex2={part2.exercises}
        ex3={part3.exercises}
        part2={part2.name}
        part3={part3.name}
      />

      <Total
        one={part1.exercises}
        two={part2.exercises}
        three={part3.exercises}
      />
    </div>
  );
};

export default App;
