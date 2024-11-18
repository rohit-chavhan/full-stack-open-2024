/* eslint-disable react/prop-types */
import { useState } from 'react';

const Button = (prop) => <button onClick={prop.atClick}>{prop.value}</button>;

const StatisticLine = ({
  Titles,
  total,
  reviews,
  doMathFunc,
  logicMathNames,
}) => {
  console;
  if (total > 0) {
    return (
      <>
        <div>
          <table>
            <tbody>
              <tr>
                <td>{Titles[0]}</td>
                <td>{reviews[0]}</td>
              </tr>
              <tr>
                <td>{Titles[1]}</td>
                <td>{reviews[1]}</td>
              </tr>
              <tr>
                <td>{Titles[2]}</td>
                <td>{reviews[2]}</td>
              </tr>
              <tr>
                <td>{logicMathNames[0]}:</td>
                <td>{doMathFunc[0]().toFixed(1)}</td>
              </tr>
              <tr>
                <td>{logicMathNames[1]}:</td>
                <td>{doMathFunc[1]().toFixed(1)} </td>
              </tr>
            </tbody>
          </table>
        </div>
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

  const calcAverage = () => {
    let neutx = good - bad;
    return neutx / total;
  };

  const calcPositive = () => {
    let x = good / total;
    return x * 100;
  };

  let feedsRay = ['good', 'neutral', 'bad'];
  let statRay = ['average', 'positive'];
  let calcFunctions = [calcAverage, calcPositive];

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
      <StatisticLine
        Titles={feedsRay}
        total={total}
        reviews={[good, neutral, bad]}
        doMathFunc={calcFunctions}
        logicMathNames={statRay}
      />
    </div>
  );
};

export default App;
