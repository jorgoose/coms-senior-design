'use client'

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface LineGraphCompProps {
    data: any; 
}

const LineGraphComp: React.FC<LineGraphCompProps> = ({ data }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top' as const,
            },
        },
    };

    const chartData = {
        labels: data.map((item: { month: any; }) => item.month),
        datasets: [
            {
                label: 'Player Count',
                data: data.map((item: { playerCount: any; }) => item.playerCount),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return <Line options={options} data={chartData}/>
};

export default LineGraphComp;