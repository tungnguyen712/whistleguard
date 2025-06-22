import './styles/StepProgressBar.css';

const StepProgressBar = ({ step }) => {
  // step is 0-based
  return (
    <div className="progressbar-wrapper">
      <div className="progressbar-step">
        <div className={`progressbar-circle ${step >= 0 ? 'active' : ''}`}>1</div>
        <div className={`progressbar-bar ${step > 0 ? 'filled' : step === 0 ? 'half' : ''}`}></div>
      </div>
      <div className="progressbar-step">
        <div className={`progressbar-circle ${step >= 1 ? 'active' : ''}`}>2</div>
        <div className={`progressbar-bar ${step > 1 ? 'filled' : step === 1 ? 'half' : ''}`}></div>
      </div>
      <div className="progressbar-step">
        <div className={`progressbar-circle ${step >= 2 ? 'active' : ''}`}>3</div>
      </div>
    </div>
  );
};

export default StepProgressBar;