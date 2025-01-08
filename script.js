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
  }
];

let userAddress = null;

const connectWalletButton = document.getElementById("connect-wallet");

async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      userAddress = accounts[0];
      connectWalletButton.textContent = Conectado: ${userAddress.substring(0, 6)}...${userAddress.substring(userAddress.length - 4)};
      connectWalletButton.disabled = true;
    } catch (error) {
      alert("Error al conectar la wallet.");
    }
  } else {
    alert("MetaMask no está instalado.");
  }
}

connectWalletButton.addEventListener("click", connectWallet);
