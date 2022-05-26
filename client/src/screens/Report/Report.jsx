import React, { useState } from 'react';
import Header from '../../components/Header';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import api, { usersUrl } from '../../constants/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Active Users Report',
    },
  },
};

const labels = ['Users'];

const Report = () => {
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: 'Active',
        data: [0],
        backgroundColor: 'rgb(53, 162, 235)',
      },
      {
        label: 'Inactive',
        data: [0],
        backgroundColor: 'rgb(255, 99, 132)',
      },
    ],
  });

  const { token } = useSelector((state) => state.auth);
  const { page, sort, filterBy, search } = useSelector(
    (state) => state.filters
  );

  useEffect(() => {
    const r = updateChart();
    return () => {};
  }, []);

  const updateChart = async () => {
    const { data: userData } = await api.get(`${usersUrl}/report`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { page, sort, [filterBy]: search },
    });

    setData({
      ...data,
      datasets: [
        {
          label: 'Active',
          data: [userData.activeUserCount],
          backgroundColor: 'rgb(53, 162, 235)',
        },
        {
          label: 'Inactive',
          data: [userData.inactiveUserCount],
          backgroundColor: 'rgb(255, 99, 132)',
        },
      ],
    });
  };

  return (
    <>
      <Header />
      <section className='antialiased mx-auto text-gray-600 h-screen px-4 w-screen container'>
        <div className='flex flex-col justify-center h-full'>
          <div className='w-full mx-auto bg-white shadow-lg rounded-xl border border-gray-200 p-10'>
            <Bar options={options} data={data} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Report;
