

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
        addControls: true,
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
            var vid = document.getElementById('vid');
            vid.pause();
        });
        socket.on('play', (data)=>{
            var vid = document.getElementById('vid');
            if(this.addControls) {
                vid.ontimeupdate = seektimeupdate;
                this.addControls = false;
            }
            vid.play();
        });
        socket.on('change_Seeker',(data)=>{
            var vid = document.getElementById('vid');
            vid.currentTime = data.seekto;
        });
        socket.on('change_video',(data)=>{
            var vid = document.getElementById('vid');
            vid.load();
            location.reload()
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
            socket.emit('chat message', {user: 'Admin',message : 'Se unio: '+this.user});
        },
        fullscreen(){
            var vid = document.getElementById('vid');
            if(vid.requestFullScreen){
                vid.requestFullScreen();
            } else if(vid.webkitRequestFullScreen){
                vid.webkitRequestFullScreen();
            } else if(vid.mozRequestFullScreen){
                vid.mozRequestFullScreen();
            }
        },
        sendSeek(){
            var vid = document.getElementById('vid');
            var seekslider = document.getElementById('seekslider');
            var seekto = vid.duration * (seekslider.value / 100);
            socket.emit('change_Seeker', {seekto: seekto })
        }
        
    }
    
})



