import './styles/Sidebar.css';
import { UploadIcon, StatusIcon, StorageIcon, ShieldIcon } from '../../assets/icons';
import BurgerIcon from '../../assets/images/burger.svg';

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <ShieldIcon alt="WhistleGuard Logo" className="sidebar-logo" />
        <h1 className="sidebar-title">WhistleGuard</h1>
      </div>
      <ul className="sidebar-menu">
        <li>
          <a href="/user/submission-form" className="sidebar-item">
            <UploadIcon alt="Submit Icon" className="sidebar-icon" />
            Submit a Report
          </a>
        </li>
        <li>
          <a href="/user/report-status" className="sidebar-item">
            <StatusIcon alt="Status Icon" className="sidebar-icon" />
            Report Status
            {/* <span className="sidebar-arrow">›</span> */}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;