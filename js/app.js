let map = L.map('map').setView([36.7201600, -4.4203400], 15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19,attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);

let template = document.querySelector("template");
let content = document.querySelector("#content");

fetch("https://raw.githubusercontent.com/FRomero999/ExamenDIW2022/main/rutas_arqueologicas.json?classId=a44f2eea-e51b-4a7a-a11a-eefc73428d1a&assignmentId=b6d46e1e-b651-43e1-b861-1d6ba465dd82&submissionId=c773ff20-ba3d-cf9e-1095-93f6fedc73c5")  
.then(response => response.json())
  .then(data => {
   data.forEach(function(coordenada){

    let conteiner = document.createElement("div");
    let location = template.content.cloneNode(true);

    location.querySelector("h3").innerText = coordenada.properties.nombre;
    location.querySelector("p").innerText = coordenada.properties.horario;
    location.querySelector("#direccion").innerText = coordenada.properties.direccion;
    location.querySelector("#telefono").innerText = coordenada.properties.telefono;

    let x = coordenada.properties.x;
    let y = coordenada.properties.y;

    let marker = L.marker([x, y]).addTo(map);
    let label = '<b>' + coordenada.properties.nombre + '</b><br/>' + coordenada.properties.direccion;
    
    marker.bindPopup(label);

    conteiner.appendChild(location);
    content.appendChild(conteiner);
    
    });
   })

.catch( err => {alert("Hubo un error: " + err +".")});