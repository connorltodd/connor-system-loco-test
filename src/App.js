import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DeviceList from './components/DeviceList/DeviceList';
import DeviceDetail from './components/DeviceDetail/DeviceDetail';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/devices" element={<DeviceList />} />
            <Route path="/devices/:deviceId" element={<DeviceDetail />} />
            <Route path="*" element={<Navigate to="/devices" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
