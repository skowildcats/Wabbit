import React, {Component} from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class BarGraph extends Component{
  render(){
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={this.props.data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false}/>
          <Tooltip />
          <Legend />
          <Bar dataKey="Completed" stackId="a" fill={this.props.color1 ? this.props.color1 : "#8884d8"} />
          <Bar dataKey="Incomplete" stackId="a" fill={this.props.color2 ? this.props.color2 : "#82ca9d"} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
