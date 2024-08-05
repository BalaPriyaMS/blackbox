import * as echarts from "echarts";
import { useEffect, useRef } from "react";

type PropsType = { options: echarts.EChartsOption; height?: number };

const Chart = (props: PropsType) => {
  const { options, height } = props;

  // useRef hooks
  const chartRef = useRef<HTMLDivElement>(null);

  // useEffect hooks
  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    chartInstance.setOption(options);
    chartInstance.group = "chart-group";
    echarts.connect("chart-group");

    chartInstance.dispatchAction({
      type: "takeGlobalCursor",
      key: "dataZoomSelect",
      dataZoomSelectActive: true,
    });

    const handleResize = () => chartInstance.resize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.dispose();
    };
  }, [options]);

  return (
    <div
      ref={chartRef}
      className="w-full"
      style={{ height: height ? `${height}rem` : "25rem" }}
    />
  );
};

export default Chart;
