class Calculadora{
    constructor(){
        this.pantalla = "";
        this.content = 0;
    }

    pressBoton(btn){
        pantalla = pantalla + "" + btn;
        document.getElementById("display").setAttribute("value", " " + btn);
    }
     
}

function pressBoton(boton){    
    calc.pressBoton(boton);
}

var calc = new Calculadora();