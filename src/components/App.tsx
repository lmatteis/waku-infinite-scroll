import { MoreButton } from "./MoreButton.js";

const App = () => {
  return (
    <div className="App">
      <h2>
        Infinite scroll by streaming chunks via recursive renders of React
        Server Components using <a href="https://waku.gg/">Waku</a>
      </h2>
      <p>
        You can find the code explanation{" "}
        <a href="https://twitter.com/asidorenko_/status/1658503766763622400">
          here
        </a>
      </p>
      <MoreButton />
    </div>
  );
};

export default App;
