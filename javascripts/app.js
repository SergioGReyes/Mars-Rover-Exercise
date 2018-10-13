
var rover1 = { //Inicialización del Rover 1
  name: "rover1",
  direction: "E",
  x: 0,
  y: 0,
  travelLog: [[0,0]],
  turnActive: true 
};
var rover2 = { //Inicialización del Rover 2
  name: "rover2",
  direction: "E",
  x: 0,
  y: 4,
  travelLog: [[0,4]],
  turnActive: true 
};

var map = [  

//  0    1    2    3    4    5    6    7    8    9
  [null,null,"Ob",null,null,null,null,null,null,null],  //  0
  [null,null,null,null,null,null,null,null,null,null],  //  1
  [null,null,null,null,null,null,null,"Ob",null,null],  //  2
  [null,null,null,null,null,null,null,null,null,null],  //  3
  [null,null,null,null,null,"Ob",null,null,null,null],  //  4
  ["Ob",null,null,null,null,null,null,null,"Ob",null],  //  5
  [null,null,null,null,null,null,null,null,null,null],  //  6
  [null,null,"Ob",null,null,null,null,null,null,null],  //  7
  [null,null,null,null,null,null,null,null,null,null],  //  8
  [null,null,null,null,null,"Ob","Ob",null,null,null]   //  9
];

            //Información inicial
console.log("\nIntroduzca \"rover1\" para el Rover 1 y \"rover2\" para el Rover 2.\n\nPor ejemplo: turnleft(rover1);");
console.log("\nLista de comandos:\n\n\t- turnLeft(valor);\n\t- turnRight(valor);\n\t- moveForward(valor);\n\t- moveBackward(valor)\n\t- listCommands(cadena,valor);\n\t- status(valor);");

console.log("\nTenga en cuenta que girar/cambiar de dirección no gasta turno. Únicamente, avanzar o retroceder.\n\n");

function turnLeft(rover){ //Girar a la izquierda    
  if(rover.turnActive == true){ //Comprueba si es el turno del rover
    switch (rover.direction) {
      case "N":
        rover.direction = "W";
        break;
      case "S":
        rover.direction = "E";
        break;
      case "E":
        rover.direction = "N";
        break;
      case "W":
        rover.direction = "S";
        break;  
    }
    console.log("El Rover ha girado a la izquierda.");
    console.log("Nueva orientación: " + rover.direction);
    console.log("Posición actual: " + rover.x + "," + rover.y);
    checkTurn(rover.name,rover.turnActive);  //Inicia la función sin cambiar a false porque se ha girado pero no desplazado
  }else{
    console.log("Por favor, espere su turno para mover el rover.");
  }
}

function turnRight(rover){  //Girar a la derecha
  if(rover.turnActive == true){
    switch (rover.direction) {
      case "N":
        rover.direction = "E";
        break;
      case "S":
        rover.direction = "W";
        break;
      case "E":
        rover.direction = "S";
        break;
      case "W":
        rover.direction = "N";
        break;  
    }
    console.log("El Rover ha girado a la derecha.");
    console.log("Nueva orientación: " + rover.direction);
    console.log("Posición actual: " + rover.x + "," + rover.y);
    checkTurn(rover.name,rover.turnActive);
  }else{
    console.log("Por favor, espere su turno para mover el rover.");
  }
}

