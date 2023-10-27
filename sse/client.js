const eventSource = new EventSource('http://localhost:5000/');

function updateMessage(message) {
   const list = document.getElementById('message').innerHTML = message;
   const msg = document.createElement('p');

   msg.textContent = message;
    list.appendChild(msg);
}

eventSource.onmessage = function (e) {
    updateMessage(e.data);
};

eventSource.onerror = function () {
    updateMessage('Server close connection.')
    eventSource.close();
};