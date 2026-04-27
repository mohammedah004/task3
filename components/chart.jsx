import React from 'react'
import { LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer , BarChart,Bar } from "recharts";
export const Chart = ({data}) => {

      

      return (
      <div className="ChartBox">

            <div className="chart" style={{width:'100%',height:300}}>
            <ResponsiveContainer>
                  <LineChart data={data}>
                        <CartesianGrid stroke="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />

                        <Line
                        type="monotone"
                        dataKey="salse"
                        stroke="red"
                        />

                        <Line
                        type="monotone"
                        dataKey="profite"
                        stroke="blue"
                        />
                  </LineChart>
            </ResponsiveContainer>

      </div>


      <div className="chart" style={{width:'100%',height:300}}>
            <ResponsiveContainer>
                  <BarChart data={data}>
                        <CartesianGrid stroke="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />

                        <Bar 
                        dataKey="salse"
                        fill="#8b5cf6"
                        barSize={40}
                        />
                  </BarChart>
            </ResponsiveContainer>

      </div>

      </div>
      )
}
