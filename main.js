/** El cine
 * Se conoce que el precio general de la entrada al cine es de $2
 * Si es una persona de la tercera edad, entonces se otorga un 50% de descuento
 * Para los estudiantes se les otorga un 40% de descuento si es miércoles (1=lunes)
 * Se conoce de cada persona que llega al cine: su nombre, el tipo de persona
 * (1=General, 2=Estudiante, 3=Tercera edad), para los estudiantes se conoce el día
 * Se requiere: dado los datos de una persona, calcular el precio de su entrada.
 * Para el cine, a. determinar la cantidad de personas que asistieron, b. el porcentaje de
 * personas de la tercera edad, c. el monto total pagado por estudiantes y d. el monto
 * total recaudado
 * Usar herencia
 * Ej:
 * nombre tipo dia descuento() precioEntrada()+
 * Ana     2    2     $0.0          $2.0
 * Carla   1    -     $0.0          $2.0
 * Luis    3    -     $1.0          $1.0
 * Leo     2    3     $0.8          $1.2
 * R.a cantidadPersonasAsistieron()=4
 * R.b porcentajePersonas3raEdad()=25%
 * R.c montoTotalPagadoEstuds()=$3.2
 * R.d montoTotalRecaudado()=$6.2
 */

class Cl_mPersona {
   constructor(nombre = "", tipo) {
      this.nombre = nombre;
      this.tipo = tipo;
   }

   precioEntrada() {
      return this.entradaGral();
   }

   entradaGral() {
      return 2;
   }
}

class Cl_mAdultoMayor extends Cl_mPersona {
   precioEntrada() {
      return this.entradaGral() * 0.5;
   }
}

class Cl_mEstudiante extends Cl_mPersona {
   constructor(nombre, tipo, dia = 0) {
      super(nombre, tipo);
      this.dia = dia;
   }

   precioEntrada() {
      return this.entradaGral() * (this.dia === 3 ? 0.6 : 1);
   }
}

class Cl_mCine {
   constructor() {
      this.cntPersonas =
         this.cnt3raEdad =
         this.acumMontoTotal =
         this.acumMontoEstuds =
            0;
   }

   procesarPersona(p) {
      this.cntPersonas++;
      this.acumMontoTotal += p.precioEntrada();
      if (p.tipo === 2) this.acumMontoEstuds += p.precioEntrada();
      else if (p.tipo === 3) this.cnt3raEdad++;
   }

   cantidadPersonasAsistieron() {
      return this.cntPersonas;
   }

   porcentajePersonas3raEdad() {
      return this.cntPersonas === 0
         ? 0
         : (this.cnt3raEdad / this.cntPersonas) * 100;
   }

   montoTotalPagadoEstuds() {
      return this.acumMontoEstuds;
   }

   montoTotalRecaudado() {
      return this.acumMontoTotal;
   }
}

let cine = new Cl_mCine();

let persona1 = new Cl_mEstudiante("Ana", 2, 2);
let persona2 = new Cl_mPersona("Carla", 1);
let persona3 = new Cl_mAdultoMayor("Luis", 3);
let persona4 = new Cl_mEstudiante("Leo", 2, 3);

cine.procesarPersona(persona3);
cine.procesarPersona(persona1);
cine.procesarPersona(persona2);
cine.procesarPersona(persona4);

let salida = document.getElementById("app");
salida.innerHTML = "Resultados:";
salida.innerHTML += "<br>Precio entrada persona 1= " + persona1.precioEntrada();
salida.innerHTML += "<br>Precio entrada persona 2= " + persona2.precioEntrada();
salida.innerHTML += "<br>Precio entrada persona 3= " + persona3.precioEntrada();
salida.innerHTML += "<br>Precio entrada persona 4= " + persona4.precioEntrada();
salida.innerHTML += "<br>";
salida.innerHTML +=
   "<br>R.1: Cantidad de personas que asistieron= " +
   cine.cantidadPersonasAsistieron();
salida.innerHTML += `<br>R.2: Porcentaje de personas de la 3ra edad=${cine.porcentajePersonas3raEdad()}%`;
salida.innerHTML += `<br>R.3: Monto Total pagado por estudiantes=$${cine.montoTotalPagadoEstuds()}`;
salida.innerHTML += `<br>R.4: Monto Total recaudado=$${cine.montoTotalRecaudado()}`;
