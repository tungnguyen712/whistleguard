import "./styles/Dashboard.css";
import { useState } from 'react';
import { useAuth } from "react-oidc-context";
import { reports } from "../../mock/data";
import BurgerIcon from '../../assets/images/burger.svg';
import { UserIcon, FileIcon, SearchIcon, SignOutIcon } from '../../assets/icons';

const Dashboard = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    };

    const auth = useAuth();

    const handleSignOut = () => {
        auth.removeUser();
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1 className="dashboard-title">Hello Org 👋</h1>

                <div className="dashboard-footer">
                    {isExpanded && (
                        <ul className="dashboard-expandable-menu">
                            <li>
                                <a href="/org/profile-page" className="dashboard-expandable-item">
                                    <UserIcon className="dashboard-icon" alt="User Icon" />
                                    Profile Page
                                </a>
                            </li>
                            <li>
                                <button className="dashboard-expandable-item signout-button" onClick={handleSignOut}>
                                    <SignOutIcon className="dashboard-icon" alt="Sign Out Icon" />
                                    Sign Out
                                </button>
                            </li>
                        </ul>
                    )}

                    <div className={`dashboard-user ${isExpanded ? 'expanded' : ''}`} onClick={toggleExpand}>
                        <div className="dashboard-user-icon">
                            <img src={BurgerIcon} alt="Burger Icon" className="burger-image" />
                        </div>
                        <span className="dashboard-user-name">Anonymous Burger</span>
                        <span className="dashboard-dropdown-arrow">{isExpanded ? '▲' : '▼'}</span>
                    </div>
                </div>
            </header>

            <div className="dashboard-summary">
                <div className="summary-card">
                    <div className="summary-card-header">
                    <p>Total Reports Received</p>
                    <span className="summary-change positive">+10.0%</span>
                    </div>
                    <h2>856</h2>
                    <h3>Reports</h3>
                </div>

                <div className="summary-card">
                    <div className="summary-card-header">
                    <p>Total Reports Resolved</p>
                    <span className="summary-change negative">-7.0%</span>
                    </div>
                    <h2>412</h2>
                    <h3>Reports</h3>
                </div>
            </div>
            <main className="dashboard-main">
                <div className="reports-header">
                    <h2>All Reports</h2>
                    <div className="reports-actions">
                    <div className="search-container">
                        <span className="search-icon">
                            <SearchIcon alt="Search Icon" />
                        </span>
                        <input type="text" placeholder="Search" className="search-input" />
                    </div>

                    <select className="sort-select">
                        <option value="date">Sort by: Date</option>
                        <option value="category">Sort by: Category</option>
                    </select>
                    </div>
                </div>
                <table className="reports-table">
                    <thead>
                        <tr>
                            <th>Date Received</th>
                            <th>Category</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Evidence</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {reports.map((report) => (
                        <tr key={report.id}>
                        <td>{report.dateReceived}</td>
                        <td>{report.category}</td>
                        <td>{report.title}</td>
                        <td>{report.description}</td>
                        <td>
                            <FileIcon alt="File Icon" />
                        </td>
                        <td>
                            <span className={`status ${report.status.toLowerCase().replace(" ", "-")}`}>
                            {report.status}
                            </span>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <button className="page-button">1</button>
                    <button className="page-button">2</button>
                    <button className="page-button">3</button>
                    <span>...</span>
                    <button className="page-button">5</button>
                </div>
            </main>
        </div>
        );
    };

export default Dashboard;