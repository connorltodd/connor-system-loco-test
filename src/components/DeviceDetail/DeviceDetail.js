import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import { getDeviceById } from '../../services/API.service';
import DeviceHeader from '../DeviceHeader/DeviceHeader';
import backArrow from '../../assets/arrow_back.png';
import './DeviceDetail.css';

export default function DeviceDetail() {
    let { deviceId } = useParams();
    const [device, setDevice] = useState();

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        try {
            const response = await getDeviceById(deviceId);
            setDevice(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className='device-container'>
            <DeviceHeader />
            <Link to="/devices" className='homepage-link'>
                <img src={backArrow} alt="back arrow" />
                <p>{device?.name || 'Unknown Name'}</p>
            </Link>
            <div className='device-detail-card'>
                <div className='device-detail-card-column'>
                    <h2 className='device-detail-card-column-title'>Summary</h2>
                    <p className='attribute-title'>Device ID</p>
                    <p className='attribute-value'>{device?.id}</p>
                    <p className='attribute-title'>Device Name</p>
                    <p className='attribute-value'>{device?.name}</p>
                    <p className='attribute-title'>Model</p>
                    <p className='attribute-value'>{device?.model.name}</p>
                    <p className='attribute-title'>Family</p>
                    <p className='attribute-value'>{device?.model.family}</p>
                    <p className='attribute-title'>Product</p>
                    <p className='attribute-value'>{device?.model.product}</p>
                    <p className='attribute-title'>Firmware</p>
                    <p className='attribute-value'>{device?.firmware.current}</p>
                    <p className='attribute-title'>Owner</p>
                    <p className='attribute-value'>{device?.owner.name}</p>
                </div>

                <div className='device-detail-card-column'>
                    <h2 className='device-detail-card-column-title'>Status</h2>
                    <p className='attribute-title'>Battery Level</p>
                    <p className='attribute-value'>{device?.statusIndicators.battery}</p>
                    <p className='attribute-title'>Moving</p>
                    <p className='attribute-value'>
                        {device?.statusIndicators.moving ? 'true' : 'false'}
                    </p>
                    <p className='attribute-title'>GPS Status</p>
                    <p className='attribute-value'>
                        {device?.statusIndicators.gpsFailure ? 'Offline' : 'Online'}
                    </p>
                    <p className='attribute-title'>Charging</p>
                    <p className='attribute-value'>
                        {device?.statusIndicators.charging ? 'true' : 'false'}
                    </p>
                    <p className='attribute-title'>Flight Mode</p>
                    <p className='attribute-value'>
                        {device?.statusIndicators.flightMode ? 'true' : 'false'}
                    </p>
                </div>

                <div className='device-detail-card-column'>
                    <h2 className='device-detail-card-column-title'>Position</h2>
                    <p className='attribute-title'>Address</p>
                    <p className='attribute-value'>{device?.lastKnownLocation.summary}</p>
                    <p className='attribute-title'>Latitude / Longitude</p>
                    <p className='attribute-value'>
                        {device?.lastKnownLocation.global.lat}, {device?.lastKnownLocation.global.lon}
                    </p>
                    <p className='attribute-title'>Last Report Time</p>
                    <p className='attribute-value'>
                        {moment(device?.lastReportTime).startOf('hour').fromNow()}
                        <br />
                        <span className='attribute-title-small'>{moment(device?.lastReportTime).format('lll')} (UTC +1)</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
