import './index.css'

export default function App() {
  function Square() {
    return (
      <button className="square">
        
      </button>
    );
  }


  return (
    <>
      <div className="board">
        <div className="row">
          <Square />
          <Square />
          <Square />
        </div>
        <div className="row">
          <Square />
          <Square />
          <Square />
        </div>
        <div className="row">
          <Square />
          <Square />
          <Square />
        </div>
      </div>
    </>
  );
}