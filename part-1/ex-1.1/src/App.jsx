import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState([
    { value: 0 },
    { value: 0 },
    { value: 0 },
    { value: 0 },
    { value: 0 },
    { value: 0 },
    { value: 0 },
    { value: 0 },
  ]);

  const randomFunc = () => setSelected(Math.floor(Math.random() * 8));

  const calciVotes = () => {
    let x = vote.map((el, i) => {
      return i === selected ? { value: el.value + 1 } : el;
    });
    setVote(x);
  };

  const getHighestVote = () => {
    let shallowRay = [...vote];
    let red = shallowRay.sort((x, y) => y.value - x.value);

    let inde = 0;
    vote.filter((el, i) => {
      if (el.value === red[0].value) {
        inde = i;
        return el;
      }
    });

    setSelected(inde);
  };

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected].value} votes</p>

      <button onClick={randomFunc}>next anecdotes</button>
      <button onClick={calciVotes}>vote</button>
      <button onClick={getHighestVote}>get highest vote anecdotes</button>
    </div>
  );
};

export default App;
