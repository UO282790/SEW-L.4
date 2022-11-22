class Calculadora {
  constructor() {
    this.operando1 = "";
    this.decimal1 = false;
    this.operando2 = "";
    this.decimal2 = false;

    this.operador = "";

    this.pantalla = " 0";

    this.M = "";
  }

  on() {
    // Clear memory
    this.M = "";
    this.clr();
  }

  clr() {
    // Lógica
    this.operando1 = "";
    this.decimal1 = false;
    this.operando2 = "";
    this.decimal2 = false;

    this.operador = "";

    this.pantalla = " 0";

    // Presentación
    document
      .querySelector("section input[type=text]")
      .setAttribute("value", this.pantalla + "");
  }

  digitos(digito) {
    // Lógica
    if (this.operador == "") {
      this.operando1 = this.operando1 + "" + digito;
      var txt = this.pantalla;

      if (this.pantalla == " 0") {
        this.pantalla = " " + digito;
      } else {
        this.pantalla = txt + "" + digito;
      }
    } else {
      this.operando2 = this.operando2 + "" + digito;
      var txt = this.pantalla;
      this.pantalla = txt + "" + digito;
    }

    // Presentación
    // var txt = this.pantalla;
    // this.pantalla = txt + "" + digito;
    document
      .querySelector("section input[type=text]")
      .setAttribute("value", this.pantalla + "");
  }

  punto() {
    // Si hay al menos un operando escrito
    if (this.operando1 != "") {
      // Si hay dos operandos escritos
      if (this.operando2 != "") {
        // Y no hemos puesto un punto todavia...
        if (!this.decimal2) {
          this.opernado2 += ".";
          var txt = this.pantalla;
          this.pantalla = txt + ".";
          this.decimal2 = true;
        }
      } else {
        // Si solo hay un operando y no hemos puesto un punto todavia...
        if (!this.decimal1) {
          this.opernado1 += ".";
          var txt = this.pantalla;
          this.pantalla = txt + ".";
          this.decimal1 = true;
        }
      }

      document
        .querySelector("section input[type=text]")
        .setAttribute("value", this.pantalla + "");
    }
  }

  suma() {
    if (this.operador == "" && this.operando1 != "") {
      // Lógica
      this.operador = "+";

      // Presentación
      var txt = this.pantalla;
      this.pantalla = txt + "+";
      document
        .querySelector("section input[type=text]")
        .setAttribute("value", this.pantalla + "");
    } else {
      this.igual();
      this.suma();
    }
  }

  resta() {
    if (this.operador == "" && this.operando1 != "") {
      // Lógica
      this.operador = "-";

      // Presentación
      var txt = this.pantalla;
      this.pantalla = txt + "-";
      document
        .querySelector("section input[type=text]")
        .setAttribute("value", this.pantalla + "");
    } else {
      this.igual();
      this.resta();
    }
  }

  multi() {
    if (this.operador == "" && this.operando1 != "") {
      // Lógica
      this.operador = "*";

      // Presentación
      var txt = this.pantalla;
      this.pantalla = txt + "*";
      document
        .querySelector("section input[type=text]")
        .setAttribute("value", this.pantalla + "");
    } else {
      this.igual();
      this.multi();
    }
  }

  div() {
    if (this.operador == "" && this.operando1 != "") {
      // Lógica
      this.operador = "/";

      // Presentación
      var txt = this.pantalla;
      this.pantalla = txt + "/";
      document
        .querySelector("section input[type=text]")
        .setAttribute("value", this.pantalla + "");
    } else {
      this.igual();
      this.div();
    }
  }

  mrc() {
    this.pantalla = this.M;
    this.operando1 = this.M;
    this.operador = "";
    this.operando2 = "";
    document
      .querySelector("section input[type=text]")
      .setAttribute("value", this.pantalla + "");
  }

  mMenos() {
    this.igual();
    this.M = eval(new Number(this.M) - new Number(this.operando1)) + "";
    this.clr();
  }

  mMas() {
    this.igual();
    this.M = eval(new Number(this.operando1) + new Number(this.M)) + "";
    this.clr();
  }

  igual() {
    // Cálculo
    var evaluated = Number(eval(this.pantalla));

    // Lógica
    this.operando1 = evaluated + "";
    this.operando2 = "";
    this.operador = "";
    this.pantalla = " " + evaluated;

    // Presentación
    document
      .querySelector("section input[type=text]")
      .setAttribute("value", this.pantalla + "");
  }

  porciento() {
    // Lógica
    if (this.operando1 == "") this.operando1 = this.operando1 + "/(100)";
    else this.operando2 = this.operando2 + "/(100)";

    // Presentación
    var txt = this.pantalla;
    this.pantalla = this.pantalla + "/(100)";
    document
      .querySelector("section input[type=text]")
      .setAttribute("value", this.pantalla + "");

    this.igual();
  }

  negate() {
    // Lógica
    if (this.operando1 == "") this.operando1 = "-" + this.operando1;
    else this.operando2 = "-" + this.operando2;

    // Presentación
    var txt = this.pantalla;
    this.pantalla = this.pantalla + "*(-1)";
    document
      .querySelector("section input[type=text]")
      .setAttribute("value", this.pantalla + "");

    this.igual();
  }

  sqrt() {
    // Lógica
    if (this.operando1 != "" || this.operando2 != "" || this.operando1 != "0") {
      if (this.operando2 == "")
        this.operando1 = "Math.sqrt(" + this.operando1 + ")";
      else this.operando2 = "Math.sqrt(" + this.operando2 + ")";

      // Presentación
      var txt = this.pantalla;
      this.pantalla = this.operando1 + this.operador + this.operando2;
      document
        .querySelector("section input[type=text]")
        .setAttribute("value", this.pantalla + "");

      this.igual();
    }
  }
}

//------------------------------------------------------------
("use strict");
var calcu = new Calculadora();

function calc() {
  return calcu;
}

// Funciones de teclado
document.addEventListener("keydown", (event) => {
  const keyName = event.key;
  switch (keyName) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      calc().digitos(parseInt(keyName));
      break;
    case "+":
      calc().suma();
      break;
    case "-":
      calc().resta();
      break;
    case "*":
      calc().multi();
      break;
    case "/":
      calc().div();
      break;
    case ".":
      calc().punto();
      break;
    case "Backspace":
      calc().clr();
      break;
    case "Enter":
      calc().igual();
      break;
    default:
    //alert("Pulsado :" + keyName);
  }
});
