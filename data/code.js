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



// Evento al cargar la página para obtener y mostrar el estado actual del LED y el valor del potenciómetro
window.onload = function() {
  

        };
