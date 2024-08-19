import "../App_module/_app.scss";
import FunFact from "../Fun-fact_module/fact";
import WorldTime from "../Time_module/time";

const App = () => {
 
  return (
    <div>
      <div className="fact">
        <FunFact />
      </div>
      <div className="clock">
        <WorldTime />
      </div>
    </div>
  );
};

export default App;
