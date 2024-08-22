function changeText(divId) {
    const content = document.getElementById(divId).innerHTML
    document.getElementById('card-content').innerHTML = content;
}

function downloadTextFile(text, filename, elementId) {
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const p = document.getElementById(elementId);
        p.innerHTML = `
        <div class="attachment">
            <img src="./imgs/attach.png" alt="Ícone de Anexo" class="attachment-icon">
            <a href="${url}" download="${filename}" class="attachment-link" target="_blank">Baixar Anexo</a>
        </div>
    `;
        }

function getLocalTime() {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(now);
    const year = now.getFullYear();
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}  ${day} ${month} ${year} `;
}


function displayTime() {
    const timeDisplay = document.getElementById('time-display');
    if (timeDisplay) {
        timeDisplay.textContent = getLocalTime();
    } else {
        console.error('Elemento com ID "time-display" não encontrado.');
    }
}

const key = CryptoJS.enc.Utf8.parse('1234567890123456'); 
const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); 

function encryptMessage(message) {
    const encrypted = CryptoJS.AES.encrypt(message, key, { iv: iv }).toString();
    downloadTextFile(encrypted, `mensagem_criptografada_${getLocalTime()}.txt`, 'cryptTXT');
    
}

function decryptMessage(encryptedMessage) {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, key, { iv: iv });
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    downloadTextFile(decrypted, `mensagem_descriptografada_${getLocalTime()}.txt`, 'descryptTXT');
}

function descriptFunction() {
    const valueInput = document.getElementById('descriptInput').value;

    const descriptValue = decryptMessage(valueInput)
}


function criptFunction() {
    const valueInput = document.getElementById('criptInput').value

        const criptoValue = encryptMessage(valueInput)
}

setInterval(displayTime, 1000);

displayTime();