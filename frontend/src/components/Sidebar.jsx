import React, { useState } from 'react';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const [servicesExpanded, setServicesExpanded] = useState(true);
  const [invoicesExpanded, setInvoicesExpanded] = useState(true);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-header-title">
          <div>Vault</div>
          <div className="sidebar-header-subtitle">Anurag Yadav</div>
        </div>
        <div className="sidebar-dropdown">▼</div>
      </div>
      <nav className="sidebar-nav">
        <div className="nav-item">Dashboard</div>
        <div className="nav-item">Nexus</div>
        <div className="nav-item">Intake</div>
        <div className="nav-section">
          <div className="nav-section-header" onClick={() => setServicesExpanded(!servicesExpanded)}>
            Services {servicesExpanded ? '▼' : '▶'}
          </div>
          {servicesExpanded && (
            <div className="nav-section-items">
              <div className="nav-radio">
                <input type="radio" name="services" id="pre-active" />
                <label htmlFor="pre-active">Pre-active</label>
              </div>
              <div className="nav-radio">
                <input type="radio" name="services" id="active" />
                <label htmlFor="active">Active</label>
              </div>
              <div className="nav-radio">
                <input type="radio" name="services" id="blocked" />
                <label htmlFor="blocked">Blocked</label>
              </div>
              <div className="nav-radio">
                <input type="radio" name="services" id="closed" defaultChecked />
                <label htmlFor="closed">Closed</label>
              </div>
            </div>
          )}
        </div>
        <div className="nav-section">
          <div className="nav-section-header" onClick={() => setInvoicesExpanded(!invoicesExpanded)}>
            Invoices {invoicesExpanded ? '▼' : '▶'}
          </div>
          {invoicesExpanded && (
            <div className="nav-section-items">
              <div className="nav-item selected">Proforma Invoices</div>
              <div className="nav-item">Final Invoices</div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
