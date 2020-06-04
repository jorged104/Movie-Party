var socket = io();
socket.on("message-from-server-to-client", function(msg) {
console(msg);
});
const app = new Vue({
    el : '#app',
    data:{
        hola_mundo: 'Hola mundo oytas',
        messages: [{user:"jorge", message: "hola mundo" }]
    },
    methods:{
        sendMesssage(){
            socket.emit('message-from-client-to-server', 'Hello World!');
        }
    }
    
})



