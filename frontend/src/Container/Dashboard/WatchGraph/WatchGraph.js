import React from 'react'
import './WatchGraph.css'
import { Chart } from 'react-charts'
const WatchGraph =()=>{
    const data = React.useMemo(
        () => [
          {
            label: 'Series 1',
            data: [["Jan", 5], ["Feb", 2], ["Mar", 2], ["Apr", 0], ["May", 7],["Jun", 7],["Jul", 7],["Aug", 7],["Sep", 7],["Oct", 7],["Nov", 7],["Dec", 7]]
          }
        ],
        []
      )
      const series = React.useMemo(
        () => ({
          type: 'bar'
        }),
        []
      )
      const axes = React.useMemo(
        () => [
          { primary: true, type: 'ordinal', position: 'bottom' },
          { type: 'linear', position: 'left' }
        ],
        []
      )
    return(
        <div className="dashboard-watch-graph-container">
            <h1>Watch Record</h1>
            <div className="dashboard-watch-graph">
                <div>
                    <Chart data={data} series={series} axes={axes} dark/>
                </div>
                <div>
                    <Chart data={data} series={series} axes={axes} />
                </div>
                <div>
                    <Chart data={data} series={series} axes={axes} />
                </div>
            </div>
        </div>
    )
}

export default WatchGraph