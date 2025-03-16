import React from "react";
import Papa from 'papaparse';
import { Button, Typography } from '@mui/material';

function CsvUploader() {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                console.log("CSV data:", results.data);

            }
        });
    };
    return (
        <div style={{ marginTop: '2rem' }}>
            <Typography variant="h6">Upload CSV</Typography>
            <input
                type="file"
                accept=".csv"
                id="csv-input"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <label htmlFor="csv-input">
                <Button variant="contained" component="span">Select CSV</Button>
            </label>
        </div>
    );
};

export default CsvUploader;