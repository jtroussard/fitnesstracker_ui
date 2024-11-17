import LargeTile from "../../../../common/tiles/LargeTile";

const NutritionEntryView = () => {
  return (
    <div>
      <h2>Nutrition Log</h2>
      <div className="row g-3">
        <div className="col-12">
          <LargeTile title="Your Meal Entries">
            Nutrition Entries Goes Here
          </LargeTile>
        </div>
      </div>
    </div>
  );
};

export default NutritionEntryView;