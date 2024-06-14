Chart.defaults.color = '#fff';
Chart.defaults.borderColor = '#444';

let temperatureChartInstance = null;
let yearsChartInstance = null;

// Function to print the data chart with 24 values
const printDataChartPartial = (data) => {
    const selectedValue = document.getElementById('featuresOptions').value;
    let selectedData;
    let label;
    let borderColor;

    if (selectedValue === 'width') {
        selectedData = data.temperature;
        label = 'Temperature';
        borderColor = 'red';
    } else if (selectedValue === 'length') {
        selectedData = data.humidity;
        label = 'Humidity';
        borderColor = 'lightblue';
    } else if (selectedValue === 'height') {
        selectedData = data.humidity_land;
        label = 'Soil Humidity';
        borderColor = 'blue';
    } else {
        console.error('Invalid option selected:', selectedValue);
        return;
    }

    const dataset = {
        label: label,
        data: selectedData.slice(0, 24),
        borderColor: borderColor,
        borderWidth: 1,
        fill: false
    };

    const ctx = document.getElementById('temperatureChart').getContext('2d');

    // Destroy the existing chart instance if it exists
    if (temperatureChartInstance) {
        temperatureChartInstance.destroy();
    }

    temperatureChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: dataset.data.length }, (_, i) => i + 1),
            datasets: [dataset]
        },
        options: {
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Value'
                    }
                }
            }
        }
    });
};

// Function to print the data chart with 96 values
const printDataChartFull = (data) => {
    // Fill in missing values for each dataset
    const fillArray = (arr) => {
        while (arr.length < 96) {
            arr.unshift(0);
        }
        return arr;
    };

    const temperatureData = fillArray(data.temperature);
    const humidityData = fillArray(data.humidity);
    const humidityLandData = fillArray(data.humidity_land);

    const datasets = [
        {
            label: 'Temperature',
            data: temperatureData.slice(0, 96),
            borderColor: 'red',
            borderWidth: 1,
            fill: false
        },
        {
            label: 'Humidity',
            data: humidityData.slice(0, 96),
            borderColor: 'lightblue',
            borderWidth: 1,
            fill: false
        },
        {
            label: 'Soil Humidity',
            data: humidityLandData.slice(0, 96),
            borderColor: 'blue',
            borderWidth: 1,
            fill: false
        }
    ];

    const ctx = document.getElementById('yearsChart').getContext('2d');

    // Destroy the existing chart instance if it exists
    if (yearsChartInstance) {
        yearsChartInstance.destroy();
    }

    yearsChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 96 }, (_, i) => i + 1),
            datasets: datasets
        },
        options: {
            scales: {
                y: {
                    min: 0,  // Set the minimum value of the Y-axis to 0
                    max: 100, // Set the maximum value of the Y-axis to 100
                    title: {
                        display: true,
                        text: 'Value'
                    }
                }
            }
        }
    });
};

// Function to fetch data from '/datagraf' and update the partial chart
const fetchDataPartial = () => {
    fetch('/datagraf')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch data');
            }
        })
        .then(data => {
            printDataChartPartial(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};

// Function to fetch data from '/datagraficas' and update the full chart
const fetchFullDataChart = () => {
    fetch('/datagraficas')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch full data chart');
            }
        })
        .then(data => {
            printDataChartFull(data);
        })
        .catch(error => {
            console.error('Error fetching full data chart:', error);
        });
};

// Function to update the values displayed on the page
const updateValues = () => {
    fetch('/data')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch data');
            }
        })
        .then(data => {
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
};

// Function to toggle the 'regar' state
const toggleRegar = () => {
    fetch('/regar')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to toggle regar');
            }
        })
        .catch(error => {
            console.error('Error toggling regar:', error);
        });
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    updateValues();
    fetchDataPartial();
    fetchFullDataChart();
    setInterval(updateValues, 1000);
});
