//vamos a programar todo bajo el esquema ES6 "Ema script 6"
/*
para java script ya conocemos el concepto de variable 

var es no tipado

se sustituye por las nuevas variables 

let  ---> es una  varible de tupo comillas protejida ya 
que solo funciona dentro de un fragmento de codigo

let no se puede sobreescribir en un  mismo fragemento de codigo

const ---> es una variable constante



if(true){
    const x="x";
    console.log(x);

}
let x = "y";
console.log(x);

*/
//para declarar en js las funciones hay una forma mas efectiva 
// para deckararkas y a partir de una funcion flecha

/**
una funcion en js a duferencia de una funcion normal,
no genera su propio contecto (this), necesita ser declarada
antes de ser usada y no necesita un return
*/
// funcion cosa (String hola){ this.hola = hola }
function sumarnumeros(n1,n2){
    return n1+n2;

}
const sumadosnumeros = (n1,n2) => n1+n2;
comsole.log('la suma de la funcion es: (2,3): ${sumarnumeros(2,3)}');

// para armar una funcion flecha debemos entender su estructura:
//"cadena"(el tipo de variable, nombre de la funcion y los argumentos ) => operacion

const razadeperros = [
    "gran danes",
    "Doverman",
    "chihuahua",
    "Pastor Aleman",
    "pitbull",
    "San Bernardo",
    "Xoloscuincle"
];
/*
for(let i =0; i < razadeperros.length; i++){
    console.log(razadeperros[i]);
}
for(const raza of razadeperros){
    console.log(raza);

}
for(const indice  in razadeperros){
    console.log(razadeperros[indice]);
}
    forEach pro acda elemento recorre
    iterar sobre elementos de arreglo que devuelven nada
la funcion flecha es un callback que agarra algo de un lado y lo imprime
*/
// razadeperros.forEach((raza,indice,arregloOriginal) => console.log(raza));
//razadeperros.forEach(raza => console.log(raza));
//esta es una forma  mas facil de hacerlo

// por ejemplo  necesitamos una funcion para bsucar la raza chihuahua y si no existe agregarla
// function map esta funcion itera sobre los elementos del arreglo y regresa un arreglo diferente con el podemos hacer lo q
// queramos sin necesitdad de modificar el arreglo original

//const razadeperrosEnMayusculas = razadeperros.map(raza=> console.log(raza.toUpperCase()));

if(razadeperros.find(raza => raza === "chihuahua")){
    console.log("La raza si se encontro y es Chihuahua");
    console.log(razadeperros);
}
else{
    razadeperros.push()
}