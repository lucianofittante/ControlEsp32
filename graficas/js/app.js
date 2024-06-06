Chart.defaults.color = '#fff'
Chart.defaults.borderColor = '#444'


// Fetch CSV data and create line graph
const printTemperatureChart = () => {
    // Fetch CSV data
    d3.csv("data.csv")
        .then(data => {
            // Extract temperature values
            const temperatures = data.map(d => +d.temperature);
            
            // Create Chart.js line graph
            const ctx = document.getElementById('temperatureChart').getContext('2d');
            const temperatureChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.map((_, i) => i + 1), // Assuming data is an array of objects
                    datasets: [{
                        label: 'Temperature',
                        data: temperatures,
                        borderColor: 'rgba(255, 99, 132, 1)', // Red color
                        borderWidth: 1,
                        fill: false // No fill below the line
                    }]
                },
                options: {
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: 'Temperature'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error("Error fetching or processing CSV data:", error);
        });
};

// Call the function to print the temperature chart
printTemperatureChart();
