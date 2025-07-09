export function createChart(Chart, labels, data, symbol) {
  const chartSection = document.getElementById("currencyChartSection");
  chartSection.innerHTML = '';
  const canvas = document.createElement("canvas");
  canvas.id = 'currency-rate';
  chartSection.appendChild(canvas);

  new Chart(canvas, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: `1 ${symbol}`,
          data: data,
          borderColor: 'rgba(50, 88, 174, 0.5)',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          borderWidth: 2,
          fill: true,
        },
      ],},
    options: { 
      scales:{
        x: {
            ticks:{
                color: 'black'
            }
        },
        y:{
            ticks:{
                color: 'black'
            }
        },
      },
      plugins: {
        legend: { 
          display: true,
          labels: {
            color: 'black'
          }
        }
      },
      responsive: true },
    }
  );  
}