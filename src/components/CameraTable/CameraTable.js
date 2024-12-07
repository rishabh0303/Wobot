import React, { useState, useEffect } from "react";
import "./tables.css";
import Pagination from "../Pagination/Pagination";
import { fetchCameras, updateCameraStatus } from "../../services/apiData";

const CameraTable = () => {
  const [cameras, setCameras] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [rowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCameras();
      setCameras(data);
    };
    fetchData();
  }, []);

  const filteredCameras = Array.isArray(cameras)
    ? cameras.filter((camera) => {
        const matchesSearch = camera.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesLocation =
          !selectedLocation || camera.location === selectedLocation;
        const matchesStatus =
          !selectedStatus ||
          camera.status.toLowerCase() === selectedStatus.toLowerCase();

        return matchesSearch && matchesLocation && matchesStatus;
      })
    : [];

  const paginatedCameras = filteredCameras.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    await updateCameraStatus(id, newStatus);
    setCameras((prev) =>
      prev.map((camera) =>
        camera.id === id ? { ...camera, status: newStatus } : camera
      )
    );
  };

  const handleDelete = (id) => {
    setCameras(cameras.filter((camera) => camera.id !== id));
  };

  const tableHeaders = [
    { label: "Name", key: "name" },
    { label: "Health", key: "health" },
    { label: "Location", key: "location" },
    { label: "Recorder", key: "recorder" },
    { label: "Tasks", key: "task" },
    { label: "Status", key: "status" },
    { label: "Actions", key: "actions" },
  ];

  return (
    <div className="table-container">
      <h2>Cameras</h2>
      <p>Manage your cameras here.</p>
      <div className="filter-container">
        <select
          className="filter-dropdown"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">Locations</option>
          {cameras.map((location) => (
            <option key={location.id} value={location.location}>
              {location.location}
            </option>
          ))}
        </select>
        <select
          className="filter-dropdown"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <table className="camera-table">
        <thead>
          {tableHeaders.map((header) => (
            <td key={header.key}>{header.label}</td>
          ))}
        </thead>
        <tbody>
          {paginatedCameras.map((camera) => (
            <tr key={camera.id}>
              <td>
                <span
                  className={`health-indicator ${camera.health.cloud}`}
                ></span>
                <span>{camera.name}</span>
              </td>
              <td>{camera.health.device}</td>
              <td>{camera.location}</td>
              <td>{camera.recorder || "NA"}</td>
              <td>{camera.tasks || "NA"}</td>
              <td>
                <span className={`status ${camera.status.toLowerCase()}`}>
                  {camera.status}
                </span>
              </td>
              <td>
                {/* <button
                  className="action-btn"
                  onClick={() => handleStatusToggle(camera.id, camera.status)}
                >
                  {camera.status === "Active" ? "Inactive" : "Active"}
                </button> */}
                <button
                  className="action-btn"
                  onClick={() => handleDelete(camera.id)}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalItems={filteredCameras.length}
        itemsPerPage={rowsPerPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default CameraTable;
