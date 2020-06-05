

var socket = io();
function seektimeupdate(){
    vid = document.getElementById("vid");
	var nt = vid.currentTime * (100 / vid.duration);
	seekslider.value = nt;
}

const app = new Vue({
    el : '#app',
    data:{
        hola_mundo: 'Hola mundo oytas',
        user : 'Anonimo',
        newMessage: '',
        messages: [{user:"Admin", message: "Welcome" }],
        ready: false,
    },
    created(){
        window.onload = ()=>{

        }
        window.onbeforeunload = () => {
            socket.emit('leave', this.username);
        }
        socket.on('chat message', (data) => {
            this.messages.push({
                message: data.message,
                user: data.user,
            });
        });
        socket.on('pause', (data)=>{
            console.log('me mando pause');
            var vid = document.getElementById('vid');
            vid.pause();
        });
        socket.on('play', (data)=>{
            console.log('me mando play');
            var vid = document.getElementById('vid');
            vid.play();
        });
        
    },
    methods:{
        send(){
            socket.emit('chat message', {user: this.user,message: this.newMessage});
            this.newMessage = '';
        },
        pause(){
            socket.emit('pause');
        },
        play(){
            socket.emit('play');
        },
        join(){
            this.ready = true;
        },
        fullscreen(){
            /*
             var vid = document.getElementById('vid');
            vid.ontimeupdate = seektimeupdate;
            */
            if(vid.requestFullScreen){
                vid.requestFullScreen();
            } else if(vid.webkitRequestFullScreen){
                vid.webkitRequestFullScreen();
            } else if(vid.mozRequestFullScreen){
                vid.mozRequestFullScreen();
            }
        }
        
        
    }
    
})



