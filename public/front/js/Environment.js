/*
_________Class | Environment
___Description | Controls physics simulation for the environment

________Author | sumbioun.com
____Programmer | pedro veneroso

_______Version | 0.1β
__Release date | Oct 24th 2016
___Last update | Oct 28th 2016

_______License |GPLv3 2016 sumbioun.com

formar palavras, a partir de bd, no fluxo da chuva

*/

function Environment(){

    var master = this;

    // PADRÕES
    var basic_font_size = 18;
    var basic_mass = 1;
    // var drop_chars = ['A','B','C','D','E','F','G','H','I','J','K', 'L', 'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var drop_chars = ['🎂','🎂','🎂','🎂','🎂','🎂','🎂','🎂','🎂','🎂','🎂','🎂','🎂','🎂','🎂','🎂','🎂','🎂','🎂','🎂','🎂','🎂','🎂','🎂','🎂','🎂'];

    // FÍSICA - CONSTANTES
    var global_acceleration = 0.01;

    // FÍSICA - VARIÁVEIS
    var intensity = Math.floor(Math.random() * (1200 - 500 + 1)) + 500; //  número de caracteres na tela
    var current_intensity = 0;
    var windEW = Math.random()-0.5; // negativo para esquerda, positivo para a direita
    var windNS = 0; // negativo para trás, positivo para a frente
    var time = 0.0; // millis desde que o site abriu, usado para atualizar as posições
    var current_words_intensity = 3;

    // function stopRain
    // function startRain
    // function changeIntensity
    // function changeWind

    this.updateCurrentIntensity = function(){
        var update_intensity = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
        if((current_intensity + update_intensity)<intensity){
            current_intensity += update_intensity;
        }
    }

    this.updateCurrentWind = function(mouse_x){
        var transfer_wind = (mouse_x/window.innerWidth)-0.5;
        windEW = transfer_wind;
    }

    this.getIntensity = function(){
        return intensity;
    }

    this.getCurrentIntensity = function(){
        return current_intensity;
    }

    this.getWind = function(){
        return windEW;
    }

    this.getChars = function(){
        return drop_chars;
    }

    this.getGravity = function(){
        return global_acceleration;
    }

    this.getCurrentWordsIntensity = function(){
        return current_words_intensity;
    }

    this.initializeCanvas = function(){
        var canvas  = document.createElement("canvas");
        canvas.setAttribute('width', Math.floor(window.innerWidth));
        canvas.setAttribute('height', Math.floor(window.innerHeight));
        canvas.id = 'rain_processing';
        document.body.appendChild(canvas);
    }
}