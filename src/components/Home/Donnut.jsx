import React, { useState } from 'react';
import styled from 'styled-components';
import Chart from "react-apexcharts";

export default function Donnut(props) {
  let locIds = props.ca.map(ca => {
    return "LOC"+ca.locId;
  });
  const [options, setOptions] = useState({
      labels: locIds
  });
  let ca = props.ca.map(ca => {
    return ca.ca;
  })
  const [series, setSeries] = useState(ca);
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