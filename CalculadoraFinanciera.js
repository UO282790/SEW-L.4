class PilaLIFO {
  constructor() {
    this.stack = new Array();
  }

  clear() {
    this.stack = new Array();
  }

  push(valor) {
    this.stack.push(valor);
  }
  pop() {
    if (this.stack.length >= 1) return this.stack.pop();
    else return NaN;
  }

  size() {
    return this.stack.length;
  }

  isEmpty() {
    return this.stack.length == 0;
  }

  print() {
    var stringPila = "";
    for (var i in this.stack) stringPila += this.stack[i] + " = [" + i + "]\n";
    return stringPila;
  }
}

// --------------------------------------------------

class CalculadoraRPN {
  constructor() {
    this.stack = new PilaLIFO();
    this.screen = "";
    this.stackScreen = "";

    this.decimal = false;

    this.asginaTeclado();
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
          calc().enter();
          break;
        default:
        //alert("Pulsado :" + keyName);
      }
    });
  }

  enter() {
    if (this.screen != "") {
      this.stack.push(new Number(this.screen));
      document.querySelector("section textarea").value = this.stack.print();
    }
    this.screen = "";
    document
      .querySelector("section input[type = 'text']")
      .setAttribute("value", this.screen + "");

    this.decimal = false;
  }

  clr() {
    this.stack = new PilaLIFO();
    this.screen = "";
    this.decimal = false;
    document
      .querySelector("section input[type = 'text']")
      .setAttribute("value", this.screen + "");
    this.stackScreen = "";
    document.querySelector("section textarea").value = this.stack.print();
  }

  digitos(digito) {
    this.screen = this.screen + digito + "";
    document
      .querySelector("section input[type = 'text']")
      .setAttribute("value", this.screen + "");
  }

  punto() {
    if (!this.decimal) {
      this.decimal = true;
      this.screen = this.screen + ".";
      document
        .querySelector("section input[type = 'text']")
        .setAttribute("value", this.screen + "");
    }
  }

  //----------

  multi() {
    if (this.screen == "" && this.stack.size() >= 1) {
      var op1 = new Number(this.stack.pop());
      var op2 = new Number(this.stack.pop());

      this.screen = op1 * op2;
      document
        .querySelector("section input[type = 'text']")
        .setAttribute("value", this.screen + "");
      this.stackScreen = "";
      document.querySelector("section textarea").value = this.stack.print();
    } else if (this.stack.size() >= 1 && this.screen != "") {
      this.enter();
      this.multi();
    }
  }
  div() {
    if (this.screen == "" && this.stack.size() >= 1) {
      var op1 = new Number(this.stack.pop());
      var op2 = new Number(this.stack.pop());

      this.screen = op2 / op1;
      document
        .querySelector("section input[type = 'text']")
        .setAttribute("value", this.screen + "");
      this.stackScreen = "";
      document.querySelector("section textarea").value = this.stack.print();
    } else if (this.stack.size() >= 1 && this.screen != "") {
      this.enter();
      this.div();
    }
  }
  resta() {
    if (this.screen == "" && this.stack.size() >= 1) {
      var op1 = new Number(this.stack.pop());
      var op2 = new Number(this.stack.pop());

      this.screen = op2 - op1;
      document
        .querySelector("section input[type = 'text']")
        .setAttribute("value", this.screen + "");
      this.stackScreen = "";
      document.querySelector("section textarea").value = this.stack.print();
    } else if (this.stack.size() >= 1 && this.screen != "") {
      this.enter();
      this.resta();
    }
  }
  suma() {
    if (this.screen == "" && this.stack.size() >= 1) {
      var op1 = new Number(this.stack.pop());
      var op2 = new Number(this.stack.pop());

      this.screen = op1 + op2;
      document
        .querySelector("section input[type = 'text']")
        .setAttribute("value", this.screen + "");
      this.stackScreen = "";
      document.querySelector("section textarea").value = this.stack.print();
    } else if (this.stack.size() >= 1 && this.screen != "") {
      this.enter();
      this.suma();
    }
  }
  sqrt() {
    if (this.screen == "" && !this.stack.isEmpty()) {
      var op = new Number(Math.sqrt(this.stack.pop()));

      this.screen = op;
      document
        .querySelector("section input[type = 'text']")
        .setAttribute("value", this.screen + "");
      this.stackScreen = "";
      document.querySelector("section textarea").value = this.stack.print();
    } else if (!this.stack.isEmpty() || this.screen != "") {
      this.enter();
      this.sqrt();
    }
  }

  power2() {
    if (this.screen == "" && !this.stack.isEmpty()) {
      var op = this.stack.pop();

      this.screen = op ** 2;
      document
        .querySelector("section input[type = 'text']")
        .setAttribute("value", this.screen + "");
      this.stackScreen = "";
      document.querySelector("section textarea").value = this.stack.print();
    } else if (!this.stack.isEmpty() || this.screen != "") {
      this.enter();
      this.power2();
    }
  }
  powerY() {
    if (this.screen == "" && this.stack.size() >= 1) {
      var op1 = new Number(this.stack.pop());
      var op2 = new Number(this.stack.pop());

      this.screen = op2 ** op1;
      document
        .querySelector("section input[type = 'text']")
        .setAttribute("value", this.screen + "");
      this.stackScreen = "";
      document.querySelector("section textarea").value = this.stack.print();
    } else if (this.stack.size() >= 1 && this.screen != "") {
      this.enter();
      this.powerY();
    }
  }
  power10() {
    if (this.screen == "" && !this.stack.isEmpty()) {
      var op = this.stack.pop();

      this.screen = 10 ** op;
      document
        .querySelector("section input[type = 'text']")
        .setAttribute("value", this.screen + "");
      this.stackScreen = "";
      document.querySelector("section textarea").value = this.stack.print();
    } else if (!this.stack.isEmpty() || this.screen != "") {
      this.enter();
      this.power10();
    }
  }
  log10() {
    if (this.screen == "" && !this.stack.isEmpty()) {
      var op = this.stack.pop();

      this.screen = Math.log10(op);
      document
        .querySelector("section input[type = 'text']")
        .setAttribute("value", this.screen + "");
      this.stackScreen = "";
      document.querySelector("section textarea").value = this.stack.print();
    } else if (!this.stack.isEmpty() || this.screen != "") {
      this.enter();
      this.log10();
    }
  }
  exponente() {
    if (this.screen == "" && !this.stack.isEmpty()) {
      var op = this.stack.pop();

      this.screen = Math.exp(op);
      document
        .querySelector("section input[type = 'text']")
        .setAttribute("value", this.screen + "");
      this.stackScreen = "";
      document.querySelector("section textarea").value = this.stack.print();
    } else if (!this.stack.isEmpty() || this.screen != "") {
      this.enter();
      this.exponente();
    }
  }

  sin() {
    if (this.screen == "" && !this.stack.isEmpty()) {
      var op = new Number(Math.sin(this.stack.pop()));

      this.screen = op;
      document
        .querySelector("section input[type = 'text']")
        .setAttribute("value", this.screen + "");
      this.stackScreen = "";
      document.querySelector("section textarea").value = this.stack.print();
    } else if (!this.stack.isEmpty() || this.screen != "") {
      this.enter();
      this.sin();
    }
  }
  cos() {
    if (this.screen == "" && !this.stack.isEmpty()) {
      var op = new Number(Math.cos(this.stack.pop()));

      this.screen = op;
      document
        .querySelector("section input[type = 'text']")
        .setAttribute("value", this.screen + "");
      this.stackScreen = "";
      document.querySelector("section textarea").value = this.stack.print();
    } else if (!this.stack.isEmpty() || this.screen != "") {
      this.enter();
      this.cos();
    }
  }
  tan() {
    if (this.screen == "" && !this.stack.isEmpty()) {
      var op = new Number(Math.tan(this.stack.pop()));

      this.screen = op;
      document
        .querySelector("section input[type = 'text']")
        .setAttribute("value", this.screen + "");
      this.stackScreen = "";
      document.querySelector("section textarea").value = this.stack.print();
    } else if (!this.stack.isEmpty() || this.screen != "") {
      this.enter();
      this.tan();
    }
  }
  arcsin() {
    if (this.screen == "" && !this.stack.isEmpty()) {
      var op = new Number(Math.arcsin(this.stack.pop()));

      this.screen = op;
      document
        .querySelector("section input[type = 'text']")
        .setAttribute("value", this.screen + "");
      this.stackScreen = "";
      document.querySelector("section textarea").value = this.stack.print();
    } else if (!this.stack.isEmpty() || this.screen != "") {
      this.enter();
      this.arcsin();
    }
  }
  arccos() {
    if (this.screen == "" && !this.stack.isEmpty()) {
      var op = new Number(Math.arccos(this.stack.pop()));

      this.screen = op;
      document
        .querySelector("section input[type = 'text']")
        .setAttribute("value", this.screen + "");
      this.stackScreen = "";
      document.querySelector("section textarea").value = this.stack.print();
    } else if (!this.stack.isEmpty() || this.screen != "") {
      this.enter();
      this.arccos();
    }
  }
  arctan() {
    if (this.screen == "" && !this.stack.isEmpty()) {
      var op = new Number(Math.arctan(this.stack.pop()));

      this.screen = op;
      document
        .querySelector("section input[type = 'text']")
        .setAttribute("value", this.screen + "");
      this.stackScreen = "";
      document.querySelector("section textarea").value = this.stack.print();
    } else if (!this.stack.isEmpty() || this.screen != "") {
      this.enter();
      this.arctan();
    }
  }

  modulo() {
    if (this.screen == "" && this.stack.size() >= 1) {
      var op1 = new Number(this.stack.pop());
      var op2 = new Number(this.stack.pop());

      let res = op2 % op1;
      this.screen = res;
      document
        .querySelector("section input[type = 'text']")
        .setAttribute("value", this.screen + "");
      this.stackScreen = "";
      document.querySelector("section textarea").value = this.stack.print();
    } else if (this.stack.size() >= 1 && this.screen != "") {
      5;

      this.enter();
      this.modulo();
    }
  }
  pi() {
    if (this.screen == "") {
      this.screen = Math.PI + "";
      document
        .querySelector("section input[type = 'text']")
        .setAttribute("value", this.screen + "");
    }
  }

  iSimple() {
    if (this.screen == "" && this.stack.size() >= 2) {
      var op1 = new Number(this.stack.pop());
      var op2 = new Number(this.stack.pop());
      var op3 = new Number(this.stack.pop());

      this.screen = op1 * op2 * op3;
      document
        .querySelector("section input[type = 'text']")
        .setAttribute("value", this.screen + "");
      this.stackScreen = "";
      document.querySelector("section textarea").value = this.stack.print();
    } else if (this.stack.size() >= 2 && this.screen != "") {
      this.enter();
      this.iSimple();
    }
  }

  iComp() {
    if (this.screen == "" && this.stack.size() >= 2) {
      var op1 = new Number(this.stack.pop());
      var op2 = new Number(this.stack.pop());
      var op3 = new Number(this.stack.pop());

      this.screen = op3 + (1 + op2) ** op1;
      document
        .querySelector("section input[type = 'text']")
        .setAttribute("value", this.screen + "");
      this.stackScreen = "";
      document.querySelector("section textarea").value = this.stack.print();
    } else if (this.stack.size() >= 2 && this.screen != "") {
      this.enter();
      this.iComp();
    }
  }
}

// ---------------------
("use strict");
let calcu = new CalculadoraRPN();

function calc() {
  return calcu;
}
