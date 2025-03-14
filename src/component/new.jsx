import React, { useReducer } from "react";

// Initial state
const initialState = { count: 0 };

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const Counter = () => {
  // useReducer Hook
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="flex flex-col items-center p-5">
      <h2 className="text-2xl font-bold">Counter: {state.count}</h2>
      <div className="mt-4 flex gap-3">
        <button
          onClick={() => dispatch({ type: "INCREMENT" })}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Increment
        </button>
        <button
          onClick={() => dispatch({ type: "DECREMENT" })}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Decrement
        </button>
        <button
          onClick={() => dispatch({ type: "RESET" })}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
