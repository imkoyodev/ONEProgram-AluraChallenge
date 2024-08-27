const InputText = document.querySelector(".InputTextArea");
const OutputText = document.querySelector(".OutputTextArea");
const DivOutputText = document.querySelector(".OutputDivTextArea");
const EncryptButton = document.querySelector(".DivEncryptButton");
const DecryptButton = document.querySelector(".DivDecryptButton");
const CopyButton = document.querySelector(".CopyDivButton");

function CheckText(UserInput) {
    const HasCaps = /[A-Z]/.test(UserInput);
    const HasAccents = /[áéíóúü]/.test(UserInput);
    const HasSymbols = /[^a-zA-Z0-9\s]/.test(UserInput);
    if (HasCaps && HasAccents) {
        return "No utilizar acentos o mayusculas";
    } else if (HasCaps) {
        return "No utilizar mayusculas";
    } else if (HasAccents) {
        return "No utilizar acentos";
    }
    else if (HasSymbols){
        return "No utilizar simbolos o caracteres especiales"
    }  
    return null;
}

function Encrypt(UserInput) {
   let Encrypted = "";

   for (let i = 0; i < UserInput.length; i++) {
    const opc = UserInput[i];

    switch (opc) {
        case 'o':
            Encrypted += 'ober';
            break;
        case 'a':
            Encrypted += 'ai';
            break;
        case 'e':
            Encrypted += 'enter';
            break;
        case 'i':
            Encrypted += 'imes';
            break;
        case 'u':
            Encrypted += 'ufat';
            break;
        default:
            Encrypted += opc;
    }
    
   }

   return Encrypted;
}

function Decrypt(UserInput) {

    let TextArray = [["ai","a"],["enter","e"],["imes","i"],["ober","o"],["ufat", "u"]];
    
    for (let i = 0; i < TextArray.length; i++) {
        if (UserInput.includes(TextArray[i][0])) {
            UserInput = UserInput.replaceAll(TextArray[i][0],TextArray[i][1]);
        }
        
    }

    return UserInput;
}

function EventEncryptButton() {

    let UserInput = InputText.value;

    const ErrorMsg = CheckText(UserInput);

    if (ErrorMsg) {
        OutputText.textContent = ErrorMsg;
        OutputText.style.backgroundImage = "none";
        OutputText.style.display = "block";
        DivOutputText.style.display = "none";
        CopyButton.style.display = "block";
        CopyButton.textContent = "OK";
        CopyButton.removeEventListener('click',EventCopyButton);
        CopyButton.addEventListener('click',EventNoticeButton);

        return;
    }

    let Encrypted = Encrypt(UserInput);    
    OutputText.textContent = Encrypted;

     InputText.value = ""; 

    OutputText.style.backgroundImage = "none";
    OutputText.style.display = "block";
    DivOutputText.style.display = "none";
    CopyButton.style.display = "block";
    
}

function EventDecryptButton(){
    let UserInput = InputText.value;
    let decrypted = Decrypt(UserInput);
    OutputText.textContent = decrypted;
    InputText.value = "";
    OutputText.style.backgroundImage = "none";
    OutputText.style.display = "block";
    DivOutputText.style.display = "none";
    CopyButton.style.display = "block";
 
}

async function CopyText(UserInput) {
    let If_CopyOk = false;
    try {
        await navigator.clipboard.writeText(UserInput);
        If_CopyOk = true;
       
    } catch (error) {
        console.error(error.message);
    }
   
    if (If_CopyOk) {
        window.location.href = window.location.href;
    }
}

function EventCopyButton() {
    let UserInput = OutputText.textContent; 
    CopyText(UserInput);
    // console.log(UserInput);
}

function EventNoticeButton() {
    location.reload();
}
  

   EncryptButton.addEventListener('click', EventEncryptButton);
   DecryptButton.addEventListener('click', EventDecryptButton);
   CopyButton.addEventListener('click',EventCopyButton);
