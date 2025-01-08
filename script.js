let provider, signer, userAddress;
const pulseChainNetworkId = 369; // ID de red PulseChain (369 en decimal)
const tisTokenAddress = "0x16E0Adc89269E9c0F4f14B5b0AF786365ACBaC6b"; // Dirección del token TIS
const sacrificeContractAddress = "0xAd499C1C9A64E4EE2f43C00836ebF1337ef9e215"; // Dirección del contrato de sacrificio

// Conectar con MetaMask y PulseChain
async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
        provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        const network = await provider.getNetwork();
        
        // Verifica si estamos en la red PulseChain (ID de red: 369)
        if (network.chainId !== pulseChainNetworkId) {
            alert("Por favor, cambia a la red PulseChain en MetaMask.");
            return;
        }
        
        await provider.send("eth_requestAccounts", []); // Solicita acceso a la billetera
        signer = provider.getSigner();
        userAddress = await signer.getAddress();
        document.getElementById("walletAddress").innerText = `Dirección: ${userAddress}`;
        document.getElementById("connectWallet").innerText = "Billetera Conectada";
        document.getElementById("connectWallet").disabled = true;
    } else {
        alert("MetaMask no está instalado. Por favor, instálalo desde https://metamask.io/");
    }
}

// Aprobar los tokens para transferir
async function approveTokens() {
    const token = document.getElementById("tokenSelect").value;
    const amount = document.getElementById("sacrificeAmount").value;

    if (amount <= 0) {
        alert("Por favor, ingresa una cantidad válida.");
        return;
    }

    const currentTokenAddress = contracts[token];
    const tokenContract = new ethers.Contract(currentTokenAddress, [
        {
            "inputs": [
                { "internalType": "address", "name": "spender", "type": "address" },
                { "internalType": "uint256", "name": "amount", "type": "uint256" }
            ],
            "name": "approve",
            "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ], signer);

    const amountInWei = ethers.utils.parseUnits(amount, 18);
    const tx = await tokenContract.approve(sacrificeContractAddress, amountInWei);
    await tx.wait();
    alert("Tokens aprobados correctamente.");
}

// Sacrificar los tokens
async function sacrificeTokens() {
    const token = document.getElementById("tokenSelect").value;
    const amount = document.getElementById("sacrificeAmount").value;

    if (amount <= 0) {
        alert("Por favor, ingresa una cantidad válida.");
        return;
    }

    const currentTokenAddress = contracts[token];
    const tokenContract = new ethers.Contract(currentTokenAddress, [
        {
            "inputs": [
                { "internalType": "address", "name": "recipient", "type": "address" },
                { "internalType": "uint256", "name": "amount", "type": "uint256" }
            ],
            "name": "transferFrom",
            "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ], signer);

    const amountInWei = ethers.utils.parseUnits(amount, 18);
    const tx = await tokenContract.transferFrom(userAddress, sacrificeContractAddress, amountInWei);
    await tx.wait();

    // Aquí se dará el token TIS como recompensa después del sacrificio
    const tisTokenContract = new ethers.Contract(tisTokenAddress, [
        {
            "inputs": [
                { "internalType": "address", "name": "recipient", "type": "address" },
                { "internalType": "uint256", "name": "amount", "type": "uint256" }
            ],
            "name": "transfer",
            "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ], signer);

    const rewardAmount = ethers.utils.parseUnits(amount, 18); // La misma cantidad de los tokens sacrificados
    const rewardTx = await tisTokenContract.transfer(userAddress, rewardAmount);
    await rewardTx.wait();

    alert(`Sacrificio exitoso de ${amount} ${token}. ¡Recibiste ${amount} TIS como recompensa!`);
}

document.getElementById("connectWallet").addEventListener("click", connectWallet);
document.getElementById("approveTokens").addEventListener("click", approveTokens);
document.getElementById("sacrificeTokens").addEventListener("click", sacrificeTokens);
