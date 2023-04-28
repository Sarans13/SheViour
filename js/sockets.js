const server = io('https://sheviour.kalingakhatua.repl.co');

server.on('message', text => {

    const el = document.createElement('li');
    el.innerHTML = text;
    document.querySelector('.messages-box').appendChild(el)

});

document.querySelector('.messages-btn').onclick = () => {

    const text = document.querySelector('.messages-input').value;
    console.log("🚀 ~ file: sockets.js:14 ~ document.querySelector ~ text:", text)
    server.emit('message', text)
    
}
