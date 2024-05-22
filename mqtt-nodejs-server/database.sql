CREATE DATABASE sensor_data;
USE sensor_data;

CREATE TABLE sensors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    temperature FLOAT,
    humidity FLOAT,
    regar FLOAT,
    alarmariego FLOAT,
    humedadsuelo FLOAT,
    current_tiempo TIME
);

SELECT * FROM  sensors;

