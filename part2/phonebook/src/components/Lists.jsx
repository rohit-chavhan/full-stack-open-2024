const Lists = (prop) => {
  return (
    <ul>
      {prop.obj.map((el, i) => (
        <li key={i}>
          {el.name} {el.number}
        </li>
      ))}
    </ul>
  );
};

export default Lists;
