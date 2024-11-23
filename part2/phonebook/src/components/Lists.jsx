const Lists = (prop) => {
  return (
    <ul>
      {prop.obj.map((el, i) => (
        <li key={i}>
          {el.name} {el.number}
          <button
            onClick={() => {
              prop.delete(el.name, el.id);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Lists;
