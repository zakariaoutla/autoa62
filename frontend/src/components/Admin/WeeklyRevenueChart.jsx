import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function WeeklyRevenueChart() {
    const [data, setData] = useState([]);

    function getDateOfISOWeek(w, y) {
        const simple = new Date(y, 0, 1 + (w - 1) * 7);
        const dow = simple.getDay();
        let ISOweekStart = new Date(simple);
        if (dow <= 4)
            ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
        else
            ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
        return ISOweekStart;
    }

    useEffect(() => {
        axios.get('http://localhost:8080/payment/revenue/weekly')
            .then(res => {
                const formattedData = res.data.map(item => {
                    const weekStartDate = getDateOfISOWeek(item.week, item.year);
                    return {
                        week_start_date: weekStartDate.toISOString().split('T')[0],
                        revenue: item.weekly_revenue,
                    };
                });
                setData(formattedData);
            })
            .catch(err => console.error(err));
    }, []);


    return (
        <ResponsiveContainer width="100%" height={400} >
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke='#6d6d71ff' />
                <XAxis
                    dataKey="week_start_date"
                    tickFormatter={(dateStr) => new Date(dateStr).toLocaleDateString()}
                    axisLine={{ stroke: '#A3A3A5', strokeWidth: 2 }}
                    tick={{ fill: '#A3A3A5' }}
                />

                <YAxis axisLine={{ stroke: '#A3A3A5', strokeWidth: 2 }} tick={{ fill: '#A3A3A5' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#ff9700" strokeWidth={3} />
            </LineChart>
        </ResponsiveContainer>
    );
}
