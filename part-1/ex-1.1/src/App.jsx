import { useState } from 'react';

const Button = (prop) => <button onClick={prop.atClick}>{prop.value}</button>;

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  let feedsRay = ['good', 'neutral', 'bad'];

  return (
    <div>
      <h1>feedback</h1>
      <Button
        value={feedsRay[0]}
        atClick={() => {
          setGood(good + 1);
        }}
      />
      <Button
        value={feedsRay[1]}
        atClick={() => {
          setNeutral(neutral + 1);
        }}
      />
      <Button
        value={feedsRay[2]}
        atClick={() => {
          setBad(bad + 1);
        }}
      />
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  );
};

export default App;
