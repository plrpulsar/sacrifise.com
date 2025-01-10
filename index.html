[12:26 p.m., 10/1/2025] +52 1 33 3800 6955: <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TIS Sacrifice Portal</title>
  <style>
    body {
      font-family: 'Roboto', sans-serif;
      margin: 0;
      background: radial-gradient(circle, #1a1a2e, #0f0f1f);
      color: #e0e0e0;
      overflow-x: hidden;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      text-align: center;
    }

    header h1 {
      font-size: 2.5rem;
      color: #00d4ff;
      text-shadow: 0 0 10px #00d4ff, 0 0 20px #00aaff;
    }

    header p {
      font-size: 1.2rem;
      color: #ffffffcc;
    }

    .countdown {
      margin: 20px 0;
      padding: 20px;
      background: rgba(0, 0, 50, 0.8);
      border-radius: 15px;
      box-shadow: 0 0 20px #00ff88;
    }

    #timer {
      font-size: 2rem;
      color: #00ff88;
    }

    section {
      margin: 20px 0;
      padding: 20px;
      background: rgba(0, 0, 50, 0.8);
      border-radius: 15px;
      box-shadow: 0 0 20px #00d4ff;
    }

    form label {
      display: block;
      margin: 10px 0 5px;
      text-align: left;
    }

    form select, form input, form button {
      width: 100%;
      padding: 10px;
      margin: 5px 0 15px;
      border: none;
      border-radius: 10px;
      font-size: 1rem;
    }

    form select, form input {
      background: #1a1a2e;
      color: #fff;
      box-shadow: inset 0 0 10px #00d4ff;
    }

    form button {
      background: #00d4ff;
      color: #fff;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 0 15px #00aaff;
      transition: background 0.3s;
    }

    form button:hover {
      background: #00aaff;
    }

    button#claim-btn, button#withdraw-hex-btn {
      margin-top: 15px;
      padding: 15px;
      font-size: 1.2rem;
      border-radius: 10px;
      border: none;
      cursor: pointer;
      transition: background 0.3s;
    }

    button#claim-btn {
      background: #00ff88;
      box-shadow: 0 0 20px #00ff88;
    }

    button#claim-btn:hover {
      background: #00d466;
    }

    button#withdraw-hex-btn {
      background: #ff4d4d;
      box-shadow: 0 0 20px #ff4d4d;
    }

    button#withdraw-hex-btn:hover {
      background: #cc0000;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>TIS Sacrifice Portal</h1>
      <p>Participa en el sacrificio y obtén recompensas exclusivas de TIS.</p>
    </header>
    
    <button id="connect-wallet">Conectar Wallet</button>

    <div class="countdown">
      <h2>Cuenta regresiva</h2>
      <div id="timer">Cargando...</div>
    </div>

    <section class="sacrifice">
      <h2>Realiza tu sacrificio</h2>
      <form id="sacrifice-form">
        <label for="token">Selecciona el Token:</label>
        <select id="token">
          <option value="0xA1077a294dDE1B09bB078844df40758a5D0f9a27">WPLS</option>
          <option value="0x95B303987A60C71504D99Aa1b13B4DA07b0790ab">PLSX</option>
          <option value="0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39">HEX</option>
          <option value="0x2fa878Ab3F87CC1C9737Fc071108F904c0B0C95d">INC</option>
          <option value="0x02DcdD04e3F455D838cd1249292C58f3B79e3C3C">WETH</option>
          <option value="0xefD766cCb38EaF1dfd701853BFCe31359239F305">DAI</option>
          <option value="0x0Cb6F5a34ad42ec934882A05265A7d5F59b51A2f">USDT</option>
        </select>
        
        <label for="amount">Cantidad:</label>
        <input type="number" id="amount" placeholder="Cantidad a sacrificar">
        
        <button type="submit">Enviar Sacrificio</button>
      </form>
    </section>

    <section class="claim">
      <h2>Reclamar Recompensas</h2>
      <button id="claim-btn">Reclamar TIS</button>
    </section>

    <section class="owner-actions">
      <h2>Opciones del Contrato</h2>
      <button id="withdraw-hex-btn">Retirar HEX</button>
    </section>
  </div>

  <script>
    const contractAddress = "0xAd499C1C9A64E4EE2f43C00836ebF1337ef9e215"; // Dirección del contrato
    const contractABI = [
      {
        "inputs": [
          { "internalType": "address", "name": "token", "type": "address" },
          { "internalType": "uint256", "name": "amount", "type": "uint256" }
        ],
        "name": "sacrifice",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "claim",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "withdrawHex",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];

    const connectWalletButton = document.getElementById("connect-wallet");
    const timerElement = document.getElementById("timer");
    const sacrificeForm = document.getElementById("sacrifice-form");
    const claimButton = document.getElementById("claim-btn");
    const withdrawHexButton = document.getElementById("withdraw-hex-btn");

    const startTimestamp = 1704715200; // 8 Enero 2025, 12:00 PM UTC
    let userAddress = null;

    async function connectWallet() {
      if (typeof window.ethereum !== "undefined") {
        try {
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          userAddress = accounts[0];
          connectWalletButton.textContent = Conectado: ${userAddress.substring(0, 6)}...${userAddress.slice(-4)};
          connectWalletButton.disabled = true;
        } catch (error) {
          alert("Error al conectar MetaMask: " + error.message);
        }
      } else {
        alert("MetaMask no está instalado. Por favor, instálalo para continuar.");
      }
    }

    function updateCountdown() {
      const now = Math.floor(Date.now() / 1000);
      const timeLeft = startTimestamp - now;

      if (timeLeft > 0) {
        const days = Math.floor(timeLeft / 86400);
        const hours = Math.floor((timeLeft % 86400) / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = ${days}d ${hours}h ${minutes}m ${seconds}s;
      } else {
        timerElement.textContent = "El sacrificio ha iniciado.";
      }
    }

    async function sendSacrifice(token, amount) {
      if (!userAddress) {
        alert("Conecta tu wallet primero.");
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      try {
        const tx = await contract.sacrifice(token, ethers.utils.parseUnits(amount, 18));
        await tx.wait();
        alert("Sacrificio enviado con éxito.");
      } catch (error) {
        alert("Error al enviar sacrificio: " + error.message);
      }
    }

    async function claimRewards() {
      if (!userAddress) {
        alert("Conecta tu wallet primero.");
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
        alert("Error al reclamar recompensas: " + error.message);
      }
    }

    async function withdrawHex() {
      if (!userAddress) {
        alert("Conecta tu wallet primero.");
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      try {
        const tx = await contract.withdrawHex();
        await tx.wait();
        alert("HEX retirado con éxito.");
      } catch (error) {
        alert("Error al retirar HEX: " + error.message);
      }
    }

    connectWalletButton.addEventListener("click", connectWallet);

    sacrificeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const token = document.getElementById("token").value;
      const amount = document.getElementById("amount").value;

      if (!token || amount <= 0) {
        alert("Por favor, selecciona un token válido e ingresa una cantidad mayor a 0.");
        return;
      }

      sendSacrifice(token, amount);
    });

    claimButton.addEventListener("click", claimRewards);
    withdrawHexButton.addEventListener("click", withdrawHex);

    setInterval(updateCountdown, 1000);
    updateCountdown();
  </script>
</body>
</html>
[2:51 p.m., 10/1/2025] +52 1 33 3800 6955: <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TIS Sacrifice</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #1e1e2f, #4a4a70);
            color: #fff;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 800px;
            margin: auto;
            padding: 20px;
            text-align: center;
        }
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        header h1 {
            font-size: 2rem;
        }
        header button {
            p…
