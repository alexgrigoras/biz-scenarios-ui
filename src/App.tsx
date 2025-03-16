import React, { useState } from 'react';
import {
    Container, TextField, Button, Box, Typography, Select, MenuItem, InputLabel, FormControl, Chip
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import CsvUploader from './CsvUploader';

const scenarioOptions = ['priceCut10pct', 'priceIncrease20pct'];
const forecastOptions = ['p10', 'p50', 'p90'];

function App() {
    const [itemId, setItemId] = useState('item_105');
    const [scenarios, setScenarios] = useState<string[]>(['priceCut10pct']);
    const [forecasts, setForecasts] = useState<string[]>(['p50']);


    const data = [
        { date: '2025-07-01', baseline: 5000, priceCut10pct: 4800, priceIncrease20pct: 5200 },
        { date: '2025-07-08', baseline: 5100, priceCut10pct: 4850, priceIncrease20pct: 5300 },
        { date: '2025-07-15', baseline: 5150, priceCut10pct: 4900, priceIncrease20pct: 5400 }
    ];

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Compare What-If Forecasts
            </Typography>

            <Box display="flex" flexDirection="column" gap={2} mb={4}>
                <TextField
                    label="Item ID"
                    value={itemId}
                    onChange={(e) => setItemId(e.target.value)}
                />

                <FormControl>
                    <InputLabel>What-if Scenarios</InputLabel>
                    <CsvUploader />
                    <Select
                        multiple
                        value={scenarios}
                        onChange={(e) => setScenarios(e.target.value as string[])}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                {(selected as string[]).map((val) => <Chip key={val} label={val} />)}
                            </Box>
                        )}
                    >
                        {scenarioOptions.map((s) => (
                            <MenuItem key={s} value={s}>{s}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel>Forecast Types</InputLabel>
                    <Select
                        multiple
                        value={forecasts}
                        onChange={(e) => setForecasts(e.target.value as string[])}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                {(selected as string[]).map((val) => <Chip key={val} label={val} />)}
                            </Box>
                        )}
                    >
                        {forecastOptions.map((f) => (
                            <MenuItem key={f} value={f}>{f}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button variant="contained" onClick={() => console.log('Compare clicked')}>
                    Compare What-If
                </Button>
            </Box>

            <Typography variant="h6" gutterBottom>
                Forecast Chart
            </Typography>
            <LineChart width={700} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="baseline" stroke="#000" name="Baseline" />
                {scenarios.includes('priceCut10pct') && (
                    <Line type="monotone" dataKey="priceCut10pct" stroke="#ff7300" name="priceCut10pct" />
                )}
                {scenarios.includes('priceIncrease20pct') && (
                    <Line type="monotone" dataKey="priceIncrease20pct" stroke="#0088FE" name="priceIncrease20pct" />
                )}
            </LineChart>
        </Container>
    );
}

export default App;

