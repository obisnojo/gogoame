/*
_________Class | DropWords
___Description | Controls creation and movement of the rain of words

________Author | sumbioun.com
____Programmer | pedro veneroso

_______Version | 0.1β
__Release date | Oct 28th 2016
___Last update | Oct 28th 2016

_______License |GPLv3 2016 sumbioun.com

*/

function DropWords(){

    var master = this;
    var text;
    var draw_text;

    var stop_rain;

    var end_rain = false;

    var the_text;

    // POSIÇÃO
    var text_x_offset;
    var linear_function;
    var text_x;
    var text_y;
    var ref_x = (window.innerWidth/2);
    var ref_y = (window.innerHeight/2);
    var min_x;
    var max_x;
    var min_y = 100;
    var max_y = window.innerHeight-100;
    var origin_x;
    var origin_y;
    var word_width = 0;

    // TEMPO
    var text_timing;
    var min_time = 1;
    var max_time = 400;
    var current_time = 0;
    var count_end = 0;

    // FÍSICA
    var drop_size = 18; // recebe na criação e atualização
    var drop_mass = 1; // recebe na criação e atualização
    var drop_wind; // em relação à massa; cálculo de desvio com base na massa
    var drop_speed;
    var drop_acceleration = 0;

    var global_wind;
    var gravity;

    var standard_time;

    var test_counter = 0;


    // PROTÓTIPO
    this.initializeText = function(in_text, in_gravity, in_wind){
        text = in_text;
        gravity = in_gravity;
        global_wind = in_wind;

        text_timing = new Array(text.length);
        text_x = new Array(text.length);
        text_y = new Array(text.length);
        draw_text = new Array(text.length);
        drop_speed = new Array(text.length);
        drop_wind = new Array(text.length);
        stop_rain = new Array(text.length);
        text_x_offset = new Array(text.length);
        linear_function = new Array(text.length);

        // for(var i = 0; i < text_timing.length; i++){
        // 	text_x_offset[i] = (Math.floor(Math.random() * (35 - 17 + 1)) + 17);
        // 	word_width+=text_x_offset[i];
        // 	drop_wind[i] = Math.random() * (0.2 + 0.2) - 0.2;
        // 	drop_wind[i] += global_wind;
        // 	drop_speed[i] = Math.random() * (1.5 - 0.5) + 0.5;
        // }

        min_x = 100;
        word_width = text_timing.length*25;
        max_x = window.innerWidth - word_width - 100;
        origin_x = Math.floor(Math.random() * (max_x - min_x + 1)) + min_x;
        origin_y = Math.floor(Math.random() * (max_y - min_y + 1)) + min_y;


        for(var i = 0; i < text_timing.length; i++){
            text_timing[i] = Math.floor(Math.random() * (max_time - min_time + 1)) + min_time;
            text_x_offset[i] = (Math.floor(Math.random() * (35 - 17 + 1)) + 17);
            word_width+=text_x_offset[i];
            drop_wind[i] = Math.random() * (0.2 + 0.2) - 0.2;
            drop_wind[i] += global_wind;

            text_y[i] = Math.floor(Math.random() * (0 +200 + 1)) -200;
            if(i>0){
                drop_speed[i] = master.getStartSpeed(i);
                // console.log(drop_speed[i]);
            }
            else{
                drop_speed[i] = Math.random() * (0.8 - 0.5) + 0.5;
                // console.log(text_y[i]);
            }

            master.linearFunction(i);

            draw_text[i] = new Array(3);
            text_x[i] = master.getStartPosition(i,text_y[i]);
            draw_text[i][3] = Math.floor(Math.random() * (28 - 12 + 1)) + 12;
        }
        // console.log(text_x[0] + " | " + text_x[text_x.length-1] + " | " + word_width + " width");
    }

    this.updateText = function(){
        count_end = 0;
        for(var i = 0; i < text_timing.length; i++){
            text_y[i] += drop_speed[i];
            // console.log(text_y[i]);
            drop_speed[i]+=gravity;

            text_x[i] = master.getStartPosition(i,text_y[i]);

            draw_text[i][0] = text_x[i];
            draw_text[i][1] = text_y[i];
            draw_text[i][2] = text[i];

            if(text_y[i] >= window.innerHeight+200){
                count_end++;
            }
            if(count_end === text.length){
                end_rain = true;
            }
            // if(i === 0 && text_y[i]>=origin_y){
            // 	// console.log(draw_text[i][2] + " origin");
            // 	// console.log(test_counter+ " GOGOGO");
            // 	test_counter++;
            // }
            // else if(i ===0){
            // 	// console.log(test_counter);
            // 	test_counter++;
            // }
        }
    }

    this.getText = function(){
        return draw_text;
    }

    this.echoLine = function(){
        var echo = new Array(text_timing.length);
        var iterations = new Array(text_timing.length);
        for(var i = 0; i < text_timing.length; i++){
            // if(stop_rain[i]===false && free_text===undefined){
            echo[i] = new Array(2);
            iterations[i] = drop_speed[i]*6;

            echo[i][1] = text_y[i] - ((drop_speed[i]*(iterations[i]-1))-(gravity^(iterations[i]-1)));
            echo[i][0] = master.getStartPosition(i,echo[i][1]);
            // }
            // else if(stop_rain[i]===false && count_free > free_text[i]){
            // 	echo[i] = new Array(2);
            // 	iterations[i] = drop_speed[i]*6;
            // 	echo[i][1] = text_y[i] - ((drop_speed[i]*(iterations[i]-1))-(gravity^(iterations[i]-1)));
            // 	echo[i][0] = master.getStartPosition(i,echo[i][1]);
            // }
            // else{
            // 	echo[i] = null;
            // }
        }
        return echo;
    }

    this.linearFunction = function(in_id){
        var final_x;
        if(in_id===0){
            final_x = origin_x;
        }
        else{
            final_x = origin_x;
            for(var p = 0; p < in_id;p++){
                final_x += text_x_offset[p];
            }
        }
        var last_x = final_x - drop_wind[in_id];
        var final_y = origin_y;

        var check_last_accelaration;
        var check_last_position = 0;
        var check_drop_speed = drop_speed[in_id];

        while(check_last_position < origin_y){
            check_drop_speed+=gravity;
            check_last_position += check_drop_speed;

        }
        var last_y = origin_y - check_drop_speed;
        linear_function[in_id] = [last_x, last_y, final_x, final_y];
    }

    this.getStartPosition = function(in_id, in_y){
        // Função linear para calcular x inicial com base nas coordenadas x e y finais
        var m = (linear_function[in_id][3]-linear_function[in_id][1])/(linear_function[in_id][2]-linear_function[in_id][0]);   //    m=y2-y1/x2-x1
        var b = linear_function[in_id][3]-(m*linear_function[in_id][2]);   // y = mx + b;  b = y - mx
        var start_x = (in_y-b)/m;    // y = mx+b;  y-b = mx;  y-b/m = x
        return start_x;
    }

    this.getStartSpeed = function(current_id){
        var reference_start_y = text_y[0];
        var reference_drop_speed = drop_speed[0];
        var current_timing = text_timing[current_id];
        var current_start_y = text_y[current_id];

        var reference_y = reference_start_y;
        var iterations = 0;
        while(reference_y<origin_y){
            reference_y+=reference_drop_speed;
            reference_drop_speed+=gravity;
            iterations++;
        }
        iterations -= 1;
        // console.log(iterations + " iterations to expect");

        var current_speed = (origin_y - text_y[current_id] - (((gravity*iterations)+gravity)*(iterations/2)))/iterations;
        // 1 2 3 4 5  6 7 8 9 10 = 5*11 = 55
        // (ultimo+primeiro)*(total/2)

        // text_y[0]+(drop_speed[0]*x)+[((gravity*x)+gravity)*(x/2)]=origin_y;
        // (drop_speed[0])=(origin_y - text_y[0] - [((gravity*x)+gravity)*(x/2)]) / x;


        // text_y[0]+(drop_speed[0]*x)+(gravity^x)=origin_y;
        //origin_y
        // while(drop_speed[current_id]){

        // }

        // var current_speed = 1;
        // console.log(current_speed);
        return current_speed;
    }

    this.endRainText = function(current_id){
        return end_rain;
    }

}