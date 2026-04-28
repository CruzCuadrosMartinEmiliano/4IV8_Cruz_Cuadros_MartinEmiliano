function validarn(e){
var teclado = (document.all)?e.KeyCode:e.which; // de teclado si estas oprimiendo algo vas a obtener su codigo correspondiente a esa tecla 
//caso contrario desechalo
if (teclado == 8)return true;
// expresion regular sirve para que solo se puedan escribir numeros del 1 al 9 y  el .
var patron =/[0-9 \d .]/;
var codigo = String.fromCharCode(teclado);
return patron.test(codigo);
}
function interes(){
    var valor = document.getElementById('cantidadi').value;
    var interes = parseFloat(valor);
    var subtotal = interes * 0.10;
    var total = subtotal + interes;
// esto es para mostrar el resultado del anterior en el input sueldoi
    document.getElementById('sueldoi').value= "$ "+total;
}
function Borrando(){
    document.getElementById('sueldoi').value=" ";
    document.getElementById('cantidadi').value=" ";
}