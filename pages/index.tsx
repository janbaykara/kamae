import { random, sample } from "lodash";
import * as buj from '../data/bujinkan'
import * as React from 'react';

function useHistory<X>(nextState: X) {
  const [history, setHistory] = React.useState<X[]>([]);
  React.useEffect(() => {
    if (nextState !== history[history.length - 1]) {
      setHistory((pastStates) => [...pastStates, nextState]);
    }
  }, [nextState, history]);
  return [history, setHistory] as [typeof history, typeof setHistory];
}

const generateSequence = (steps = 3) => {
  let stepsFilled = 0;
  let newSequence: any = [];
  while (stepsFilled < steps) {
    newSequence.push({
      kamae: sample(buj.kamae),
      direction: sample(buj.direction),
      orientation: sample(buj.orientation),
      height: sample(buj.height),
      strike: sample(buj.strike)
    });
    stepsFilled++;
  }
  return newSequence;
};

export default function App() {
  const [sequence, setSequence] = React.useState(generateSequence(3));
  const [sequenceHistory, setHistory] = useHistory(sequence);

  const changeSequence = () => {
    const steps = random(3, 4);
    setSequence(generateSequence(steps));
  };

  return (
    <div
      className="App px-4 md:px-6 mx-auto my-6 py-6"
      style={{
        maxWidth: 700
      }}
    >
      <div className="flex flex-row justify-between items-start">
        <h1 className="font-bold text-2xl">Practice This</h1>
        <button
          className="px-3 py-1 border text-green-600 border-green-500 rounded-md hover:bg-green-100"
          onClick={changeSequence}
        >
          🎲 New Sequence
        </button>
      </div>
      <Sequence steps={sequence} />
      <hr
        style={{
          margin: 50
        }}
      />
      {sequenceHistory.slice(0, sequenceHistory.length - 1).length > 0 && (
        <div>
          <div className="flex flex-row justify-between items-start">
            <h1 className="font-bold text-2xl">History</h1>
            <button
              className="px-3 py-1 border text-black-600 border-black-500 rounded-md hover:bg-black-100"
              onClick={() => setHistory([])}
            >
              Reset History
            </button>
          </div>
          <pre>
            {sequenceHistory
              .slice(0, sequenceHistory.length - 1)
              .reverse()
              .map((sequence) => (
                <>
                  <Sequence steps={sequence} />
                  <hr className="my-2" />
                </>
              ))}
          </pre>
        </div>
      )}
    </div>
  );
}

function Sequence({ steps }) {
  return (
    <div
      className="grid gap-4 md:gap-6 py-6"
      style={{
        gridTemplateColumns: "auto 100px 1fr"
      }}
    >
      {steps.map((step, i) => {
        return (
          <>
            <div className="font-bold text-4xl text-gray-400 mr-5 flex flex-col justify-center">
              {i + 1}
            </div>
            <div
              className="rounded-md mr-3 bg-gray-200"
              style={{
                width: 100,
                height: 120,
                backgroundImage: `url(${step.kamae.image})`,
                backgroundPosition: "center top",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                filter: "grayscale(100%) contrast(125%)"
              }}
            ></div>
            <div className="flex flex-col justify-center">
              <div>Moving {step.orientation}</div>
              <div>
                Into <b>{step.kamae.name}</b>
              </div>
              <div className="text-gray-500">
                Striking with {step.height} {step.strike}
                <br />
              </div>
              <div className="text-gray-500">{step.direction}</div>
            </div>
          </>
        );
      })}
    </div>
  );
}