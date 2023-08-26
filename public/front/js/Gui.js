/*
_________Class | Gui
___Description | Controls user interface

________Author | sumbioun.com
____Programmer | pedro veneroso

_______Version | 0.2β
__Release date | Oct 25th 2016
___Last update | Nov 5th 2016

_______License |GPLv3 2016 sumbioun.com

Agora:
• Gerar link para compartilhamento
• Compartilhar em redes sociais

Futuro:
• Seleção de idioma

*/

function Gui(){

    var master = this;
    var animate = 20;
    var jump = 4;
    var width = 32;
    var open = [false,false];
    var text = ['escrever | <i>write</i>','sobre | <i>about</i>'];
    var current_text;
    var update_text = false;

    this.controlPanel = function(){
        var info_button = document.createElement('div');
        info_button.id = 'info_button';
        info_button.className = 'button';
        info_button.style.width = '32px';
        info_button.style.marginLeft = '0px';
        info_button.style.marginTop = ((window.innerHeight-100)/2)+"px"; //
        info_button.style.paddingLeft = "14px";
        info_button.style.paddingRight = "4px";
        info_button.innerHTML += '<i class="fa fa-book" aria-hidden="true"></i>';
        document.body.appendChild(info_button);

        var text_button = document.getElementById('text_button');
        master.makeButton(info_button,32,((window.innerHeight-100)/2),1,166);

        var text_button = document.createElement('div');
        text_button.id = 'text_button';
        text_button.className = 'button';
        text_button.style.width = '32px';
        text_button.style.marginLeft = '0px';
        text_button.style.paddingLeft = "13px";
        text_button.style.paddingRight = "5px";
        text_button.style.marginTop = ((window.innerHeight)/2)+"px";
        text_button.innerHTML += '<i class="fa fa-font" aria-hidden="true"></i>';
        document.body.appendChild(text_button);

        var text_button = document.getElementById('text_button');
        master.makeButton(text_button,32,((window.innerHeight)/2),0,184);
    }

    this.createTooltip = function(x_pos,y_pos,this_id,this_width){
        var tooltip = document.createElement('div');
        tooltip.id = text[this_id];
        tooltip.style.position = "absolute";
        tooltip.style.marginTop = y_pos + 13 + "px";
        tooltip.style.marginLeft = x_pos + 24 + "px";
        tooltip.style.color = "white";
        tooltip.style.font = "Source Sans Pro";
        tooltip.style.fontWeight = "400";
        tooltip.style.textTransform = 'uppercase';
        tooltip.innerHTML = text[this_id];
        document.body.appendChild(tooltip);
    }

    this.removeTooltip = function(this_id){
        var tooltip = document.getElementById(text[this_id]);
        if(tooltip!=null){
            tooltip.parentNode.removeChild(tooltip);
        }
    }

    this.makeButton = function(this_button,x_pos,y_pos,this_id,this_width){
        mouseOver = function(){
            if(open[this_id]===false){
                this_button.style.backgroundColor = "#7fa1d3";
                this_button.style.width = this_width+"px";
                this_button.style.cursor = "pointer";
                if(document.getElementById(text[this_id]) === null){
                    master.createTooltip(x_pos,y_pos,this_id);
                }
            }
        };
        mouseOut = function(){
            if(open[this_id]===false){
                this_button.style.backgroundColor = "#1d1d1d";
                this_button.style.width = "32px";
                this_button.style.cursor = "none";
                master.removeTooltip(this_id);
            }
        };
        mouseDown = function(){
            if(open[this_id]===false){
                if(this_id === 0){
                    master.removeTooltip(this_id);
                    this_button.innerHTML = "";
                    if(text[this_id] === text[0]){
                        master.animateBox(this_button, this_id);
                    }
                    else if(text[this_id] === text[1]){

                    }
                    open[this_id] = true;
                }
                else if(this_id === 1){
                    window.open('sobre.html','_self');
                }
            }
            else{
                open[this_id] = false;
            }
        };
        this_button.onmouseover = mouseOver;
        this_button.onmouseout =   mouseOut;
        this_button.onmousedown = mouseDown;
    }

    this.animateBox = function(this_box, this_id){
        this_box.style.pointerEvents = 'none';
        this_box.style.width = "200px";
        this_box.style.height = "255px";

        var close_button = document.createElement('div');
        close_button.id = "close_button";
        close_button.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
        close_button.style.pointerEvents = 'all';
        close_button.style.marginTop = (((window.innerHeight)/2)+4)+"px";
        document.body.appendChild(close_button);

        close_button = document.getElementById('close_button');
        mouseOverClose = function(){
            this.style.color = "white";
            this.style.cursor = 'pointer';
        };
        mouseOutClose = function(){
            this.style.color = "#1c1c1c";
        };
        mouseDownClose = function(){
            // open[this_id] = false;
            document.getElementById('text_button').style.pointerEvents = 'all';
            document.getElementById('text_button').style.backgroundColor = "#1d1d1d";
            document.getElementById('text_button').style.width = "32px";
            document.getElementById('text_button').style.height = "32px";
            document.getElementById('text_button').style.cursor = "none";
            document.getElementById('text_button').innerHTML = '<i class="fa fa-font" aria-hidden="true"></i>';
            var text_field = document.getElementById("text_field");
            if(text_field!=null){
                text_field.parentNode.removeChild(text_field);
            }
            var close_field = document.getElementById("close_button");
            if(close_field!=null){
                close_field.parentNode.removeChild(close_field);
            }
            var send_field = document.getElementById("send_button");
            if(send_field!=null){
                send_field.parentNode.removeChild(send_field);
            }
            var share_field = document.getElementById("share_button");
            if(share_field!=null){
                share_field.parentNode.removeChild(share_field);
            }
            var share_options = document.getElementById("share_options");
            if(share_options!=null){
                share_options.parentNode.removeChild(share_options);
            }

            open[this_id] = false;
        };
        close_button.onmouseover = mouseOverClose;
        close_button.onmouseout =  mouseOutClose;
        close_button.onmousedown = mouseDownClose;

        var text_field = document.createElement('textarea');
        text_field.id = "text_field";
        text_field.placeholder='Escreva aqui o seu texto, depois clique no botão chover ou compartilhar – – Write your text here, then click on rain or share';
        text_field.style.marginLeft = "0px";
        text_field.style.marginTop = (((window.innerHeight)/2)+30)+"px";
        text_field.style.pointerEvents = 'all';
        document.body.appendChild(text_field);

        var send_button = document.createElement('div');
        send_button.id = "send_button";
        send_button.innerHTML = 'chover | <i>rain</i>';
        send_button.style.pointerEvents = 'all';
        send_button.style.marginTop = (((window.innerHeight)/2)+201)+"px";
        document.body.appendChild(send_button);

        mouseOverSend = function(){
            this.style.backgroundColor = "#7fa1d3";
            this.style.color = "white";
            this.style.cursor = 'pointer';
        };
        mouseOutSend = function(){
            this.style.backgroundColor = "white";
            this.style.color = "#1c1c1c";
        };
        mouseDownSend = function(){
            current_text = document.getElementById('text_field').value.toUpperCase();
            update_text = true;

            document.getElementById('text_button').style.pointerEvents = 'all';
            document.getElementById('text_button').style.backgroundColor = "#1d1d1d";
            document.getElementById('text_button').style.width = "32px";
            document.getElementById('text_button').style.height = "32px";
            document.getElementById('text_button').style.cursor = "none";
            document.getElementById('text_button').innerHTML = '<i class="fa fa-font" aria-hidden="true"></i>';
            var text_field = document.getElementById("text_field");
            if(text_field!=null){
                text_field.parentNode.removeChild(text_field);
            }
            var close_field = document.getElementById("close_button");
            if(close_field!=null){
                close_field.parentNode.removeChild(close_field);
            }
            var send_field = document.getElementById("send_button");
            if(send_field!=null){
                send_field.parentNode.removeChild(send_field);
            }
            var share_field = document.getElementById("share_button");
            if(share_field!=null){
                share_field.parentNode.removeChild(share_field);
            }

            open[0] = false;

            if(current_text.length > 0 && current_text.length <= 27){
                $.post('http://localhost:449/send_message', {text: current_text}, function(data){
                    var result = jQuery.parseJSON(data);
                    // console.log(result);
                    // if(result===null){
                    //   window.open('admin.html', '_self');
                    // }
                    // var message = document.getElementById("system_message");
                    // message.style.top = "260px";
                    // message.innerHTML = result;
                })
                    .error(function() { alert("Problema com o banco de dados. Tente novamente mais tarde"); });
            }
        };
        send_button.onmouseover = mouseOverSend;
        send_button.onmouseout =  mouseOutSend;
        send_button.onmousedown = mouseDownSend;



        // ---

        var share_button = document.createElement('div');
        share_button.id = "share_button";
        share_button.innerHTML = 'compartilhar | <i>share</i>';
        share_button.style.pointerEvents = 'all';
        share_button.style.marginTop = (((window.innerHeight)/2)+236)+"px";
        document.body.appendChild(share_button);

        mouseOverShare = function(){
            this.style.backgroundColor = "#7fa1d3";
            this.style.color = "white";
            this.style.cursor = 'pointer';
        };
        mouseOutShare = function(){
            this.style.backgroundColor = "white";
            this.style.color = "#1c1c1c";
        };
        mouseDownShare = function(){
            // master.sharePopup();
            current_text = document.getElementById('text_field').value.toUpperCase();
            update_text = true;
            if(current_text.length>0){
                var share_field = document.getElementById("share_button");
                if(share_field!=null){
                    share_field.parentNode.removeChild(share_field);
                }
                $.post('db/send_message.php', {text: current_text}, function(data){
                    var result = jQuery.parseJSON(data);
                    if(result[0]===true){
                        master.shareOptions(result['unique_id']);
                    }
                })
                    .error(function() { alert("Problema com o banco de dados. Tente novamente mais tarde"); });
            }
        };
        share_button.onmouseover = mouseOverShare;
        share_button.onmouseout =  mouseOutShare;
        share_button.onmousedown = mouseDownShare;

    }

    this.shareOptions = function(uniqueid){
        var url = "http://gogoame.sumbioun.com/?ame="+uniqueid;

        var share_options = document.createElement('div');
        share_options.id = "share_options";
        share_options.style.pointerEvents = 'all';
        share_options.style.padding = "0px";
        share_options.style.width = "216px";
        share_options.style.height = "34px";
        share_options.style.marginTop = (((window.innerHeight)/2)+236)+"px";
        document.body.appendChild(share_options);

        var fb_button = document.createElement('div');
        fb_button.id = "fb_button";
        fb_button.className = "social_button";
        fb_button.innerHTML = '<i class="fa fa-facebook-official" aria-hidden="true"></i>';
        fb_button.style.marginLeft = "130px"; //100px
        share_options.appendChild(fb_button);

        mouseOverShareFb = function(){
            this.style.color = "#1c1c1c";
            this.style.cursor = 'pointer';
        };
        mouseOutShareFb = function(){
            this.style.color = "#7fa1d3";
        };
        mouseDownShareFb = function(){
            master.shareFacebook(url);
        };
        fb_button.onmouseover = mouseOverShareFb;
        fb_button.onmouseout =   mouseOutShareFb;
        fb_button.onmousedown = mouseDownShareFb;

        // var twitter_button = document.createElement('div');
        // twitter_button.id = "twitter_button";
        // twitter_button.className = "social_button";
        // twitter_button.innerHTML = '<i class="fa fa-twitter" aria-hidden="true"></i>';
        // twitter_button.style.marginLeft = "140px"; //140px
        // share_options.appendChild(twitter_button);

        // mouseOverShareTwitter = function(){
        // 	this.style.color = "#7fa1d3";
        // 	this.style.cursor = 'pointer';
        // };
        // mouseOutShareTwitter = function(){
        // 	this.style.color = "#1c1c1c";
        // };
        // mouseDownShareTwitter = function(){
        // 	master.shareTwitter(url);
        // };
        // twitter_button.onmouseover = mouseOverShareTwitter;
        // twitter_button.onmouseout =   mouseOutShareTwitter;
        // twitter_button.onmousedown = mouseDownShareTwitter;

        var direct_link_button = document.createElement('div');
        direct_link_button.id = "direct_link_button";
        direct_link_button.className = "social_button";
        direct_link_button.innerHTML = '<i class="fa fa-link" aria-hidden="true"></i>';
        direct_link_button.style.marginLeft = "70px"; //60px
        share_options.appendChild(direct_link_button);

        mouseOverShareDirectLink = function(){
            this.style.color = "#1c1c1c";
            this.style.cursor = 'pointer';
        };
        mouseOutShareDirectLink = function(){
            this.style.color = "#7fa1d3";
        };
        mouseDownShareDirectLink = function(){
            master.shareDirectLink(url);
        };
        direct_link_button.onmouseover = mouseOverShareDirectLink;
        direct_link_button.onmouseout =   mouseOutShareDirectLink;
        direct_link_button.onmousedown = mouseDownShareDirectLink;

    }

    // this.shareTwitter = function(in_url){

    // }

    this.shareFacebook = function(in_url){
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '571983329668828',
                xfbml      : true,
                version    : 'v2.8'
            });
            FB.ui({
                method:'share',
                href: in_url,
                picture: 'http://gogoame.sumbioun.com/public/media/mensagem.jpg',
                description: 'Existe uma mensagem para você no Gogoame | There is a message for you at Gogoame',
                title: 'Gogoame | 午後雨',
            }, function(response){});
        };
        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    this.shareDirectLink = function(in_url){
        document.getElementById('text_field');
        text_field.value = 'COPIE | COPY: \n\n'+in_url;
    }

    this.checkInput = function(){
        return update_text;
    }

    this.confirmReceive = function(){
        update_text = false;
    }

    this.getText = function(){
        return current_text;
    }
}