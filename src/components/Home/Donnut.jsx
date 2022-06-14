import React, { useState } from 'react';
import styled from 'styled-components';
import Chart from "react-apexcharts";

export default function Donnut(props) {
  const [options, setOptions] = useState({
      labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
  });
  const [series, setSeries] = useState([44, 55, 13, 33]);
  return (
    <Wrapper>
      <div className="mixed-chart">
        <Chart
          options={options}
          series={series}
          type="donut"
          width="500"
          className="chart"
        />
      </div>
    </Wrapper >
  );
}

const Wrapper = styled.div`
  border-radius: 20px;
  padding: 20px;
  /* border: 1px solid red; */
  max-width: 560px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;