function moveForward(rover){  //Mover hacia adelante
  if(rover.turnActive == true){ //Comprueba si el turno está activo
    switch (rover.direction){
    case "N":
    if (rover.y - 1 < 0){  //Comprueba el límite del mapa
      console.log("¡Atención! Ha llegado al límite del mapa.\nPor favor, no sea como Howard Chococrispis Wolowitz y nos pierda el Rover.\n¡RETROCEDA!");
      }else if(map[rover.y - 1][rover.x] == "Ob"){  //Comprueba si hay obstáculo (y,x) --> invertido
        console.log("¡Atención! Obstáculo delante.\nPor favor, modifique dirección.");
      }else if(rover.name == "rover1" && rover.y - 1 == rover2.y && rover.x == rover2.x){ //Comprueba si el rover 1 va a colisionar con el 2
        console.log("Atención! Tiene justo delante a otro rover.\nPor favor, modifique dirección.");          
      }else if(rover.name == "rover2" && rover.y - 1 == rover1.y && rover.x == rover1.x){ //Comprueba si el rover 2 va a colisionar con el 1
        console.log("Atención! Tiene justo delante a otro rover.\nPor favor, modifique dirección.");
      }else{
        rover.y -= 1; //Desplaza el Rover en la posición indicada
        rover.travelLog.push([rover.x,rover.y]);  //Añade otra posición al registro de viaje
        console.log("El Rover ha avanzado.");
        console.log("Registro de viaje: " + rover.travelLog.join(" | "));
        rover.turnActive = false; //Como se ha movido, gasta turno y se pone en falso
      }     
      break;
    case "S":
      if (rover.y + 1 > 9){ 
        console.log("¡Atención! Ha llegado al límite del mapa.\nPor favor, no sea como Howard Chococrispis Wolowitz y nos pierda el Rover.\n¡RETROCEDA!");
      }else if(map[rover.y + 1][rover.x] == "Ob"){
        console.log("¡Atención! Obstáculo delante.\nPor favor, modifique dirección.");
      }else if(rover.name == "rover1" && rover.y + 1 == rover2.y && rover.x == rover2.x){
        console.log("Atención! Tiene justo delante a otro rover.\nPor favor, modifique dirección.");          
      }else if(rover.name == "rover2" && rover.y + 1 == rover1.y && rover.x == rover1.x){
        console.log("Atención! Tiene justo delante a otro rover.\nPor favor, modifique dirección.");
      }else{
        rover.y += 1;
        rover.travelLog.push([rover.x,rover.y]);
        console.log("El Rover ha avanzado.");
        console.log("Registro de viaje: " + rover.travelLog.join(" | "));
        rover.turnActive = false;
      }  
      break;
    case "E":
      if (rover.x + 1 > 9){ 
        console.log("¡Atención! Ha llegado al límite del mapa.\nPor favor, no sea como Howard Chococrispis Wolowitz y nos pierda el Rover.\n¡RETROCEDA!");
      }else if(map[rover.y][rover.x + 1] == "Ob"){
        console.log("¡Atención! Obstáculo delante.\nPor favor, modifique dirección.");
      }else if(rover.name == "rover1" && rover.x + 1 == rover2.x && rover.y == rover2.y){
        console.log("Atención! Tiene justo delante a otro rover.\nPor favor, modifique dirección.");          
      }else if(rover.name == "rover2" && rover.x + 1 == rover1.x && rover.y == rover1.y){
        console.log("Atención! Tiene justo delante a otro rover.\nPor favor, modifique dirección.");
      }else{
        rover.x += 1;
        rover.travelLog.push([rover.x,rover.y]);
        console.log("El Rover ha avanzado.");
        console.log("Registro de viaje: " + rover.travelLog.join(" | "));
        rover.turnActive = false;
      }     
      break;
    case "W":
      if (rover.x - 1 < 0){ 
        console.log("¡Atención! Ha llegado al límite del mapa.\nPor favor, no sea como Howard Chococrispis Wolowitz y nos pierda el Rover.\n¡RETROCEDA!");
      }else if(map[rover.y][rover.x - 1] == "Ob"){
        console.log("¡Atención! Obstáculo delante.\nPor favor, modifique dirección.");
      }else if(rover.name == "rover1" && rover.x - 1 == rover2.x && rover.y == rover2.y){
        console.log("Atención! Tiene justo delante a otro rover.\nPor favor, modifique dirección.");          
      }else if(rover.name == "rover2" && rover.x - 1 == rover1.x && rover.y == rover1.y){
        console.log("Atención! Tiene justo delante a otro rover.\nPor favor, modifique dirección.");
      }else{
        rover.x -= 1;
        rover.travelLog.push([rover.x,rover.y]);
        console.log("El Rover ha avanzado.");
        console.log("Registro de viaje: " + rover.travelLog.join(" | "));
        rover.turnActive = false;
      }    
      break;    
    }  
    console.log("Orientación actual: " + rover.direction);
    console.log("Posición actual: " + rover.x + "," + rover.y);
    checkTurn(rover.name,rover.turnActive);    
  }else{
    console.log("Por favor, espere su turno para mover el rover.");
  }  
}

