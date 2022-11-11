var costoTotal = 0;
var precioHora = 0;
var precioHoraHerr = 0;
var validaHerramientas = "";

var totalCotizado = 0;
var totalCotizadoARS = 0;

var tiposCambio = [];

var cotizacion = {
  id: Date,
  referencia: "",
  trabajo: "",
  herramientas: "no",
  personas: 0,
  dias: 0,
  horas: 0,
  costoTotal: 0,
};

var cotizacionesRealizadas = [];

function currencyFormatter({ currency, value }) {
  const formatter = new Intl.NumberFormat("en-US", {
    currency: "USD",
    minimumFractionDigits: 2,
    currency,
  });
  return formatter.format(value);
}

function escribirHistorico() {
  let infoReferencia = document.querySelector("#infoReferencia"),
    infoTrabajo = document.querySelector("#infoTrabajo"),
    infoHerramientas = document.querySelector("#infoHerramientas"),
    infoPersonas = document.querySelector("#infoPersonas"),
    infoDias = document.querySelector("#infoDias"),
    infoHoras = document.querySelector("#infoHoras"),
    infoCostoTotal = document.querySelector("#infoCostoTotal");

  let mensajeD = document.querySelector("#alerta");

  console.log(cotizacionesRealizadas.length);

  infoReferencia.innerHTML = `${
    cotizacionesRealizadas[cotizacionesRealizadas.length - 1].referencia
  }`;
  infoTrabajo.innerHTML = `${
    cotizacionesRealizadas[cotizacionesRealizadas.length - 1].trabajo
  }`;
  infoHerramientas.innerHTML = `${
    cotizacionesRealizadas[cotizacionesRealizadas.length - 1].herramientas
  }`;
  infoPersonas.innerHTML = `${
    cotizacionesRealizadas[cotizacionesRealizadas.length - 1].personas
  }`;
  infoDias.innerHTML = `${
    cotizacionesRealizadas[cotizacionesRealizadas.length - 1].dias
  }`;
  infoHoras.innerHTML = `${
    cotizacionesRealizadas[cotizacionesRealizadas.length - 1].horas
  }`;
  infoCostoTotal.innerHTML = `${new Intl.NumberFormat("es-PE", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(
    cotizacionesRealizadas[cotizacionesRealizadas.length - 1].costoTotal
  )}`;

  // escondemos el mensaje
  mensajeD.style.display = "block";
}

function costoHoraFunc() {
  if (precioHora == 20) {
    trabajoProgId.innerHTML = `<input class="btn btn-secondary" type="button" value="Programador" id="trabajoProg">`;
  } else {
    trabajoProgId.innerHTML = `<input class="btn btn-primary" type="button" value="Programador" id="trabajoProg">`;
  }

  if (precioHora == 15) {
    trabajoElectId.innerHTML = `<input class="btn btn-secondary" type="button" value="Electricista" id="trabajoElect">`;
  } else {
    trabajoElectId.innerHTML = `<input class="btn btn-primary" type="button" value="Electricista" id="trabajoElect">`;
  }

  if (precioHora == 14) {
    trabajoAsistId.innerHTML = `<input class="btn btn-secondary" type="button" value="Asistencia Tecnica" id="trabajoAsist">`;
  } else {
    trabajoAsistId.innerHTML = `<input class="btn btn-primary" type="button" value="Asistencia Tecnica" id="trabajoAsist">`;
  }

  console.log(precioHora);
}

function herramientasSiNo() {
  if (validaHerramientas == "Si") {
    herramientasSiId.innerHTML = `<input class="btn btn-secondary" type="button" value="Si" id="herramientasSi">`;
  } else {
    herramientasSiId.innerHTML = `<input class="btn btn-primary" type="button" value="Si" id="herramientasSi">`;
  }

  if (validaHerramientas == "No") {
    herramientasNoId.innerHTML = `<input class="btn btn-secondary" type="button" value="No" id="herramientasNo">`;
  } else {
    herramientasNoId.innerHTML = `<input class="btn btn-primary" type="button" value="No" id="herramientasNo">`;
  }

  console.log(validaHerramientas);
}

