import React, { useState } from 'react';
import styled from 'styled-components';
import Chart from "react-apexcharts";


export default function Histogramme(props) {
  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    }
  });
  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91]
    }
  ]);
  return (
    <Wrapper>
      <div className="mixed-chart">
        <Chart
          options={options}
          series={series}
          type="bar"
          width="500"
          className="chart"
        />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border-radius: 20px;
  padding: 20px;
  /* border: 1px solid red; */
  max-width: 560px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;