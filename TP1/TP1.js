let casa;

//musica y sonidos
let musica;
let marioSonido1;
let marioSonido2;
let luigiSonido;
let mReproducir1;
let mReproducir2;
let lReproducir;

//acciones
let caminar = 0;
let saludar = 1;
let feliz = 1;
let quieto = 2;
let irse = 2;
let fin = 3;
let accion = caminar;
let contador = 0;
let mario = [[], [], []];
let luigi = [[], [], []];
let reiniciar;

//para el movimiento de Mario y Luigi
let marioY = 400;
let luigiY = 395;
let marioX = 520;

let tiempoInicio;

function preload() {
casa = loadImage("data/casa.png");

//musica y sonidos
musica = loadSound("data/musica.mp3");
marioSonido1 = loadSound("data/Mario1.mp3");
marioSonido2 = loadSound("data/Mario2.mp3");
luigiSonido = loadSound("data/Luigi.mp3");

//ciclo for para caminar (Mario)
for(let i=0; i<8; i++){
mario[caminar][i] = loadImage("data/Mario_camina_" + (i + 1) + ".png")
}

//ciclo para caminar (Luigi)
for(let i=0; i<8; i++){
luigi[caminar][i] = loadImage("data/Luigi_camina_" + (i + 1) + ".png")
}

//ciclo para saludar (Luigi)
for(let i=0; i<4; i++){
luigi[saludar][i] = loadImage("data/Luigi_Saluda_" + (i + 1) + ".png")
}

// Mario sonriendo
mario[feliz][0] = loadImage("data/Mario_feliz_.png");

//ciclo para irse (Mario)
for(let i=0; i<8; i++){
mario[irse][i] = loadImage("data/Mario_camina2_" + (i + 1) + ".png")
}

//Luigi quieto
luigi[quieto][0] = loadImage("data/luigi_quieto.png");

//boton reiniciar
reiniciar = loadImage("data/reiniciar.png")

}

function setup() {
createCanvas(800, 600);
  
tiempoInicio = millis();

userStartAudio();
musica.setVolume(0.5);
/*
nota: intenté que la musica se repita, pero por alguna razon
aunque ponga .loop y que la consola me diga que se repita, 
la canción se escucha una sola vez
*/
musica.loop();
}

function draw() {
let tiempo = millis() - tiempoInicio;
imageMode(CENTER);
image(casa, 350, 150, 1548, 1252);

//transición de acciones
if (tiempo < 1200){
accion = caminar;
}
else if (tiempo < 3000){
accion = saludar;
}
else if (tiempo < 8000){
accion = irse;
}
else{
accion = fin;
}

//sonidos
if (tiempo > 1200){
  //esto lo puse para que el sonido se escuche una sola vez)
   if (!lReproducir) {
    luigiSonido.play();
    lReproducir = true;
}
}

if (tiempo > 1700){
   if (!mReproducir1) {
    marioSonido1.play();
    mReproducir1 = true;
}
}

if (tiempo > 3000){
   if (!mReproducir2) {
    marioSonido2.play();
    mReproducir2 = true;
}
}

//acciones
if (accion === 0){
  //luigi camina
  image(luigi[caminar][int(frameCount/5)%8], 400, luigiY, 56, 144);
  
  if (luigiY > 310){
  luigiY--
  }
  
  //Mario camina
  image(mario[caminar][int(frameCount/5)%8], 520, marioY, 64, 128);

  if (marioY > 315){
    marioY--
  }

}

if (accion === 1){
  //Luigi saluda
  image(luigi[saludar][int(frameCount/5)%4], 425, 303, 112, 156);

  //Mario feliz
  image(mario[feliz][int(frameCount/5)%1], 520, 315, 64, 128);
  
  /*
  (por cierto, "mario[feliz]" solo tiene 1 sprite de animacion, 
  pero por alguna razón si no le pongo el "int frameCount" la 
  animacion de Luigi no carga)
  */
  
}

if (accion === 2) {
//Luigi quieto
image(luigi[quieto][int(frameCount/5)%1], 403, 309, 60, 144);

/*
lo mismo pasa acá con Luigi
*/

//Mario se va
  image(mario[irse][int(frameCount/5)%8], marioX, 315, 64, 128);
  marioX++
}

if (accion === 3){
//boton reiniciar
image(reiniciar, width/2, height/2, 288, 96);
}
}

function mouseClicked() {
  
//para hacer funcionar el boton de reiniciar
if (accion === 3) {

 if (mouseX > 256 && mouseX < 544 &&
     mouseY > 252 && mouseY < 348){
       
       accion = caminar;
       
       tiempoInicio = millis();
       
       //esto devuelve los valores como estaban antes
       
       marioY = 400;
       luigiY = 395;
       marioX = 520;
       lReproducir = false;
       mReproducir1 = false;
       mReproducir2 = false;
     }
}
}