function sincronizarConLocalStorage() {
  localStorage.setItem("cotizacion", JSON.stringify(cotizacionesRealizadas));
}

window.addEventListener("DOMContentLoaded", function () {
  // NUEVO: Contenido cargado
  console.log("EL DOM SE CARGO");

  cotizacionesRealizadas = JSON.parse(localStorage.getItem("cotizacion")) || [];
  agregarCotizacion();

  if (cotizacionesRealizadas.length > 0) {
    escribirHistorico();
  }
});

const checkNumero = (val) => {
  let number = parseInt(val);

  if (/[^0-9]/g.test(number) && typeof number === "number") {
    return false;
  }
  return true;
};

const cargarTipoCambio = async () => {
  const datosFetch = await fetch("/assets/db/cambio.json")
    .then((resp) => resp.json())
    .then((data) => data);

  tiposCambio = datosFetch;

  console.log(tiposCambio);

  tiposCambio.forEach((element, index) => {
    // tiposCambioUSD.innerHTML += `<p>${element.tipo}</p>
    // ${element.categoria1}  ${element.categoria2}</p>
    // ${element.valor1}  ${element.valor2}</p>`;

    tiposCambioUSD.innerHTML += `<hr>
    <p>${element.tipo}</p>
    <table class="table">
      <thead>
        <tr>
          <th class="text-center" scope="col">${element.categoria1}</th>
          <th class="text-center" scope="col">${element.categoria2}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-center" scope="col">${element.valor1}</td>
          <td class="text-center" scope="col">${element.valor2}</td>
        </tr>
      </tbody>
    </table>`;
  });
};

function cotizador() {
  if (cotizacionesRealizadas.length > 0) {
    escribirHistorico();
  }

  // Validamos el campo referencia
  referencia.addEventListener("input", (e) => {});

  costoHoraFunc();
  herramientasSiNo();

  // Validamos el campo trabajo
  trabajoProg.addEventListener("click", (e) => {
    precioHora = 20;
    console.log(precioHora);
    trabajo = "Programador";

    costoHoraFunc();

    console.log("Programador");
  });

  trabajoElect.addEventListener("click", (e) => {
    precioHora = 15;
    trabajo = "Electricista";

    costoHoraFunc();

    console.log("Electricista");
  });

  trabajoAsist.addEventListener("click", (e) => {
    precioHora = 14;
    trabajo = "Asistencia Tecnica";

    costoHoraFunc();

    console.log("Asistencia Tecnica");
  });

  // Validamos el campo herramientas

  herramientasSi.addEventListener("click", (e) => {
    validaHerramientas = "Si";
    precioHoraHerr = 1.25;
    herramientasSiNo();
  });

  herramientasNo.addEventListener("click", (e) => {
    validaHerramientas = "No";
    precioHoraHerr = 1;
    herramientasSiNo();
  });

  // Validamos el campo personas
  personas.addEventListener("input", (e) => {
    let validaPersonas = checkNumero(e.target.value);
    if (validaPersonas) {
      error_personas.style.display = "none";
      error_personas.innerHTML = ``;
    } else {
      error_personas.style.display = "block";
      error_personas.innerHTML = `Debe ingresar sólo numeros`;
    }
  });

  // Validamos el campo dias
  dias.addEventListener("input", (e) => {
    let validaDias = checkNumero(e.target.value);
    if (validaDias) {
      error_dias.style.display = "none";
      error_dias.innerHTML = ``;
    } else {
      error_dias.style.display = "block";
      error_dias.innerHTML = `Debe ingresar sólo numeros`;
    }
  });

  // Validamos el campo horas
  horas.addEventListener("input", (e) => {
    let validaHoras = checkNumero(e.target.value);
    if (validaHoras) {
      error_horas.style.display = "none";
      error_horas.innerHTML = ``;
    } else {
      error_horas.style.display = "block";
      error_horas .innerHTML = `Debe ingresar solo numeros`;
    }
  });

  cambioAUsar.addEventListener("input", (e) => {
    let validaCambio = checkNumero(e.target.value);
  });

  // Seleccionamos el formulario
  let formulario = document.querySelector("#formulario");

  // Input de error
  let error_referencia = document.querySelector("#error_referencia");
  let error_trabajo = document.querySelector("#error_trabajo");
  let error_herramientas = document.querySelector("#error_herramientas");
  let error_personas = document.querySelector("#error_personas");
  let error_dias = document.querySelector("#error_dias");
  let error_horas = document.querySelector("#error_horas");

  error_referencia.style.display = "none";
  error_trabajo.style.display = "none";
  error_herramientas.style.display = "none";
  error_personas.style.display = "none";
  error_dias.style.display = "none";
  error_horas.style.display = "none";

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    // guardamos datos que ingresamos en los input
    let referencia = document.querySelector("#referencia").value;
    let herramientas = validaHerramientas;
    let personas = document.querySelector("#personas").value;
    let dias = document.querySelector("#dias").value;
    let horas = document.querySelector("#horas").value;

    if (referencia && precioHora && herramientas && personas && dias && horas) {
      costoTotal = dias * precioHora * precioHoraHerr * personas * horas;
      console.log(costoTotal);
      console.log(precioHoraHerr);

      const generarId = () => Math.random().toString(36).substring(2, 18);

      cotizacion.id = generarId();
      cotizacion.referencia = referencia;
      cotizacion.trabajo = trabajo;
      cotizacion.herramientas = herramientas;
      cotizacion.personas = personas;
      cotizacion.dias = dias;
      cotizacion.horas = horas;
      cotizacion.costoTotal = costoTotal;

      let cotizaciones = [];

      cotizaciones.push(cotizacion);

      cotizacionesRealizadas = [...cotizacionesRealizadas, ...cotizaciones];

      agregarCotizacion();

      document.location.reload();

      console.log(cotizacion);
      console.log(cotizaciones);
      console.log(cotizacionesRealizadas);
    } else {
      alert("Debe llenar los campos");
    }
  });

  formulario.addEventListener("reset", function (e) {
    e.preventDefault();

    document.location.reload();
  });

  formularioCambio.addEventListener("submit", function (e) {
    e.preventDefault();

    console.log("Diego Ingresado");

    // guardamos datos que ingresamos en los input
    let cambioAUsar = document.querySelector("#cambioAUsar").value;
  
    totalCotizadoARS = totalCotizado*cambioAUsar;

    console.log(totalCotizado);
    console.log(cambioAUsar);
    console.log(totalCotizadoARS);
    
    const totalCotizadoARSFormateado = new Intl.NumberFormat("es-PE", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(totalCotizadoARS);
    
    console.log(totalCotizadoARSFormateado);
    
    infoTotalCotizadoARS.innerHTML = `${totalCotizadoARSFormateado}`;
    
  });
}

