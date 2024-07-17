let proxyData = [];

// Funkcja do zapisania danych do LocalStorage
function saveToLocalStorage() {
    localStorage.setItem('proxyData', JSON.stringify(proxyData));
}

// Funkcja do wczytania danych z LocalStorage
function loadFromLocalStorage() {
    const data = localStorage.getItem('proxyData');
    if (data) {
        proxyData = JSON.parse(data);
    }
}

// Funkcja do dodania wpisu
function addEntry() {
    const nick = document.getElementById('user-nick').value;
    const ip = document.getElementById('user-ip').value;

    if (nick && ip) {
        const entry = { nick: nick, ip: ip };
        proxyData.push(entry);
        saveToLocalStorage();
        displayProxyList();
        document.getElementById('user-nick').value = '';
        document.getElementById('user-ip').value = '';
    } else {
        alert('Proszę wypełnić oba pola.');
    }
}

// Funkcja do wyświetlenia listy proxy
function displayProxyList() {
    const list = document.getElementById('proxy-list');
    list.innerHTML = '';
    proxyData.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = `Nick: ${entry.nick}, IP: ${entry.ip}`;
        list.appendChild(listItem);
    });
}

// Funkcja do wyszukiwania IP
function searchIP() {
    const searchIp = document.getElementById('search-ip').value;
    const result = document.getElementById('result');
    const found = proxyData.find(entry => entry.ip === searchIp);

    if (found) {
        result.textContent = `To Proxy zostało już użyte przez: ${found.nick}`;
    } else {
        result.textContent = 'To Proxy nie zostało jeszcze użyte.';
    }
}

// Załaduj dane z LocalStorage przy załadowaniu strony
window.onload = function() {
    loadFromLocalStorage();
    displayProxyList();
}
