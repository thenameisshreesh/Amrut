import { useState } from "react";
import { FiSearch, FiAlertCircle, FiCheckCircle, FiClock } from "react-icons/fi";
import "../styles/TreatmentLog.css";

// Sample Treatment Data
const treatmentData = [
  {
    id: 1,
    farmer: "Rajesh Patil",
    farmerId: "F001",
    animalId: "MH-DAI-2024-1234",
    animalType: "Cattle",
    vetName: "Dr. Amit Shah",
    medicine: "Oxytetracycline",
    dosage: "20 mg/kg",
    withdrawalDays: 7,
    treatmentDate: "2025-12-10",
    status: "Active",
    remainingDays: 2
  },
  {
    id: 2,
    farmer: "Suresh Kale",
    farmerId: "F002",
    animalId: "MH-DAI-2024-5678",
    animalType: "Buffalo",
    vetName: "Dr. Priya Deshmukh",
    medicine: "Amoxicillin",
    dosage: "15 mg/kg",
    withdrawalDays: 5,
    treatmentDate: "2025-12-08",
    status: "Warning",
    remainingDays: 0
  },
  {
    id: 3,
    farmer: "Ramesh Jadhav",
    farmerId: "F003",
    animalId: "MH-DAI-2024-9012",
    animalType: "Cattle",
    vetName: "Dr. Amit Shah",
    medicine: "Ceftriaxone",
    dosage: "10 mg/kg",
    withdrawalDays: 14,
    treatmentDate: "2025-11-25",
    status: "Completed",
    remainingDays: -6
  },
  {
    id: 4,
    farmer: "Prakash More",
    farmerId: "F004",
    animalId: "MH-DAI-2024-3456",
    animalType: "Goat",
    vetName: "Dr. Sunita Rane",
    medicine: "Penicillin G",
    dosage: "5 mg/kg",
    withdrawalDays: 10,
    treatmentDate: "2025-12-05",
    status: "Active",
    remainingDays: 5
  },
  {
    id: 5,
    farmer: "Rajesh Patil",
    farmerId: "F001",
    animalId: "MH-DAI-2024-7890",
    animalType: "Cattle",
    vetName: "Dr. Priya Deshmukh",
    medicine: "Sulfamethazine",
    dosage: "25 mg/kg",
    withdrawalDays: 21,
    treatmentDate: "2025-12-01",
    status: "Active",
    remainingDays: 7
  },
  {
    id: 6,
    farmer: "Anita Sharma",
    farmerId: "F005",
    animalId: "MH-DAI-2024-2468",
    animalType: "Buffalo",
    vetName: "Dr. Amit Shah",
    medicine: "Enrofloxacin",
    dosage: "12 mg/kg",
    withdrawalDays: 28,
    treatmentDate: "2025-11-20",
    status: "Completed",
    remainingDays: -3
  }
];

