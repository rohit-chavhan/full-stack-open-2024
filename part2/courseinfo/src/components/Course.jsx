const Parts = ({ obj }) => (
  <p>
    {obj.name} {obj.exercises}
  </p>
);

const Content = ({ parts }) => {
  return parts.map((el) => {
    return <Parts key={el.id} obj={el} />;
  });
};

const Header = ({ title }) => <h2> {title} </h2>;

const Sum = ({ parts }) => {
  let newValue = parts.reduce(
    (accu, cureentValue) => cureentValue.exercises + accu,
    0
  );
  return <h3>Tota of {newValue} exercises </h3>;
};

const Course = ({ title, parts }) => {
  return (
    <>
      <Header title={title} />
      <Content parts={parts} />
      <Sum parts={parts} />
    </>
  );
};

export default Course;
