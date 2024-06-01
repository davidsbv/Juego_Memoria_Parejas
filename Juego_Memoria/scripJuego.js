var primerClic = true;
var cartaUno;
var cartaDos;
var idUno = -1;
var idDos = -2;
var diferentes = false;
var nCartas; 
var aciertos;
var principal;
var elemento;
var felicitacion = document.createTextNode("¡¡Enhorabuena, has acabado!!");

elemento.appendChild(felicitacion);


function iniciarJuego(nCartas){

   cargarCartas();
   
}

function numeroDeCartas(){
    
   
    for(let i = 10; i <= 40; i+=10)
    {
        if(document.getElementById(i).checked)
        {
            nCartas = i;
        }
    }
    return nCartas;
}
 function cambiarTexto(texto){
   document.getElementById("iniciar").innerText = texto;
   document.getElementById("iniciar").style.fontSize = "1.8em";
} 


function cargarCartas(){
    cambiarTexto("Dos pulsaciones para reiniciar");
    aciertos = 0;
    var nCartas = numeroDeCartas();
    var tablero = document.getElementById("tablero");
    var arrayCompleto = repartirCartas(generarCartas(nCartas));
    var imagen;
    var contador = 0;
    if(tablero.childNodes.length > 1)
    { 
      for(let i = 0; i < nCartas; i++)
      { 
          imagen = document.getElementById(i);
          tablero.removeChild(imagen);
      }
      nCartas = 0;
      
      principal.removeChild(elemento);
      aciertos = 0;
    }
   
     for(let i = 0; i < nCartas; i++)
        {
            imagen = document.createElement("img");
            
            if (pantallaVertical) {
                imagen.setAttribute("width","100vh"); 
            }
            else
            {
                imagen.setAttribute("width","100vw");
            }
            imagen.setAttribute("src","img/Cartas/"+arrayCompleto[i]+".jpg");
            imagen.setAttribute("src","img/Cartas/reverso.jpg");
            imagen.setAttribute("id",i);
            imagen.setAttribute("name",arrayCompleto[i]);
            imagen.setAttribute("onClick","verCarta(id,name);");
            tablero.appendChild(imagen);
            contador++;
        }
       
}

function pantallaVertical(){

    var ancho = screen.width;
    var alto = screen.height;
    if (ancho > alto) {
        return false;
    }
    else
    {
        return true;
    }
    
}
//He tenido que duplicarla porque no entra en ella en la segunda función en la que la utilizo. 
/* function repetido(array, numero, posicion){
    
    for(let i = 0; i < posicion; i++)
    {   
        if(numero == array[i])
        {
            return true;
        }

    }
    return false;
} */
function repetido2(array, numero, posicion){
    
    for(let i = 0; i < posicion; i++)
    {   
        if(numero == array[i])
        {
            return true;
        }

    }
    return false;
}

function generarCartas(numeroDeCartas){
    var palo;
    var valor;
    var i = 0;
    var nombreCarta;
    var arrayResultados = new Array((numeroDeCartas/2));

    while (i < arrayResultados.length) 
    {
        //Si el valor es 8 o 9 se deshecha puesto que en la baraja española no se usan estas cartas
       do {
            //Genera un valor entre 1 y 4 correspondiente al palo de la baraja
            palo = Math.floor(Math.random() * 4) + 1;
            //Genera un valor entre 1 y 12 correspondiente al valor de cada carta
            valor = Math.floor(Math.random() * 12) + 1;
            //Nombre de la imagen de la carta concatenando palo + valor
       } while (valor == 8 || valor == 9);
        nombreCarta = (palo.toString() + valor.toString());

        //Comprobar si el valor aleatorio está repetido
        if (!repetido2(arrayResultados,nombreCarta,i)) {
            
            arrayResultados[i] = nombreCarta;
            i++;
        }   
    }
    
    return arrayResultados;
}

function repartirCartas(arrayCartas){
   
    var longitud = arrayCartas.length;
    var arrayPosiciones1 = new Array(longitud);
    //var arrayPosicionesTotal = new Array((longitud*2));
    var array = new Array(longitud);
    var aleatorio;
    var i = 0;
    
    while (i < longitud) {

        //Genera posciones aleatorias para desordenar el array de cartas
        aleatorio = Math.floor(Math.random()*longitud);
        
         //Evalúa si la posición ya ha salido en el random
         if (!repetido2(array,aleatorio,i)) {
            array[i] = aleatorio;
            arrayPosiciones1[i] = arrayCartas[aleatorio];
            i++; 
        }  
        
    }
    //Devuelve un array concatenando el array que pasa como parámetro y el array con las posiciones duplicadas
    return(arrayPosiciones1.concat(arrayCartas));
}


function verCarta(id,nombre){
    var one;
    var two;
    //El parámetro nombre guarda la ruta de la carta
    //El parámetro id guarda el índice del array donde se guardan las cartas generadas
  
       if(primerClic)
       {
            one =  document.getElementById(id);
            one.setAttribute("src","img/Cartas/"+nombre+".jpg");
            cartaUno = document.getElementById(id).getAttribute("name");
            idUno = id;
            primerClic = false;
            one.style.pointerEvents = "none";
       }
       else
       {
            two = document.getElementById(id);
            two.setAttribute("src","img/Cartas/"+nombre+".jpg");
            cartaDos = document.getElementById(id).getAttribute("name");
            idDos = id;
            primerClic = true;
            two.style.pointerEvents = "none";
            if(!compararCartas(cartaUno, cartaDos))
            {   
               /* one.style.pointerEvents = "none";
               two.style.pointerEvents = "none"; */

                setTimeout(function(){
                    verReverso();
                   
                },500);
               
                diferentes = true;
                if(diferentes)
                {   
                    clearTimeout(myTimeOut);
                    idUno = -1;
                    idDos = -2;
                    diferentes = false;
                }
            }
            else
            {  
                aciertos++;
                if(aciertos >= (nCartas/2)){
                   //window.alert("Has Terminado");
        
                    principal = document.getElementById("tablero");
                    elemento = document.createElement("h2");
                    // felicitacion = document.createTextNode("¡¡Enhorabuena, has acabado!!");
                    elemento.appendChild(felicitacion);
                    elemento.style.position = "absolute";
                    elemento.style.right = "30%";
                    elemento.style.top = "10%";
                    principal.appendChild(elemento);
                    
                }
                
            }
       }
}

function compararCartas(carta1, carta2){
     var iguales;
    
    if(carta1 == carta2)
        {
           iguales = true;
        }
        else
        {  
            iguales = false;
        } 
        return iguales;
}

function verReverso(){
    var primera = document.getElementById(idUno);
    var segunda = document.getElementById(idDos);

    primera.setAttribute("src","img/Cartas/reverso.jpg");
    segunda.setAttribute("src","img/Cartas/reverso.jpg"); 

   primera.style.pointerEvents="auto";
   segunda.style.pointerEvents="auto";
}

