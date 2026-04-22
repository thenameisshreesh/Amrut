import { useState } from "react";
import { Search, MapPin, Phone, FileText, Calendar, Activity, Eye } from "lucide-react";
import "../styles/VetRecords.css";

export default function VetRecords() {
  const [activeTab, setActiveTab] = useState("all");

  const vetData = [
    {
      id: "V001",
      name: "Dr. Amit Sharma",
      phone: "+91 98765 11111",
      location: "Shivajinagar",
      city: "Pune, Maharashtra",
      registration: "MH-VET-2020-1234",
      specialization: "Large Animals",
      totalVisits: 145,
      activeVisits: 8,
      lastInspection: "18/12/2025",
      documents: 3,
      verifiedDocs: 3,
      status: "Verified"
    }
  ];

  const activityData = [
    {
      id: "V001",
      name: "Dr. Amit Sharma",
      recentActivity: "Farm visit logged",
      timestamp: "2 hours ago",
      location: "Wakad Farm #234",
      action: "Treatment prescribed",
      details: "Antibiotic: Amoxicillin 500mg"
    }
  ];

  const handleViewDocuments = (vetId: string) => {
    alert(`Opening documents for ${vetId}`);
  };

  return (
    <div className="vet-records-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Veterinarian Records</h1>
          <p className="page-subtitle">Monitor and manage all registered veterinarians in the system</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="vet-stats">
        <div className="stat-card-mini">
          <div className="stat-icon-mini total">
            <FileText size={20} />
          </div>
          <div>
            <div className="stat-label">Total Vets</div>
            <div className="stat-value-mini">1</div>
          </div>
        </div>

        <div className="stat-card-mini">
          <div className="stat-icon-mini verified">
            <FileText size={20} />
          </div>
          <div>
            <div className="stat-label">Verified</div>
            <div className="stat-value-mini">1</div>
          </div>
        </div>

        <div className="stat-card-mini">
          <div className="stat-icon-mini pending">
            <FileText size={20} />
          </div>
          <div>
            <div className="stat-label">Pending</div>
            <div className="stat-value-mini">0</div>
          </div>
        </div>

        <div className="stat-card-mini">
          <div className="stat-icon-mini visits">
            <Calendar size={20} />
          </div>
          <div>
            <div className="stat-label">Total Visits</div>
            <div className="stat-value-mini">145</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="vet-tabs">
        <button
          className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          <FileText size={18} />
          All Vets
        </button>
        <button
          className={`tab-btn ${activeTab === "activity" ? "active" : ""}`}
          onClick={() => setActiveTab("activity")}
        >
          <Activity size={18} />
          Activity Monitoring
        </button>
      </div>

      {/* Search and Filters */}
      <div className="search-filter-section">
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="Search by vet name, ID, phone, or registration number..." />
        </div>
        <div className="filter-group">
          <select className="filter-select">
            <option>All Status</option>
            <option>Verified</option>
            <option>Pending</option>
          </select>
          <select className="filter-select">
            <option>All Districts</option>
            <option>Pune</option>
            <option>Mumbai</option>
          </select>
        </div>
      </div>

      {/* All Vets Table */}
      {activeTab === "all" && (
        <div className="vet-table-container">
          <table className="vet-table">
            <thead>
              <tr>
                <th>VET ID</th>
                <th>NAME & CONTACT</th>
                <th>LOCATION</th>
                <th>REGISTRATION NO.</th>
                <th>SPECIALIZATION</th>
                <th>VISITS</th>
                <th>LAST INSPECTION</th>
                <th>DOCUMENTS</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {vetData.map((vet) => (
                <tr key={vet.id}>
                  <td>
                    <span className="vet-id-badge">{vet.id}</span>
                  </td>
                  <td>
                    <div className="vet-info">
                      <strong>{vet.name}</strong>
                      <div className="contact-row">
                        <Phone size={12} /> {vet.phone}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="location-info">
                      <MapPin size={14} /> {vet.location}
                      <span className="city-text">{vet.city}</span>
                    </div>
                  </td>
                  <td>{vet.registration}</td>
                  <td>
                    <span className="specialization-badge">{vet.specialization}</span>
                  </td>
                  <td>
                    <div className="visits-info">
                      <strong>{vet.totalVisits} Visits</strong>
                      <span className="active-count">{vet.activeVisits} active</span>
                    </div>
                  </td>
                  <td>
                    <div className="inspection-date">
                      <Calendar size={14} /> {vet.lastInspection}
                    </div>
                  </td>
                  <td>
                    <div className="docs-info-with-btn">
                      <div className="docs-text">
                        <FileText size={14} /> {vet.documents} docs
                        <span className="verified-docs">{vet.verifiedDocs} verified</span>
                      </div>
                      <button 
                        className="btn-view-docs"
                        onClick={() => handleViewDocuments(vet.id)}
                      >
                        <Eye size={14} /> View
                      </button>
                    </div>
                  </td>
                  <td>
                    <span className="status-badge verified">{vet.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Activity Monitoring Table */}
      {activeTab === "activity" && (
        <div className="vet-table-container">
          <table className="vet-table">
            <thead>
              <tr>
                <th>VET ID</th>
                <th>NAME</th>
                <th>RECENT ACTIVITY</th>
                <th>TIMESTAMP</th>
                <th>LOCATION</th>
                <th>ACTION</th>
                <th>DETAILS</th>
              </tr>
            </thead>
            <tbody>
              {activityData.map((activity) => (
                <tr key={activity.id}>
                  <td>
                    <span className="vet-id-badge">{activity.id}</span>
                  </td>
                  <td>
                    <strong>{activity.name}</strong>
                  </td>
                  <td>
                    <span className="activity-badge">{activity.recentActivity}</span>
                  </td>
                  <td>
                    <span className="timestamp">{activity.timestamp}</span>
                  </td>
                  <td>
                    <div className="location-info">
                      <MapPin size={14} /> {activity.location}
                    </div>
                  </td>
                  <td>
                    <span className="action-badge">{activity.action}</span>
                  </td>
                  <td>{activity.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
