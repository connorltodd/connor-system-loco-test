import Typography from '@mui/material/Typography';
import devicesIcon from '../../assets/devices-icon.png';

import './DeviceHeader.css';

export default function DeviceHeader() {
    return (
        <div className='device-header' >
            <img src={devicesIcon} alt="devices" />
            <Typography variant="h5" component="h5">
                Devices
            </Typography>
        </div>
    );
}