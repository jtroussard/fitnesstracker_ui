import LargeTile from "../../../../common/tiles/LargeTile";

const FitnessEntryView = () => {

  return (
    <div>
      <h2>Fitness Journal</h2>
      <div className="row g-3">
        <div className="col-12">
          <LargeTile title="Your Fitness Entires">
            Fitness List Goes Here
          </LargeTile>
        </div>
      </div>
    </div>
  );
};

export default FitnessEntryView;