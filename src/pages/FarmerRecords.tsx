import React, { useState } from "react";
import {
  Search,
  Filter,
  Users,
  CheckCircle,
  Clock,
  FileText,
  Calendar,
  MapPin,
  Phone,
  PawPrint
} from "lucide-react";

import "../styles/FarmerRecords.css";

type FarmerDocumentStatus = "VERIFIED" | "PENDING" | "REJECTED";

interface FarmerDocument {
  type: string;
  filename: string;
  status: FarmerDocumentStatus;
  uploadDate: string;
}

interface FarmerAnimal {
  id: string;
  tag: string;
  species: string;
  breed: string;
  age: string;
  status: string;
  lastTreatment?: string;
}

interface Farmer {
  id: string;
  name: string;
  phone: string;
  location: string;
  district: string;
  state: string;
  animals: number;
  underTreatment: number;
  compliance: number;
  lastInspection: string;
  status: "Verified" | "Pending";
  registrationDate: string;
  email: string;
  documents: FarmerDocument[];
  animalDetails: FarmerAnimal[];
}

const farmersData: Farmer[] = [
  {
    id: "F001",
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    location: "Kothrud",
    district: "Pune",
    state: "Maharashtra",
    animals: 25,
    underTreatment: 2,
    compliance: 92,
    lastInspection: "20/11/2025",
    status: "Verified",
    registrationDate: "15/01/2023",
    email: "rajesh.kumar@email.com",
    documents: [
      {
        type: "Aadhar Card",
        filename: "aadhar_rajesh_kumar.pdf",
        status: "VERIFIED",
        uploadDate: "10/01/2023"
      },
      {
        type: "PAN Card",
        filename: "pan_rajesh_kumar.pdf",
        status: "VERIFIED",
        uploadDate: "10/01/2023"
      },
      {
        type: "Land Ownership Document",
        filename: "land_ownership_certificate.pdf",
        status: "VERIFIED",
        uploadDate: "12/01/2023"
      },
      {
        type: "Farm Registration Certificate",
        filename: "farm_registration.pdf",
        status: "VERIFIED",
        uploadDate: "14/01/2023"
      }
    ],
    animalDetails: [
      {
        id: "A001",
        tag: "MH-PN-001",
        species: "Cow",
        breed: "HF Cross",
        age: "4.5 years",
        status: "Under treatment",
        lastTreatment: "Oxytetracycline - 10/11/2025"
      },
      {
        id: "A002",
        tag: "MH-PN-002",
        species: "Cow",
        breed: "Jersey",
        age: "3 years",
        status: "Healthy",
        lastTreatment: "Deworming - 01/09/2025"
      }
    ]
  }
  // add more farmers here
];

type ModalMode = "documents" | "animals";

