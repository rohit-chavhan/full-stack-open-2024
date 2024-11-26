const UnLists = ({ ray }) => (
  <ul>
    {ray.map((el, i) => (
      <li key={i}>{el}</li>
    ))}
  </ul>
);

export default UnLists;
