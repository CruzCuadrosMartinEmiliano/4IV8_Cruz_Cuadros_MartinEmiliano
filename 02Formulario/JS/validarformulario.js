function validar(formulario){
    /*
    vamos a crear una funcion 
    para validar un minimo de caracteres en el nombre 
    */
    if(formulario.nombre.value.length<3){
        alert("porfavor ingrese un nombre mayor de 3 caracteres:");
        formulario.nombre.focus();
        return false;
    }
    var abcOK= "QWERTYUIOPASDFGHJKLÑZXCVBNM"+"qwertyuiopasdfghjklñzxcvbnm";
    var checkString= formulario.nombre.value ;
    var allValid = true;
    
    for(var i =0; i<checkString.length;i++){
        var caracteres = checkString.charAt(i);
        for (var j=0; j<abcOK.length;j++){
            if(caracteres==abcOK.charAt(j))
                break;
        }
        if(j == abcOK.length){
            allValid= false;
            break;
        }
    }
    if(!allValid){
        alert("porfavor escriba unicamente letras en el campo nombre");
        formulario.nombre.focus();
        return false;
        
    }
    
}