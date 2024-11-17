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
  console.log(prop.prop[0]);
  return (
    <div>
      <Part part={prop.prop[0].name} ex={prop.prop[0].exercises} />
      <Part part={prop.prop[1].name} ex={prop.prop[1].exercises} />
      <Part part={prop.prop[2].name} ex={prop.prop[2].exercises} />
    </div>
  );
};

const Total = (prop) => {
  console.log(prop);
  return (
    <p>
      Number of exercises{' '}
      {prop.total[0].exercises +
        prop.total[1].exercises +
        prop.total[2].exercises}
    </p>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />

      <Content prop={course.parts} />

      <Total total={course.parts} />
    </div>
  );
};

export default App;