function moveBackward(rover){  //Mover hacia atrás
  if(rover.turnActive == true){
    switch (rover.direction){
    case "N":
    if (rover.y + 1 > 9){  //Comprueba el límite del mapa
      console.log("¡Atención! Ha llegado al límite del mapa.\nPor favor, no sea como Howard Chococrispis Wolowitz y nos pierda el Rover.\n¡RETROCEDA!");
      }else if(map[rover.y + 1][rover.x] == "Ob"){  //Comprueba si hay obstáculo
        console.log("¡Atención! Obstáculo detrás.\nPor favor, modifique dirección.");
      }else if(rover.name == "rover1" && rover.y + 1 == rover2.y && rover.x == rover2.x){
        console.log("Atención! Tiene justo delante a otro rover.\nPor favor, modifique dirección.");          
      }else if(rover.name == "rover2" && rover.y + 1 == rover1.y && rover.x == rover1.x){
        console.log("Atención! Tiene justo delante a otro rover.\nPor favor, modifique dirección.");
      }else{
        rover.y += 1; //Desplaza el Rover en la posición indicada
        rover.travelLog.push([rover.x,rover.y]);  //Añade otra posición al registro de viaje
        console.log("El Rover ha retrocedido.");
        console.log("Registro de viaje: " + rover.travelLog.join(" | "));
        rover.turnActive = false;
      }     
      break;
    case "S":
      if (rover.y - 1 < 0){ 
        console.log("¡Atención! Ha llegado al límite del mapa.\nPor favor, no sea como Howard Chococrispis Wolowitz y nos pierda el Rover.\n¡RETROCEDA!");
      }else if(map[rover.y - 1][rover.x] == "Ob"){
        console.log("¡Atención! Obstáculo detrás.\nPor favor, modifique dirección.");
      }else if(rover.name == "rover1" && rover.y - 1 == rover2.y && rover.x == rover2.x){
        console.log("Atención! Tiene justo delante a otro rover.\nPor favor, modifique dirección.");          
      }else if(rover.name == "rover2" && rover.y - 1 == rover1.y && rover.x == rover1.x){
        console.log("Atención! Tiene justo delante a otro rover.\nPor favor, modifique dirección.");
      }else{
        rover.y -= 1;
        rover.travelLog.push([rover.x,rover.y]);
        console.log("El Rover ha retrocedido.");
        console.log("Registro de viaje: " + rover.travelLog.join(" | "));
        rover.turnActive = false;
      }  
      break;
    case "E":
      if (rover.x - 1 < 0){ 
        console.log("¡Atención! Ha llegado al límite del mapa.\nPor favor, no sea como Howard Chococrispis Wolowitz y nos pierda el Rover.\n¡RETROCEDA!");
      }else if(map[rover.y][rover.x - 1] == "Ob"){
        console.log("¡Atención! Obstáculo detrás.\nPor favor, modifique dirección.");
      }else if(rover.name == "rover1" && rover.x - 1 == rover2.x && rover.y == rover2.y){
        console.log("Atención! Tiene justo delante a otro rover.\nPor favor, modifique dirección.");          
      }else if(rover.name == "rover2" && rover.x - 1 == rover1.x && rover.y == rover1.y){
        console.log("Atención! Tiene justo delante a otro rover.\nPor favor, modifique dirección.");
      }else{
        rover.x -= 1;
        rover.travelLog.push([rover.x,rover.y]);
        console.log("El Rover ha retrocedido.");
        console.log("Registro de viaje: " + rover.travelLog.join(" | "));
        rover.turnActive = false;
      }     
      break;
    case "W":
      if (rover.x + 1 > 9){ 
        console.log("¡Atención! Ha llegado al límite del mapa.\nPor favor, no sea como Howard Chococrispis Wolowitz y nos pierda el Rover.\n¡RETROCEDA!");
      }else if(map[rover.y][rover.x + 1] == "Ob"){
        console.log("¡Atención! Obstáculo detrás.\nPor favor, modifique dirección.");
      }else if(rover.name == "rover1" && rover.x + 1 == rover2.x && rover.y == rover2.y){
        console.log("Atención! Tiene justo delante a otro rover.\nPor favor, modifique dirección.");          
      }else if(rover.name == "rover2" && rover.x + 1 == rover1.x && rover.y == rover1.y){
        console.log("Atención! Tiene justo delante a otro rover.\nPor favor, modifique dirección.");
      }else{
        rover.x += 1;
        rover.travelLog.push([rover.x,rover.y]);
        console.log("El Rover ha retrocedido.");
        console.log("Registro de viaje: " + rover.travelLog.join(" | "));
        rover.turnActive = false;
      }    
      break;    
    }  
    console.log("Orientación actual: " + rover.direction);
    console.log("Posición actual: " + rover.x + "," + rover.y);
    checkTurn(rover.name,rover.turnActive);    
  }else{
    console.log("Por favor, espere su turno para mover el rover.");
  }  
}

