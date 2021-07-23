import React, { Component } from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

//update these to change the pie colors
const COLORS = ['#0088FE', "#82ca9d"]
export default class Completed extends Component {
  render() {
    if(!this.props.data1 || !this.props.data2) return null;
    return (
      <ResponsiveContainer>
        <PieChart>
          <Tooltip/>
          <Pie data={this.props.data1} nameKey="inTime" dataKey="value" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
            {/* For distinct coloring */}
            {this.props.data1.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Pie data={this.props.data2} nameKey="portion" dataKey="value" cx="50%" cy="50%" innerRadius={110} outerRadius={140} fill="#82ca9d" label>
            {this.props.data2.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
