import React, { PureComponent } from 'react';
import moment from 'moment';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
  let weekdays = [];
  for(let i = 6; i >= 0; i--){
    weekdays.push(moment().subtract(i, 'days').format('MMM DD'))
  }

  const data = [
  {
    name: weekdays[0],
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: weekdays[1],
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: weekdays[2],
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: weekdays[3],
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: weekdays[4],
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: weekdays[5],
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: weekdays[6],
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default class BarGraph extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/stacked-bar-chart-s47i2';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" stackId="a" fill="#8884d8" />
          <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
