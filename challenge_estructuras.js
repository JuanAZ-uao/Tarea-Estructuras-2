function funcionRegularNumeroParImpart(numero){
    if(numero % 2 === 0){
       console.log("El numero" + numero + "es par");
    }else{
        console.log("El numero" + numero + "es impar");
    } 
}

const funcionArrowFlechaNumeroParImpart = (numero) => {
    if(numero % 2 === 0){
       console.log("El numero" + numero + "es par");
    }else{
        console.log("El numero" + numero + "es impar");
    } 
};

funcionRegularNumeroParImpart(7);
funcionArrowFlechaNumeroParImpart(10);