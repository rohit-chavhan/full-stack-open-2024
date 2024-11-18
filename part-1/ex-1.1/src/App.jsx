import { useState } from 'react';

const Button = (prop) => <button onClick={prop.atClick}>{prop.value}</button>;

// eslint-disable-next-line react/prop-types
const Stats = ({ text, total, calc, sym }) => {
  if (total > 0) {
    return (
      <p>
        {text}: {total > 0 ? calc().toFixed(12) : 0} {sym}
      </p>
    );
  }
};

// eslint-disable-next-line react/prop-types
const StatisticLine = ({ Titles, total, reviews }) => {
  if (total > 0) {
    return (
      <>
        <p>
          {Titles[0]} {reviews[0]}
        </p>
        <p>
          {Titles[1]}
          {reviews[1]}
        </p>
        <p>
          {Titles[2]}
          {reviews[2]}
        </p>
      </>
    );
  }
  return <p>No feedback given</p>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  let feedsRay = ['good', 'neutral', 'bad'];
  let statRay = ['average', 'positive'];

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
      </div>

      <StatisticLine
        Titles={feedsRay}
        total={total}
        reviews={[good, neutral, bad]}
      />

      <Stats text={statRay[0]} total={total} calc={calcAverage} sym={''} />
      <Stats text={statRay[1]} total={total} calc={calcPositive} sym={'%'} />
    </div>
  );
};

export default App;
