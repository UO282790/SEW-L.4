class Calculadora {
  constructor() {
    this.operando1 = "";
    this.decimal1 = false;
    this.operando2 = "";
    this.decimal2 = false;

    this.operador = "";

    this.pantalla = " 0";

    this.M = "";

    this.asginaTeclado();
  }

  refresh() {
    document
      .querySelector("section input[type=text]")
      .setAttribute("value", this.pantalla + "");
  }

  asginaTeclado() {
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
    try {
      let toEval = this.pantalla.replaceAll("!", '["factorial"]()');
      var evaluated = Number(eval(toEval));

      // Lógica
      this.operando1 = evaluated + "";
      this.operando2 = "";
      this.operador = "";
      this.pantalla = " " + evaluated;

      // Presentación
      document
        .querySelector("section input[type=text]")
        .setAttribute("value", this.pantalla + "");
    } catch (error) {}
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

// -----------------------------------------------------------

class CalculadoraCientifica extends Calculadora {
  constructor() {
    super();
    this.hyp = false;
    this.shft = false;
    this.degreeMode = "DEG";
  }

  ms() {
    this.igual();
    this.M = eval(new Number(this.operando1)) + "";
    this.clr();
  }

  mc() {
    super.M = "0";
  }

  mr() {
    super.mrc();
  }

  pi() {
    if (this.operando1 != "" && this.operando1 != "0" && this.operador == "") {
      var txt = this.pantalla;
      this.pantalla = this.pantalla + "*Math.PI";
      document
        .querySelector("section input[type=text]")
        .setAttribute("value", this.pantalla + "");
    } else if (this.operador != "") {
      var txt = this.pantalla;
      this.pantalla = this.pantalla + "Math.PI";
      document
        .querySelector("section input[type=text]")
        .setAttribute("value", this.pantalla + "");
    } else {
      var txt = this.pantalla;
      this.pantalla = "Math.PI";
      document
        .querySelector("section input[type=text]")
        .setAttribute("value", this.pantalla + "");
    }
  }

  deg() {
    if (this.degreeMode == "DEG") {
      this.degreeMode = "RAD";
      document
        .querySelector("section input[value='DEG']")
        .setAttribute("value", "RAD");
    } else if (this.degreeMode == "RAD") {
      this.degreeMode = "GRAD";
      document
        .querySelector("section input[value='RAD']")
        .setAttribute("value", "GRAD");
    } else if (this.degreeMode == "GRAD") {
      this.degreeMode = "DEG";
      document
        .querySelector("section input[value='GRAD']")
        .setAttribute("value", "DEG");
    }
  }

  power2() {
    if (
      (this.operando1 != "" && this.operador == "" && this.operando2 == "") ||
      (this.operando1 != "" && this.operador != "" && this.operando2 != "")
    ) {
      // Presentación
      var txt = this.pantalla + "**2";
      this.pantalla = txt;
      document
        .querySelector("section input[type=text]")
        .setAttribute("value", this.pantalla + "");

      this.igual();
    }
  }

  powerY() {
    if (this.operando1 != "" && this.operador == "" && this.operando2 == "") {
      this.operador = "**";

      var txt = this.pantalla + "**";
      this.pantalla = txt;
      document
        .querySelector("section input[type=text]")
        .setAttribute("value", this.pantalla + "");

      this.igual();
    }
  }

  sin() {
    if (this.hyp && this.shft) {
      // arcsinh
      if (
        this.operando1 != "" ||
        this.operando2 != "" ||
        this.operando1 != "0"
      ) {
        if (this.operando2 == "")
          this.operando1 = "Math.arcsinh(" + this.operando1 + ")";
        else this.operando2 = "Math.arcsinh(" + this.operando2 + ")";

        var txt = this.pantalla;
        this.pantalla = this.operando1 + this.operador + this.operando2;
        document
          .querySelector("section input[type=text]")
          .setAttribute("value", this.pantalla + "");

        this.igual();
      }
    } else if (this.hyp && !this.shft) {
      // sinh
      if (
        this.operando1 != "" ||
        this.operando2 != "" ||
        this.operando1 != "0"
      ) {
        if (this.operando2 == "")
          this.operando1 = "Math.sinh(" + this.operando1 + ")";
        else this.operando2 = "Math.sinh(" + this.operando2 + ")";

        var txt = this.pantalla;
        this.pantalla = this.operando1 + this.operador + this.operando2;
        document
          .querySelector("section input[type=text]")
          .setAttribute("value", this.pantalla + "");

        this.igual();
      }
    } else if (!this.hyp && this.shft) {
      // arcsin
      if (
        this.operando1 != "" ||
        this.operando2 != "" ||
        this.operando1 != "0"
      ) {
        if (this.operando2 == "")
          this.operando1 = "Math.arcsin(" + this.operando1 + ")";
        else this.operando2 = "Math.arcsin(" + this.operando2 + ")";

        var txt = this.pantalla;
        this.pantalla = this.operando1 + this.operador + this.operando2;
        document
          .querySelector("section input[type=text]")
          .setAttribute("value", this.pantalla + "");

        this.igual();
      }
    } else if (!this.hyp && !this.shft) {
      // sin
      if (
        this.operando1 != "" ||
        this.operando2 != "" ||
        this.operando1 != "0"
      ) {
        if (this.operando2 == "")
          this.operando1 = "Math.sin(" + this.operando1 + ")";
        else this.operando2 = "Math.sin(" + this.operando2 + ")";

        var txt = this.pantalla;
        this.pantalla = this.operando1 + this.operador + this.operando2;
        document
          .querySelector("section input[type=text]")
          .setAttribute("value", this.pantalla + "");

        this.igual();
      }
    }
  }
  tan() {
    if (this.hyp && this.shft) {
      // arctanh
      if (
        this.operando1 != "" ||
        this.operando2 != "" ||
        this.operando1 != "0"
      ) {
        if (this.operando2 == "")
          this.operando1 = "Math.arctanh(" + this.operando1 + ")";
        else this.operando2 = "Math.arctanh(" + this.operando2 + ")";

        var txt = this.pantalla;
        this.pantalla = this.operando1 + this.operador + this.operando2;
        document
          .querySelector("section input[type=text]")
          .setAttribute("value", this.pantalla + "");

        this.igual();
      }
    } else if (this.hyp && !this.shft) {
      // tanh
      if (
        this.operando1 != "" ||
        this.operando2 != "" ||
        this.operando1 != "0"
      ) {
        if (this.operando2 == "")
          this.operando1 = "Math.tanh(" + this.operando1 + ")";
        else this.operando2 = "Math.tanh(" + this.operando2 + ")";

        var txt = this.pantalla;
        this.pantalla = this.operando1 + this.operador + this.operando2;
        document
          .querySelector("section input[type=text]")
          .setAttribute("value", this.pantalla + "");

        this.igual();
      }
    } else if (!this.hyp && this.shft) {
      // arctan
      if (
        this.operando1 != "" ||
        this.operando2 != "" ||
        this.operando1 != "0"
      ) {
        if (this.operando2 == "")
          this.operando1 = "Math.arctan(" + this.operando1 + ")";
        else this.operando2 = "Math.arctan(" + this.operando2 + ")";

        var txt = this.pantalla;
        this.pantalla = this.operando1 + this.operador + this.operando2;
        document
          .querySelector("section input[type=text]")
          .setAttribute("value", this.pantalla + "");

        this.igual();
      }
    } else if (!this.hyp && !this.shft) {
      // tan
      if (
        this.operando1 != "" ||
        this.operando2 != "" ||
        this.operando1 != "0"
      ) {
        if (this.operando2 == "")
          this.operando1 = "Math.tan(" + this.operando1 + ")";
        else this.operando2 = "Math.tan(" + this.operando2 + ")";

        var txt = this.pantalla;
        this.pantalla = this.operando1 + this.operador + this.operando2;
        document
          .querySelector("section input[type=text]")
          .setAttribute("value", this.pantalla + "");

        this.igual();
      }
    }
  }
  cos() {
    if (this.hyp && this.shft) {
      // arccosh
      if (
        this.operando1 != "" ||
        this.operando2 != "" ||
        this.operando1 != "0"
      ) {
        if (this.operando2 == "")
          this.operando1 = "Math.arccosh(" + this.operando1 + ")";
        else this.operando2 = "Math.arccosh(" + this.operando2 + ")";

        var txt = this.pantalla;
        this.pantalla = this.operando1 + this.operador + this.operando2;
        document
          .querySelector("section input[type=text]")
          .setAttribute("value", this.pantalla + "");

        this.igual();
      }
    } else if (this.hyp && !this.shft) {
      // cosh
      if (
        this.operando1 != "" ||
        this.operando2 != "" ||
        this.operando1 != "0"
      ) {
        if (this.operando2 == "")
          this.operando1 = "Math.cosh(" + this.operando1 + ")";
        else this.operando2 = "Math.cosh(" + this.operando2 + ")";

        var txt = this.pantalla;
        this.pantalla = this.operando1 + this.operador + this.operando2;
        document
          .querySelector("section input[type=text]")
          .setAttribute("value", this.pantalla + "");

        this.igual();
      }
    } else if (!this.hyp && this.shft) {
      // arccos
      if (
        this.operando1 != "" ||
        this.operando2 != "" ||
        this.operando1 != "0"
      ) {
        if (this.operando2 == "")
          this.operando1 = "Math.arccos(" + this.operando1 + ")";
        else this.operando2 = "Math.arccos(" + this.operando2 + ")";

        var txt = this.pantalla;
        this.pantalla = this.operando1 + this.operador + this.operando2;
        document
          .querySelector("section input[type=text]")
          .setAttribute("value", this.pantalla + "");

        this.igual();
      }
    } else if (!this.hyp && !this.shft) {
      // cos
      if (
        this.operando1 != "" ||
        this.operando2 != "" ||
        this.operando1 != "0"
      ) {
        if (this.operando2 == "")
          this.operando1 = "Math.cos(" + this.operando1 + ")";
        else this.operando2 = "Math.cos(" + this.operando2 + ")";

        var txt = this.pantalla;
        this.pantalla = this.operando1 + this.operador + this.operando2;
        document
          .querySelector("section input[type=text]")
          .setAttribute("value", this.pantalla + "");

        this.igual();
      }
    }
  }
  power10() {
    if (
      (this.operando1 == "" || this.operando1 == "0") &&
      this.operador == ""
    ) {
      var txt = "10**";
      this.operando1 = "10";
      this.operador = "**";
      this.pantalla = txt;
      document
        .querySelector("section input[type=text]")
        .setAttribute("value", this.pantalla + "");

      this.igual();
    }
  }
  log10() {
    if (this.operando1 != "" || this.operando2 != "" || this.operando1 != "0") {
      if (this.operando2 == "")
        this.operando1 = "Math.log10(" + this.operando1 + ")";
      else this.operando2 = "Math.log10(" + this.operando2 + ")";

      // Presentación
      var txt = this.pantalla;
      this.pantalla = this.operando1 + this.operador + this.operando2;
      document
        .querySelector("section input[type=text]")
        .setAttribute("value", this.pantalla + "");

      this.igual();
    }
  }
  exponente() {
    if (this.operando1 != "" || this.operando2 != "" || this.operando1 != "0") {
      if (this.operando2 == "")
        this.operando1 = "Math.exp(" + this.operando1 + ")";
      else this.operando2 = "Math.exp(" + this.operando2 + ")";

      // Presentación
      var txt = this.pantalla;
      this.pantalla = this.operando1 + this.operador + this.operando2;
      document
        .querySelector("section input[type=text]")
        .setAttribute("value", this.pantalla + "");

      this.igual();
    }
  }
  modulo() {
    if (this.operando1 != "" && this.operador == "" && this.operando2 == "") {
      this.operador = "%";

      var txt = this.pantalla + "%";
      this.pantalla = txt;
      document
        .querySelector("section input[type=text]")
        .setAttribute("value", this.pantalla + "");

      this.igual();
    }
  }
  delete() {
    if (this.operando1 != "")
      this.operando1 = this.pantalla.substring(0, this.operando1.length - 1);
    else this.operando2 = this.pantalla.substring(0, this.operando2.length - 1);

    this.pantalla = this.pantalla.substring(0, this.pantalla.length - 1);
    document
      .querySelector("section input[type=text]")
      .setAttribute("value", this.pantalla + "");
  }

  factorial() {
    if (
      (this.operando1 != "" && this.operador == "" && this.operando2 == "") ||
      (this.operando1 != "" && this.operador != "" && this.operando2 != "")
    ) {
      // Presentación

      var txt = this.pantalla + "!";
      this.pantalla = txt;
      document
        .querySelector("section input[type=text]")
        .setAttribute("value", this.pantalla + "");

      this.igual();
    }
  }

  pOpen() {
    var txt = this.pantalla + "(";
    this.pantalla = txt;
    document
      .querySelector("section input[type=text]")
      .setAttribute("value", this.pantalla + "");
  }

  pClose() {
    var txt = this.pantalla + ")";
    this.pantalla = txt;
    document
      .querySelector("section input[type=text]")
      .setAttribute("value", this.pantalla + "");
  }

  HYP() {
    if (this.shft) {
      if (this.hyp) {
        this.hyp = false;
        document
          .querySelector("section input[value='arcsinh']")
          .setAttribute("value", "arcsin");
        document
          .querySelector("section input[value='arccosh']")
          .setAttribute("value", "arccos");
        document
          .querySelector("section input[value='arctanh']")
          .setAttribute("value", "arctan");
      } else {
        this.hyp = true;
        document
          .querySelector("section input[value='arcsin']")
          .setAttribute("value", "arcsinh");
        document
          .querySelector("section input[value='arccos']")
          .setAttribute("value", "arccosh");
        document
          .querySelector("section input[value='arctan']")
          .setAttribute("value", "arctanh");
      }
    } else {
      if (this.hyp) {
        this.hyp = false;
        document
          .querySelector("section input[value='sinh']")
          .setAttribute("value", "sin");
        document
          .querySelector("section input[value='cosh']")
          .setAttribute("value", "cos");
        document
          .querySelector("section input[value='tanh']")
          .setAttribute("value", "tan");
      } else {
        this.hyp = true;
        document
          .querySelector("section input[value='sin']")
          .setAttribute("value", "sinh");
        document
          .querySelector("section input[value='cos']")
          .setAttribute("value", "cosh");
        document
          .querySelector("section input[value='tan']")
          .setAttribute("value", "tanh");
      }
    }
  }
  shift() {
    if (this.hyp) {
      if (this.shft) {
        this.shft = false;
        document
          .querySelector("section input[value='arcsinh']")
          .setAttribute("value", "sinh");
        document
          .querySelector("section input[value='arccosh']")
          .setAttribute("value", "cosh");
        document
          .querySelector("section input[value='arctanh']")
          .setAttribute("value", "tanh");
      } else {
        this.shft = true;
        document
          .querySelector("section input[value='sinh']")
          .setAttribute("value", "arcsinh");
        document
          .querySelector("section input[value='cosh']")
          .setAttribute("value", "arccosh");
        document
          .querySelector("section input[value='tanh']")
          .setAttribute("value", "arctanh");
      }
    } else {
      if (this.shft) {
        this.shft = false;
        document
          .querySelector("section input[value='arcsin']")
          .setAttribute("value", "sin");
        document
          .querySelector("section input[value='arccos']")
          .setAttribute("value", "cos");
        document
          .querySelector("section input[value='arctan']")
          .setAttribute("value", "tan");
      } else {
        this.shft = true;
        document
          .querySelector("section input[value='sin']")
          .setAttribute("value", "arcsin");
        document
          .querySelector("section input[value='cos']")
          .setAttribute("value", "arccos");
        document
          .querySelector("section input[value='tan']")
          .setAttribute("value", "arctan");
      }
    }
  }
}
//------------------------------------------------------------
("use strict");
var calcu = new CalculadoraCientifica();

function calc() {
  return calcu;
}

function c() {
  calcu = new CalculadoraCientifica();
  calcu.refresh();
}

// Factorial number prototype, as eval() does not accept Math.factorial()
// https://stackoverflow.com/questions/70760081/replacing-in-a-string-with-factorial-function-in-javascript
Number.prototype.factorial = function () {
  return this > 0 ? this * (this - 1).factorial() : 1;
};
