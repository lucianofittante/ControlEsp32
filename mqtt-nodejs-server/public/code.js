document.addEventListener('DOMContentLoaded', function() {
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

    function fetchSensorData() {
        fetch('/api/sensor-data')
            .then(response => response.json())
            .then(data => {
                document.getElementById('temperature').textContent = data.temperature ?? 'N/A';
                document.getElementById('humidity').textContent = data.humidity ?? 'N/A';
                document.getElementById('humedadsuelo').textContent = data.humedadsuelo ?? 'N/A';
                document.getElementById('regar').style.backgroundColor = data.regar ? 'green' : 'red';
                document.getElementById('alarmariego').style.backgroundColor = data.alarmariego ? 'red' : 'green';
            })
            .catch(error => console.error('Error fetching sensor data:', error));
    }

    function fetchDataForCharts() {
        fetch('/datagraf')
            .then(response => response.json())
            .then(data => {
                updateCharts(data);
            })
            .catch(error => console.error('Error fetching data for charts:', error));
    }

    // Fetch sensor data initially and then every second
    fetchSensorData();
    setInterval(fetchSensorData, 1000);

    // Fetch data for charts initially and then every minute
    fetchDataForCharts();
    setInterval(fetchDataForCharts, 1000); // Adjust the interval as needed
});
