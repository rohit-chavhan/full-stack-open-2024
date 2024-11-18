import { useState } from 'react';

const Button = (prop) => <button onClick={prop.atClick}>{prop.value}</button>;

// eslint-disable-next-line react/prop-types
const Stats = ({ text, total, calc, sym }) => (
  <p>
    {text}: {total > 0 ? calc().toFixed(12) : 0} {sym}
  </p>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  let feedsRay = ['good', 'neutral', 'bad'];

  const calcPositive = () => {
    let x = good / total;
    return x * 100;
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

      <Stats text={'average'} total={total} calc={calcAverage} sym={''} />
      <Stats text={'positive'} total={total} calc={calcPositive} sym={'%'} />
    </div>
  );
};

export default App;
