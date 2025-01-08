let provider, signer, userAddress;
const pulseChainNetworkId = 369; // ID de red PulseChain (369 en decimal)
const tisTokenAddress = "0x16E0Adc89269E9c0F4f14B5b0AF786365ACBaC6b"; // Dirección del token TIS
const sacrificeContractAddress = "0xAd499C1C9A64E4EE2f43C00836ebF1337ef9e215"; // Dirección del contrato de sacrificio

// Direcciones de los contratos de los tokens en PulseChain
const contracts = {
    "INC": "0x8fa8c7ed3fa85c129b6ca3fa2cf0294b39c1b580",
    "HEX": "0xD2f9dF2e1e1c3b3b128D4cDe6b39D42F98e1a7C0",
    "WETH": "0x0B6e3A1D70b9F458742fD5A41570e529caE31bC2",
    "USDT": "0x2348f40c25609b7e9a079b29293edfe9b38d06a9",
    "PLS": "0x00e9e5db68b4385de66a33b68d30b079bc4a3ff2",
    "WPLS": "0x338ff3a1b2776c8bbbd8f1c4d63c64dd1f4287d3"
};

// Conectar con MetaMask y PulseChain
async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
        provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        
        const network = await provider.getNetwork();

        // Verifica si estamos en la red PulseChain (ID de red: 369)
        if (network.chainId !== pulseChainNetworkId) {
            try {
                await provider.send('wallet_addEthereumChain', [{
                    chainId: '0x171', // 369 en hexadecimal
                    chainName: 'PulseChain',
                    rpcUrls: ['https://rpc.v2.testnet.pulsechain.com'],
                    nativeCurrency: {
                        name: 'PLS',
                        symbol: 'PLS',
                        decimals: 18
                    },
                    blockExplorerUrls: ['https://scan.pulsechain.com']
                }]);
            } catch (error) {
                alert("No se pudo cambiar a PulseChain. Asegúrate de que MetaMask esté instalado y configurado correctamente.");
                return;
            }
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
