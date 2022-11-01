var costoTotal = 0;
var precioHora = 0;
var precioHoraHerr = 0;

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
  infoCostoTotal.innerHTML = `${
    cotizacionesRealizadas[cotizacionesRealizadas.length - 1].costoTotal
  }`;

  // escondemos el mensaje
  mensajeD.style.display = "block";
}

function costoHora(val) {
  let precio = 0;
  if (val == "programador" || val == "Programador" || val == "PROGRAMADOR") {
    console.log(1);
    precio = 20;
  } else if (
    val == "electricista" ||
    val == "Electricista" ||
    val == "ELECTRICISTA"
  ) {
    console.log(2);
    precio = 15;
  } else if (
    val == "asistencia tecnica" ||
    val == "Asistencia Tecnica" ||
    val == "ASISTENCIA TECNICA"
  ) {
    console.log(3);
    precio = 14;
  }

  return precio;
}

function sincronizarConLocalStorage() {
  localStorage.setItem("cotizacion", JSON.stringify(cotizacionesRealizadas));
}

//if (typeof window === "object") {
window.addEventListener("DOMContentLoaded", function () {
  // NUEVO: Contenido cargado
  console.log("EL DOM SE CARGO");

  cotizacionesRealizadas = JSON.parse(localStorage.getItem("cotizacion")) || [];
  agregarCotizacion();

  if (cotizacionesRealizadas.length > 0) {
    escribirHistorico();
  }

  const formatearSiNo = (val) => {
    if (val == "si" || val == "SI" || val == "sI" || val == "Si") {
      val = "Si";
      console.log("Si");
    } else if (val == "no" || val == "No" || val == "NO" || val == "nO") {
      val = "No";
      console.log("No");
    }
    return val;
  };

  const checkString = (val) => {
    if (/[a-zA-z]+$/.test(val) && val.length >= 1) {
      return true;
    }
    return false;
  };

  const checkNumero = (val) => {
    let number = parseInt(val);

    if (/[^0-9]/g.test(number) && typeof number === "number") {
      return false;
    }
    return true;
  };

  // Validamos el campo referencia
  referencia.addEventListener("input", (e) => {
    /*    let validaReferencia = checkString(e.target.value);
    if (validaReferencia) {
      error_referencia.style.display = "none";
      error_referencia.innerHTML = ``;
    } else {
      error_referencia.style.display = "block";
      error_referencia.innerHTML = `Debe ingresar numeros o letras`;
    }
  */
  });

  // Validamos el campo trabajo
  trabajo.addEventListener("input", (e) => {
    let validaTrabajo = checkString(e.target.value);
    precioHora = costoHora(e.target.value);
    if (
      validaTrabajo &&
      (precioHora == 20 || precioHora == 15 || precioHora == 14)
    ) {
      error_trabajo.style.display = "none";
      error_trabajo.innerHTML = ``;
    } else {
      error_trabajo.style.display = "block";
      error_trabajo.innerHTML = `Debe ingrese opcion correcta`;
    }
  });

  // Validamos el campo herramientas
  herramientas.addEventListener("input", (e) => {
    let validaHerramientas = checkString(e.target.value);
    if (validaHerramientas) {
      validaHerramientas = formatearSiNo(e.target.value);
      if (validaHerramientas == "Si") {
        precioHoraHerr = 1.25;
        error_herramientas.style.display = "none";
        error_herramientas.innerHTML = ``;
      } else if (validaHerramientas == "No") {
        precioHoraHerr = 1;
        error_herramientas.style.display = "none";
        error_herramientas.innerHTML = ``;
      }
    } else {
      error_herramientas.style.display = "block";
      error_herramientas.innerHTML = `Debe ingresar alguna opcion`;
    }
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
      error_horas.innerHTML = `Debe ingresar solo numeros`;
    }
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
    let trabajo = document.querySelector("#trabajo").value;
    let herramientas = document.querySelector("#herramientas").value;
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

      console.log(cotizacion);
      console.log(cotizaciones);
      console.log(cotizacionesRealizadas);
    } else {
      alert("Debe llenar los campos");
    }
  });

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    // guardamos datos que ingresamos en los input
    let referencia = document.querySelector("#referencia").value;
    let trabajo = document.querySelector("#trabajo").value;
    let herramientas = document.querySelector("#herramientas").value;
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

      document.location.reload();

      console.log(cotizacion);
      console.log(cotizaciones);
      console.log(cotizacionesRealizadas);
    } else {
      alert("Debe llenar los campos");
    }
  });
});

function agregarCotizacion() {
  let totalCotizado = 0;
  tabla.innerHTML = ``;
  cotizacionesRealizadas.forEach((element, index) => {
    totalCotizado += element.costoTotal;
    tabla.innerHTML += `<tr>
             <td class="text-center">${element.referencia}</td>
             <td class="text-center">${element.trabajo}</td>
             <td class="text-center">${element.herramientas}</td>

             <td class="text-center">USD${element.costoTotal}</td>
             <td class="text-center"><a href="#" id="${element.id}" class="borrarCotizacion" data-id="1">X</a></td>
           </tr>`;
  });

  tabla.innerHTML += `<tr>
  <td class="text-center">Total Cotizado: USD${totalCotizado}</td>
  </tr>`;

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
