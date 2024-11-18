import { useState } from 'react';

const Button = (prop) => <button onClick={prop.atClick}>{prop.value}</button>;

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  let feedsRay = ['good', 'neutral', 'bad'];

  const calcPositive = () => {
    let x = good / total;
    return x;
  };

  const calcAverage = () => {
    let neutx = good - bad;
    return neutx / total;
  };

  return (
    <div>
      <h1>feedback</h1>
      <Button
        value={feedsRay[0]}
        atClick={() => {
          setGood(good + 1);
          setTotal(total + 1);
        }}
      />
      <Button
        value={feedsRay[1]}
        atClick={() => {
          setNeutral(neutral + 1);
          setTotal(total + 1);
        }}
      />
      <Button
        value={feedsRay[2]}
        atClick={() => {
          setBad(bad + 1);
          setTotal(total + 1);
        }}
      />
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>total {total} </p>
      <p>average: {total > 0 ? calcAverage().toFixed(12) : 0} </p>
      <p>positive: {total > 0 ? `${calcPositive().toFixed(12)} %` : 0} </p>
    </div>
  );
};

export default App;
