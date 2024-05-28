import React, { useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getDevices } from '../../services/API.service';
import './DeviceList.css';
import DeviceHeader from '../DeviceHeader/DeviceHeader';


export default function DeviceList() {
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        try {
            const response = await getDevices();
            setDevices(response.data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className='devices-list-container'>
            <DeviceHeader />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Device Name / ID</TableCell>
                            <TableCell align="right">Last Report</TableCell>
                            <TableCell align="right">Device Model</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {devices.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Link to={`/devices/${row.id}`} className='device-link'>
                                        {row.name || 'Unknown Name'}
                                    </Link>
                                </TableCell>
                                <TableCell align="right">
                                    {moment(row.lastReportTime).startOf('hour').fromNow()}
                                    <br />
                                    <p className='device-date-text'>
                                        {moment(row.lastReportTime).format('lll')} (UTC +1)
                                    </p>
                                </TableCell>
                                <TableCell align="right">{row.model.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