cotizador();

function agregarCotizacion() {
  tabla.innerHTML = ``;
  cotizacionesRealizadas.forEach((element) => {
    totalCotizado += element.costoTotal;

    tabla.innerHTML += `<tr>
             <td class="text-center">${element.referencia}</td>
             <td class="text-center">${element.trabajo}</td>
             <td class="text-center">${element.herramientas}</td>
             <td class="text-center">USD ${new Intl.NumberFormat("es-PE", {
               style: "decimal",
               minimumFractionDigits: 2,
               maximumFractionDigits: 2,
             }).format(element.costoTotal)}</td>
             <td class="text-center"><a href="#" id="${
               element.id
             }" class="borrarCotizacion" data-id="1">X</a></td>
           </tr>`;
  });

  cargarTipoCambio();

  console.log(tiposCambio.valor1);

  const totalCotizadoFormateado = new Intl.NumberFormat("es-PE", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalCotizado);

  console.log(totalCotizadoFormateado);

  infoTotalCotizado.innerHTML += `${totalCotizadoFormateado}`;

  // Seleccionamos el boton eliminar
  let buttonDelete = document.querySelectorAll(".borrarCotizacion");

  // Lo recorremos
  buttonDelete.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();

      let id = e.target.id;
      console.log(id);
      cotizacionesRealizadas = cotizacionesRealizadas.filter(
        (elemento) => elemento.id != id
      );

      console.log("Salida de cotizacionesRealizadas", cotizacionesRealizadas);
      agregarCotizacion();
    });
  });

  sincronizarConLocalStorage();
}





