function problema1 (){
    var p1 = document.getElementById("p1-input").value;
    var noingresar = /[.,-_;]/;
    // veo que p1 no contenga ninguno de estos caracteres
    if(noingresar.test(p1)){
        // si los tiene 
        alert("Solo se permiten espacios para separar las palabras ");
        return;
    }
    
    var palabrasInvertidas = p1.split(' ').reverse().join('');
    
    document.querySelector('#p1-output').textContent = palabrasInvertidas;

}

function problema2(){
    var p2_x1= document.querySelector("#p2_x1").value;
    var p2_x2= document.querySelector("#p2_x2").value;
    var p2_x3= document.querySelector("#p2_x3").value;
    var p2_x4= document.querySelector("#p2_x4").value;
    var p2_x5= document.querySelector("#p2_x5").value;


    var p2_y1= document.querySelector("#p2_y1").value;
    var p2_y2= document.querySelector("#p2_y2").value;
    var p2_y3= document.querySelector("#p2_y3").value;
    var p2_y4= document.querySelector("#p2_y4").value;
    var p2_y5= document.querySelector("#p2_y5").value;
    
    //creando vectores 

    var v1 = [p2_x1,p2_x2,p2_x3,p2_x4,p2_x5];
    var v2 = [p2_y1,p2_y2,p2_y3,p2_y4,p2_y5];
    //primero vamos a ordenar los metodos para permutarlos con el metodo sort
    
    v1=v1.sort(function(a,b){return b-a;});
    v2=v2.sort(function(a,b){return b-a;});

    //para hacer la permutacion 

    v2 = v2.reverse();


    //para multiplicar necesitamos un for

    var p2_producto = 0;
    for ( var i=0; i< v1.length; i++){
        p2_producto += parseFloat(v1[i]) * parseFloat(v2[i]);
    }
    document.querySelector("#p2_output").textContent = "El producto escalar minimo es de: " + p2_producto;
}

function problema3 (){
    var input = document.querySelector('#p3-input').value;
    var palabras = input.split(',');
    var palabraMasLarga = "";
    var maxCaracteres = 0;

    palabras.forEach(palabra => {
        palabra = palabra.trim().toUpperCase();
        // Usamos Set para contar caracteres únicos
        var caracteresUnicos = new Set(palabra.replace(/[^A-Z]/g, '')).size;
        
        if (caracteresUnicos > maxCaracteres) {
            maxCaracteres = caracteresUnicos;
            palabraMasLarga = palabra;
        }
    });

    document.querySelector('#p3-output').textContent = "Palabra: " + palabraMasLarga + " (Caracteres únicos: " + maxCaracteres + ")";
}