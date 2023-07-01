import React, { useEffect, useState } from "react";
import "./App.css";


function App() {
  const [itemsInPersonCart, setItemsInPersonCart] = useState(0);
  const [lines, setLines] = useState([[10, 5, 2], [2], [2], [1], [5]]);

  function addPersonToLine(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let leastItemsAmoutn = 1e9;
    let lineWithLeast: number[] | undefined = undefined;

    for (let line of lines) {
      const totalInLine = line.reduce((sum, value) => sum + value, 0);
      if (totalInLine < leastItemsAmoutn) {
        leastItemsAmoutn = totalInLine;
        lineWithLeast = line;
      }
    }
    if (!lineWithLeast) return;

    setLines((preLines) =>
      preLines.map((line) => {
        if (line === lineWithLeast) {
          return [...line, itemsInPersonCart];
        } else {
          return line;
        }
      })
    );

    setItemsInPersonCart(0);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setLines((prevLines) => {
        return prevLines.map((line) => {
          return [line[0] - 1, ...line.slice(1)].filter(value => value >= 0)
        });
      });
    }, 1000 / 2);
    return clearInterval(interval);
  });
  return (
    <div className="App">
      <form onSubmit={addPersonToLine} className="form">
        <label>ENTER AMOUNT</label>
        <input
          required
          onChange={(e) => setItemsInPersonCart(e.currentTarget.valueAsNumber)}
          type="number"
          value={itemsInPersonCart}
        ></input>
        <button type="submit">ADD TO SHOPPING CART</button>
      </form>
      <div className="checkout_container">
        {lines.map((line, idx) => (
          <div key={idx}>
            {line.map((numberOfItems) => (
              <div>{numberOfItems}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