function listCommands(command,rover){ // Introducción de una cadena de comandos
  var validation = false;
  for(var i = 0; i < command.length; i++){  //Recorre la cadena
    if(command[i] == "f" || command[i] == "r" || command[i] == "l" || command[i] == "b" ){
      validation = true;      
    }else{
      validation = false;
      i = command.length;
    }
  }
  if(validation == true){ //Comprueba la validación y ejecuta la cadena de comandos 
    for (var i = 0; i < command.length; i++){
      switch (command[i]) {
        case "f":
        moveForward(rover);  
          break;
        case "r":
        turnRight(rover);  
          break;
        case "l":
        turnLeft(rover);  
          break;      
      }
    }    
  }else{    
    console.log("Secuencia de comandos incorrecta.\nPor favor, introduzca una secuencia válida ('f','b','r' o 'l').");
  }
}

function checkTurn(name,active){  //Comprueba qué rover está activo y anula al otro una vez iniciado el turno
  if(name == "rover1" && active == true){
    rover2.turnActive = false;
    console.log("Turno del Rover 1\n-----------------");
  }              
  if(name == "rover2" && active == true){
    rover1.turnActive = false;
    console.log("Turno del Rover 2\n-----------------");
  }
  if(name == "rover1" && active == false){
    rover2.turnActive = true;
    console.log("Turno del Rover 2\n-----------------");
  }
  if(name == "rover2" && active == false){
    rover1.turnActive = true;
    console.log("Turno del Rover 1\n-----------------");
  }    
}

function status(rover){
  if (rover1.turnActive == true && rover2.turnActive == true){  //Para la muestra del status antes de determinar quién empieza primero
    console.log("Rover 1: \nOrientación actual: " + rover1.direction + "\nPosición actual: " + rover1.x + "," + rover1.y);
    console.log("Rover 2: \nOrientación actual: " + rover2.direction + "\nPosición actual: " + rover2.x + "," + rover2.y);
    console.log("Inicie comando con el Rover 1 o el Rover 2");
  }else{
    console.log("Registro de viaje: " + rover.travelLog.join(" | ")
    + "\nOrientación actual: " + rover.direction + "\nPosición actual: " + rover.x + "," + rover.y);
  }   
}



