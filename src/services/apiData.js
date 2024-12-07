import axios from 'axios';

const API_URL = "https://api-app-staging.wobot.ai/app/v1";
const Token = "4ApVMIn5sTxeW7GQ5VWeWiy"

const fetchCameras = async () => {
  const response = await axios.get(`${API_URL}/fetch/cameras`, {
    headers: { Authorization: `Bearer ${Token}` },
  });
  return response.data.data;
};

const updateCameraStatus = async (id, status) => {
  const response = await axios.post(
    `${API_URL}/update/camera/status`,
    { id, status },
    { headers: { Authorization: `Bearer ${Token}` } }
  );
  return response.data.data;
};

export { fetchCameras, updateCameraStatus };
