document.addEventListener('DOMContentLoaded', function() {
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

    // Fetch sensor data initially and then every 5 seconds
    fetchSensorData();
    setInterval(fetchSensorData, 1000);
});
