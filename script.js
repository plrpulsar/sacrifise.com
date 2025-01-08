const contractAddress = "0xAd499C1C9A64E4EE2f43C00836ebF1337ef9e215";

const contractABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "spender", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "approve",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "recipient", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "transfer",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "sender", "type": "address" },
      { "internalType": "address", "name": "recipient", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "transferFrom",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

let userAddress = null;

const connectWalletButton = document.getElementById("connect-wallet");
const timerElement = document.getElementById("timer");
const startTimestamp = 1704715200; // 8 Enero 2025, 12:00 PM UTC

// Conectar la billetera
async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      userAddress = accounts[0];
      connectWalletButton.textContent = Conectado: ${userAddress.substring(0, 6)}...${userAddress.substring(userAddress.length - 4)};
      connectWalletButton.disabled = true;
    } catch (error) {
      alert("Error al conectar la wallet: " + error.message);
    }
  } else {
    alert("MetaMask no está instalado. Por favor, instálalo para continuar.");
  }
}

connectWalletButton.addEventListener("click", connectWallet);

// Actualizar cuenta regresiva
function updateCountdown() {
  const now = Math.floor(Date.now() / 1000);
  const timeLeft = startTimestamp - now;

  if (timeLeft > 0) {
    const days = Math.floor(timeLeft / (24 * 3600));
    const hours = Math.floor((timeLeft % (24 * 3600)) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    timerElement.textContent = ${days}d ${hours}h ${minutes}m ${seconds}s;
  } else {
    timerElement.textContent = "El sacrificio ha iniciado.";
  }
}

setInterval(updateCountdown, 1000);

// Enviar sacrificio
async function sendSacrifice(tokenAddress, amount) {
  if (!userAddress) {
    alert("Conecta tu wallet primero.");
    return;
  }

  if (!window.ethereum) {
    alert("MetaMask no está instalado.");
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  try {
    const tx = await contract.sacrifice(tokenAddress, ethers.utils.parseUnits(amount, 18));
    await tx.wait();
    alert("Sacrificio realizado con éxito.");
  } catch (error) {
    alert("Error al realizar el sacrificio: " + error.message);
  }
}

// Reclamar recompensas
async function claimRewards() {
  if (!userAddress) {
    alert("Conecta tu wallet primero.");
    return;
  }

  if (!window.ethereum) {
    alert("MetaMask no está instalado.");
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  try {
    const tx = await contract.claim();
    await tx.wait();
    alert("Recompensas reclamadas con éxito.");
  } catch (error) {
    alert("Error al reclamar las recompensas: " + error.message);
  }
}

// Configurar el formulario de sacrificio
const sacrificeForm = document.getElementById("sacrifice-form");
sacrificeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const token = document.getElementById("token").value;
  const amount = document.getElementById("amount").value;

  if (!token || !amount) {
    alert("Por favor, selecciona un token y una cantidad válida.");
    return;
  }

  sendSacrifice(token, amount);
});

// Configurar el botón de reclamar recompensas
const claimButton = document.getElementById("claim-btn");
claimButton.addEventListener("click", claimRewards);