const FarmerRecords: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "verified" | "pending">("all");
  const [districtFilter, setDistrictFilter] = useState<string>("all");

  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>("documents");

  const openModal = (farmer: Farmer, mode: ModalMode) => {
    setSelectedFarmer(farmer);
    setModalMode(mode);
  };

  const closeModal = () => {
    setSelectedFarmer(null);
  };

  const filteredFarmers = farmersData.filter((farmer) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      farmer.name.toLowerCase().includes(term) ||
      farmer.id.toLowerCase().includes(term) ||
      farmer.phone.toLowerCase().includes(term) ||
      farmer.location.toLowerCase().includes(term);

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "verified" && farmer.status === "Verified") ||
      (statusFilter === "pending" && farmer.status === "Pending");

    const matchesDistrict =
      districtFilter === "all" ||
      farmer.district.toLowerCase() === districtFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesDistrict;
  });

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-head">
        <div>
          <h2>Farmer Records</h2>
          <p>Monitor and manage all registered farmers in the system</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="farmer-stats">
        <div className="stat-card-mini">
          <div className="stat-icon-mini total">
            <Users size={24} />
          </div>
          <div>
            <div className="stat-label">Total Farmers</div>
            <div className="stat-value-mini">{farmersData.length}</div>
          </div>
        </div>

        <div className="stat-card-mini">
          <div className="stat-icon-mini verified">
            <CheckCircle size={24} />
          </div>
          <div>
            <div className="stat-label">Verified</div>
            <div className="stat-value-mini">
              {farmersData.filter((f) => f.status === "Verified").length}
            </div>
          </div>
        </div>

        <div className="stat-card-mini">
          <div className="stat-icon-mini pending">
            <Clock size={24} />
          </div>
          <div>
            <div className="stat-label">Pending</div>
            <div className="stat-value-mini">
              {farmersData.filter((f) => f.status === "Pending").length}
            </div>
          </div>
        </div>

        <div className="stat-card-mini">
          <div className="stat-icon-mini animals">
            <PawPrint size={24} />
          </div>
          <div>
            <div className="stat-label">Total Animals</div>
            <div className="stat-value-mini">
              {farmersData.reduce((sum, f) => sum + f.animals, 0)}
            </div>
          </div>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="search-filter-card">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by farmer name, ID, phone, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <Filter size={20} className="filter-icon" />
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as "all" | "verified" | "pending")
            }
          >
            <option value="all">All Status</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
          </select>

          <select
            className="filter-select"
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
          >
            <option value="all">All Districts</option>
            <option value="Pune">Pune</option>
            <option value="Nashik">Nashik</option>
            <option value="Satara">Satara</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="table-card">
        <table className="table">
          <thead>
            <tr>
              <th>FARMER ID</th>
              <th>NAME & CONTACT</th>
              <th>LOCATION</th>
              <th>ANIMALS</th>
              <th>COMPLIANCE</th>
              <th>LAST INSPECTION</th>
              <th>FARMER DOCUMENTS</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filteredFarmers.map((farmer) => (
              <tr key={farmer.id}>
                <td>
                  <span className="farmer-id">{farmer.id}</span>
                </td>

                <td>
                  <div className="farmer-contact-cell">
                    <div className="farmer-name-main">{farmer.name}</div>
                    <div className="contact-info">
                      <Phone size={14} />
                      {farmer.phone}
                    </div>
                  </div>
                </td>

                <td>
                  <div className="location-info">
                    <div className="location-main">
                      <MapPin size={14} />
                      {farmer.location}
                    </div>
                    <div className="location-sub">
                      {farmer.district}, {farmer.state}
                    </div>
                  </div>
                </td>

                {/* ANIMALS column: count + under treatment + View */}
                <td>
                  <div className="animal-count">
                    <div className="count-main">{farmer.animals} Animals</div>
                    <div className="treatment-count">
                      {farmer.underTreatment} under treatment
                    </div>
                    <button
                      className="cell-view-link"
                      onClick={() => openModal(farmer, "animals")}
                    >
                      View
                    </button>
                  </div>
                </td>

                {/* COMPLIANCE */}
                <td>
                  <span
                    className={`compliance-badge ${
                      farmer.compliance >= 90
                        ? "compliance-excellent"
                        : farmer.compliance >= 75
                        ? "compliance-good"
                        : farmer.compliance >= 60
                        ? "compliance-fair"
                        : "compliance-poor"
                    }`}
                  >
                    {farmer.compliance}%
                  </span>
                </td>

                {/* LAST INSPECTION */}
                <td>
                  <div className="date-cell">
                    <Calendar size={14} />
                    {farmer.lastInspection}
                  </div>
                </td>

                {/* FARMER DOCUMENTS: summary + View */}
                <td>
                  <div className="documents-summary">
                    <div className="doc-count">
                      <FileText size={16} />
                      {farmer.documents.length} docs
                    </div>
                    <div className="doc-verified-count">
                      {
                        farmer.documents.filter(
                          (d) => d.status === "VERIFIED"
                        ).length
                      }{" "}
                      verified
                    </div>
                    <button
                      className="cell-view-link"
                      onClick={() => openModal(farmer, "documents")}
                    >
                      View
                    </button>
                  </div>
                </td>

                {/* STATUS */}
                <td>
                  <span
                    className={`status-badge ${
                      farmer.status === "Verified"
                        ? "status-verified"
                        : "status-pending"
                    }`}
                  >
                    {farmer.status}
                  </span>
                </td>
              </tr>
            ))}

            {filteredFarmers.length === 0 && (
              <tr>
                <td colSpan={8} className="empty">
                  No farmers found for current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedFarmer && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div
            className="modal modal-large"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>
                {modalMode === "documents"
                  ? "Farmer Documents"
                  : "Animal Details"}{" "}
                - {selectedFarmer.name} ({selectedFarmer.id})
              </h3>

              {/* Red close button */}
              <button
                className="btn-close btn-close-red"
                onClick={closeModal}
              >
                ×
              </button>

            </div>


            <div className="modal-body">
              {/* Farmer basic info */}
              <div className="details-grid">
                <div className="detail-item">
                  <label>Farmer ID</label>
                  <div className="detail-value">{selectedFarmer.id}</div>
                </div>
                <div className="detail-item">
                  <label>Full Name</label>
                  <div className="detail-value">{selectedFarmer.name}</div>
                </div>
                <div className="detail-item">
                  <label>Contact Number</label>
                  <div className="detail-value">{selectedFarmer.phone}</div>
                </div>
                <div className="detail-item">
                  <label>Email Address</label>
                  <div className="detail-value">{selectedFarmer.email}</div>
                </div>
                <div className="detail-item">
                  <label>Location</label>
                  <div className="detail-value">
                    {selectedFarmer.location}, {selectedFarmer.district},{" "}
                    {selectedFarmer.state}
                  </div>
                </div>
                <div className="detail-item">
                  <label>Total Animals</label>
                  <div className="detail-value">{selectedFarmer.animals}</div>
                </div>
                <div className="detail-item">
                  <label>Active Treatments</label>
                  <div className="detail-value">
                    {selectedFarmer.underTreatment}
                  </div>
                </div>
                <div className="detail-item">
                  <label>Compliance Score</label>
                  <div className="detail-value">
                    {selectedFarmer.compliance}%
                  </div>
                </div>
              </div>

              {/* Mode-specific content */}
              {modalMode === "documents" ? (
                <div className="documents-section">
                  <div className="section-title">
                    <FileText size={18} />
                    Verification Documents
                  </div>

                  {selectedFarmer.documents.length === 0 ? (
                    <div className="no-documents">
                      No documents uploaded for this farmer.
                    </div>
                  ) : (
                    <div className="documents-grid">
                      {selectedFarmer.documents.map((doc) => (
                        <div key={doc.filename} className="document-card">
                          <div className="doc-header">
                            <div className="doc-icon-large">
                              <FileText size={24} />
                            </div>
                            <span
                              className={`doc-status-badge ${
                                doc.status === "VERIFIED"
                                  ? "doc-verified"
                                  : doc.status === "PENDING"
                                  ? "doc-pending"
                                  : "doc-rejected"
                              }`}
                            >
                              {doc.status}
                            </span>
                          </div>

                          <div className="doc-content">
                            <div className="doc-type-main">{doc.type}</div>
                            <div className="doc-filename">{doc.filename}</div>
                            <div className="doc-upload-date">
                              <Calendar size={12} />
                              Uploaded: {doc.uploadDate}
                            </div>
                          </div>

                          <div className="doc-button-group">
                            <button className="btn-doc-view">
                              View
                            </button>
                            <button className="btn-doc-download">
                              Download
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="documents-section">
                  <div className="section-title">
                    <PawPrint size={18} />
                    Animal Details
                  </div>

                  {selectedFarmer.animalDetails.length === 0 ? (
                    <div className="no-documents">
                      No individual animal records available.
                    </div>
                  ) : (
                    <div className="animals-table-wrapper">
                      <table className="animals-table">
                        <thead>
                          <tr>
                            <th>TAG / ID</th>
                            <th>SPECIES</th>
                            <th>BREED</th>
                            <th>AGE</th>
                            <th>STATUS</th>
                            <th>LAST TREATMENT</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedFarmer.animalDetails.map((animal) => (
                            <tr key={animal.id}>
                              <td>{animal.tag}</td>
                              <td>{animal.species}</td>
                              <td>{animal.breed}</td>
                              <td>{animal.age}</td>
                              <td>{animal.status}</td>
                              <td>{animal.lastTreatment || "—"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerRecords;
