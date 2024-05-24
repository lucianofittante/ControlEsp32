let temperatureChart, humidityChart, humidityLandChart;

function updateCharts(data) {
  const labels = data.temperature.map((_, index) => index + 1);

  // Update temperature chart
  if (!temperatureChart) {
    const ctx = document.getElementById('temperatureChart').getContext('2d');
    temperatureChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Temperatura',
          data: data.temperature,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: false,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
            }
          },
          y: {
            title: {
              display: true,
              text: 'Values'
            },
            min: 0,
            max: 100
          }
        }
      }
    });
  } else {
    temperatureChart.data.labels = labels;
    temperatureChart.data.datasets[0].data = data.temperature;
    temperatureChart.update();
  }

  // Update humidity chart
  if (!humidityChart) {
    const ctx = document.getElementById('humidityChart').getContext('2d');
    humidityChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Humedad Amb',
          data: data.humidity,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: false,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
            }
          },
          y: {
            title: {
              display: true,
              text: 'Values'
            },
            min: 0,
            max: 100
          }
        }
      }
    });
  } else {
    humidityChart.data.labels = labels;
    humidityChart.data.datasets[0].data = data.humidity;
    humidityChart.update();
  }

  // Update humidity land chart
  if (!humidityLandChart) {
    const ctx = document.getElementById('humidityLandChart').getContext('2d');
    humidityLandChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Humedad Suelo',
          data: data.humidity_land,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: false,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
            }
          },
          y: {
            title: {
              display: true,
              text: 'Values'
            },
            min: 0,
            max: 100
          }
        }
      }
    });
  } else {
    humidityLandChart.data.labels = labels;
    humidityLandChart.data.datasets[0].data = data.humidity_land;
    humidityLandChart.update();
  }
}

function fetchData() {
  fetch('/datagraf')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch data');
      }
    })
    .then(data => {
      updateCharts(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function updateValues() {
  fetch('/data')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch data');
      }
    })
    .then(data => {
      // Update the UI with received data
      document.getElementById('temperature').innerText = data.temperature;
      document.getElementById('humidity').innerText = data.humidity;
      document.getElementById('humedadsuelo').innerText = data.humedadsuelo;

      document.getElementById('regar').style.backgroundColor = data.regar ? 'green' : 'red';
      document.getElementById('alarmariego').style.backgroundColor = data.alarmariego ? 'green' : 'red';

      document.getElementById('current_time').innerText = data.time;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

updateValues();
setInterval(updateValues, 1000);
setInterval(fetchData, 1000); // Fetch chart data every 10 seconds

function toggleRegar() {
  fetch('/regar', {
    method: 'GET'
  })
  .then(response => {
    if (response.ok) {
      // Toggle the button background color on success
      console.log('LED toggled successfully');
      return response.json();
    } else {
      throw new Error('Failed to toggle LED');
    }
  })
  .catch(error => {
    console.error('Error toggling LED:', error);
  });
}

window.onload = function() {
  console.log('Page loaded, updating values...');
  fetchData(); // Fetch initial chart data on load
};