export default function TreatmentLog() {
  const [farmerId, setFarmerId] = useState("");
  const [animalId, setAnimalId] = useState("");
  const [filteredData, setFilteredData] = useState(treatmentData);

  const handleSearch = () => {
    const filtered = treatmentData.filter((treatment) => {
      const matchesFarmer = farmerId
        ? treatment.farmerId.toLowerCase().includes(farmerId.toLowerCase()) ||
          treatment.farmer.toLowerCase().includes(farmerId.toLowerCase())
        : true;
      
      const matchesAnimal = animalId
        ? treatment.animalId.toLowerCase().includes(animalId.toLowerCase())
        : true;

      return matchesFarmer && matchesAnimal;
    });

    setFilteredData(filtered);
  };

  const handleReset = () => {
    setFarmerId("");
    setAnimalId("");
    setFilteredData(treatmentData);
  };

  const getStatusBadge = (status: string, remainingDays: number) => {
    if (status === "Active") {
      return (
        <span className="status-badge status-active">
          <FiClock size={14} />
          Active ({remainingDays}d left)
        </span>
      );
    } else if (status === "Warning") {
      return (
        <span className="status-badge status-warning">
          <FiAlertCircle size={14} />
          Ending Soon
        </span>
      );
    } else {
      return (
        <span className="status-badge status-completed">
          <FiCheckCircle size={14} />
          Completed
        </span>
      );
    }
  };

  // Calculate statistics
  const activeCount = treatmentData.filter(t => t.status === "Active").length;
  const warningCount = treatmentData.filter(t => t.status === "Warning").length;
  const completedCount = treatmentData.filter(t => t.status === "Completed").length;

  return (
    <div className="page">
      {/* Header */}
      <div className="page-head">
        <div>
          <h2>Treatment Log</h2>
          <p>Search and view all treatment records</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card stat-active">
          <div className="stat-icon">
            <FiClock size={24} />
          </div>
          <div className="stat-info">
            <h3>Active Treatments</h3>
            <p className="stat-value">{activeCount}</p>
          </div>
        </div>

        <div className="stat-card stat-warning">
          <div className="stat-icon">
            <FiAlertCircle size={24} />
          </div>
          <div className="stat-info">
            <h3>Ending Soon</h3>
            <p className="stat-value">{warningCount}</p>
          </div>
        </div>

        <div className="stat-card stat-completed">
          <div className="stat-icon">
            <FiCheckCircle size={24} />
          </div>
          <div className="stat-info">
            <h3>Completed</h3>
            <p className="stat-value">{completedCount}</p>
          </div>
        </div>

        <div className="stat-card stat-total">
          <div className="stat-icon">
            <FiSearch size={24} />
          </div>
          <div className="stat-info">
            <h3>Total Records</h3>
            <p className="stat-value">{treatmentData.length}</p>
          </div>
        </div>
      </div>

      {/* Search Filters */}
      <div className="form-card">
        <h3>Search Filters</h3>

        <div className="form-row">
          <input
            className="form-input"
            placeholder="Farmer ID or Name"
            value={farmerId}
            onChange={(e) => setFarmerId(e.target.value)}
          />

          <input
            className="form-input"
            placeholder="Animal ID"
            value={animalId}
            onChange={(e) => setAnimalId(e.target.value)}
          />

          <button className="btn-search" onClick={handleSearch}>
            <FiSearch /> Search
          </button>

          <button className="btn-reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      {/* Results Info */}
      <div className="results-info">
        <p>Showing <strong>{filteredData.length}</strong> of {treatmentData.length} treatments</p>
      </div>

      {/* Table */}
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>FARMER</th>
              <th>ANIMAL ID</th>
              <th>TYPE</th>
              <th>VET NAME</th>
              <th>MEDICINE</th>
              <th>DOSAGE</th>
              <th>WITHDRAWAL DAYS</th>
              <th>TREATMENT DATE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((treatment) => (
                <tr key={treatment.id} className="table-row">
                  <td>
                    <div className="farmer-info">
                      <strong>{treatment.farmer}</strong>
                      <span className="farmer-id">{treatment.farmerId}</span>
                    </div>
                  </td>
                  <td>
                    <span className="animal-tag">{treatment.animalId}</span>
                  </td>
                  <td>
                    <span className="animal-type-badge">{treatment.animalType}</span>
                  </td>
                  <td>{treatment.vetName}</td>
                  <td>
                    <strong className="medicine-name">{treatment.medicine}</strong>
                  </td>
                  <td>{treatment.dosage}</td>
                  <td>
                    <span className="withdrawal-badge">{treatment.withdrawalDays} days</span>
                  </td>
                  <td>{new Date(treatment.treatmentDate).toLocaleDateString("en-IN")}</td>
                  <td>{getStatusBadge(treatment.status, treatment.remainingDays)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="table-empty">
                  <FiSearch size={48} />
                  <p>No treatments found</p>
                  <span>Try adjusting your search filters</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
