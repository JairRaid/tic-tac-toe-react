import iconX from "../assets/icon-x.svg";
import iconO from "../assets/icon-o.svg";

function NewGame({
  ngClass,
  onSelectX,
  onSelectO,
  markClassX,
  markClassO,
  onStartGameVsCPU,
  onStartGameVsPLAYER,
}) {
  return (
    <>
      <section className={ngClass}>
        <div className="mark-container-header">
          <img src={iconX} alt="x mark icon" />
          <img src={iconO} alt="o mark icon" />
        </div>
        <div className="choose-mark">
          <h1>Pick player 1's mark</h1>
          <div className="mark-container">
            <div className={markClassX} onClick={onSelectX}>
              <img src={iconX} alt="x mark icon" />
            </div>
            <div className={markClassO} onClick={onSelectO}>
              <img src={iconO} alt="o mark icon" />
            </div>
          </div>
          <p>Remember : X goes first</p>
        </div>

        <div className="buttons-container">
          <button id="vs-cpu" onClick={onStartGameVsCPU}>
            New Game (vs CPU)
          </button>
          <button id="vs-player" onClick={onStartGameVsPLAYER}>
            New Game (vs player)
          </button>
        </div>
      </section>
    </>
  );
}

export default NewGame;
