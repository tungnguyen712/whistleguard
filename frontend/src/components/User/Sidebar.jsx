import './Sidebar.css';
import { useState } from 'react';
import { UploadIcon, StatusIcon, StorageIcon, UserIcon } from '../../assets/icons';
import BurgerIcon from '../../assets/images/burger.svg';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        {/* <img src="path/to/logo.png" alt="WhistleGuard Logo" className="sidebar-logo" /> */}
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
        <li>
          <a href="/user/token-storage" className="sidebar-item">
            <StorageIcon alt="Token Icon" className="sidebar-icon" />
            Token Storage
            {/* <span className="sidebar-arrow">›</span> */}
          </a>
        </li>
      </ul>
        <div className="sidebar-footer">
            {isExpanded && (
                <ul className="sidebar-expandable-menu">
                <li>
                    <a href="/user/profile-page" className="sidebar-expandable-item">
                        <UserIcon className="sidebar-icon" alt="User Icon" />
                        Profile Page
                    </a>
                </li>
                </ul>
            )}

            <div className={`sidebar-user ${isExpanded ? 'expanded' : ''}`} onClick={toggleExpand}>
                <div className="sidebar-user-icon">
                    <img src={BurgerIcon} alt="Burger Icon" className="burger-image" />
                </div>
                <span className="sidebar-user-name">Anonymous Burger</span>
                <span className="sidebar-dropdown-arrow">{isExpanded ? '▼' : '▲'}</span>
            </div>
        </div>

    </div>
  );
};

export default Sidebar;