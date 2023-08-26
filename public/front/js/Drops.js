/*
_________Class | Drops
___Description | Controls creation and movement of the rain of characters

________Author | sumbioun.com
____Programmer | pedro veneroso

_______Version | 0.1β
__Release date | Oct 24th 2016
___Last update | Oct 25th 2016

_______License |GPLv3 2016 sumbioun.com

*/

function Drops(in_id, in_chars, in_gravity){

    var master = this;
    var id = in_id;
    var init = true;

    // FÍSICA
    var drop_size = 18; // recebe na criação e atualização
    var drop_mass = 1; // recebe na criação e atualização
    var drop_wind = Math.random() * (0.2 + 0.2) - 0.2; // em relação à massa; cálculo de desvio com base na massa
    var drop_speed = 0;
    var drop_acceleration = 0;
    var chars = in_chars;

    var global_wind = 0;
    var gravity = in_gravity;

    // CONTEÚDO
    var drop_char = 0; // recebe na criação e atualização
    var drop_color = "#ffffff"; // recebe na criação e atualização

    // POSIÇÃO
    var drop_x = 0; // recebe na criação e atualização; -100 e +100 em relação à tela
    var drop_y = 0; // recebe na criação e atualização; -200 a 0 em relação à tela

    this.initializeDrop = function(){
        if(init === true){
            drop_y = Math.floor(Math.random() * (0 +600 + 1)) -600;
        }
        else{
            drop_y = Math.floor(Math.random() * (0 +200 + 1)) -200;
        }
        drop_x = Math.floor(Math.random() * (window.innerWidth - 0 + 1)) + 0;
        drop_size = Math.floor(Math.random() * (26 - 8 + 1)) + 8;
        drop_speed = Math.random() * (1.5 - 0.5) + 0.5;
        // drop_speed = Math.random() * (1000.5 - 20.5) + 20.5;
        drop_char = Math.floor(Math.random() * (26 - 1 + 1)) + 1;
        drop_char = chars[drop_char-1];
    }

    this.updateDrop = function(in_intensity, in_wind){
        drop_y += drop_speed;
        drop_speed+=gravity;
        if(drop_y>window.innerHeight+200){
            master.initializeDrop();
        }

        drop_x += in_wind + drop_wind;
        global_wind = in_wind;
    }

    this.getX = function(){
        return drop_x;
    }

    this.getY = function(){
        return drop_y;
    }

    this.getSize = function(){
        return drop_size;
    }

    this.getChar = function(){
        return drop_char;
    }

    this.echoLine = function(){
        var echo = new Array();
        var iterations = drop_speed*6;
        echo[0] = drop_x - ((global_wind + drop_wind)*(iterations-1));
        echo[1] = drop_y - ((drop_speed*(iterations-1))-(gravity^(iterations-1)));
        return echo;
    }

}