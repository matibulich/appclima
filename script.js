let api_key = "5bn40gndullkpmmxcgst2cgd983q884ihvdl0rip";

document.getElementById("busqueda").addEventListener("click", () => {
  const ciudad = document.getElementById("ciudadEntrada").value;

  if (ciudad) {
    fetchCiudad(ciudad);
  }
});

function fetchCiudad(ciudad) {
  fetch(
    `https://www.meteosource.com/api/v1/free/find_places?text=${ciudad}&language=en&key=${api_key}`
  )
    .then((response) => response.json())
    .then((response) => mostrarDatos(response))
    .catch((error) => {
      console.log(error);
      alert("Problemas con el servidor");
    });
}

function mostrarDatos(response) {
  console.log(response);

  const divClima = document.getElementById("datosClima");
  divClima.innerHTML = "";
 

  for (let i = 0; i < response.length; i++) {
    const nombreCiudad = response[i].name;
    const nombreEstado = response[i].country;
    const nombrePais = response[i].adm_area1;
    const place_id = response[i].place_id;

    const enlaceCiudad = document.createElement("a");
    enlaceCiudad.href = "#";

    // Creamos el enlace con la etiqueta h3 dentro
    const h3Ciudad = document.createElement("h3");
    h3Ciudad.textContent = `${nombreCiudad}, ${nombrePais}, ${nombreEstado}`;

    // Agregamos el h3 como hijo de <a>
    enlaceCiudad.appendChild(h3Ciudad);

    // Agregamos al div
    divClima.appendChild(enlaceCiudad);

    enlaceCiudad.addEventListener("click", () => {
      if (place_id) {
        mostrarDatosClima(place_id);
      }
    });
  }
}

function mostrarDatosClima(place_id) {
  fetch(
    `https://www.meteosource.com/api/v1/free/point?place_id=${place_id}&sections=all&timezone=UTC&language=en&units=metric&key=${api_key}`
  )
    .then((response) => response.json())
    .then((response) => mostrarDatosCiudad(response))
    .catch((error) => {
      console.log(error);
      alert("Problemas con el servidor");
    });

  function mostrarDatosCiudad(response) {
    console.log(response);
    
    const temperatura = response.current.temperature;
    const icono = response.current.icon_num;

    datosClimaCiudad.innerHTML = "";
    console.log(temperatura);
    const divMostrarDatosCiudad = document.getElementById("datosClimaCiudad");

    const tempH2 = document.createElement("h2");
    tempH2.textContent = `Hace ${temperatura}° centígrados.`;

    const iconoImg = document.createElement("img");
    iconoImg.src = `/iconos/set04/grande/${icono}.png`;

    divMostrarDatosCiudad.appendChild(tempH2);
    divMostrarDatosCiudad.appendChild(iconoImg);

    const enlace5dias = document.createElement("a");
    enlace5dias.href = "#";
    enlace5dias.innerHTML = "Ver pronóstico a 5 días";

    divMostrarDatosCiudad.appendChild(enlace5dias);

    enlace5dias.addEventListener("click", () => {
      mostrarDatosA5dias(response);
    });
    
    function mostrarDatosA5dias(response) {
      const extendido = response.daily.data
      const divMostar5Dias = document.getElementById("datosA5dias");       
      divMostar5Dias.innerHTML = "";
      // Recorremos la matriz de datos diarios y creamos un párrafo para cada ícono
      
      extendido.forEach((dia) => {
        
        const mostrarExtendido = document.createElement("p");
        const iconoImg= document.createElement("img")
        iconoImg.src = `/iconos/set04/grande/${dia.icon}.png`           
        mostrarExtendido.textContent = `${dia.day}, `;
         
      
        console.log(mostrarExtendido)
    
        mostrarExtendido.appendChild(iconoImg)
        // Agregamos el párrafo al contenedor
        divMostar5Dias.appendChild(mostrarExtendido)
       
      });
    }
  




  }
}