
async function sacrificeTokens() {
    if (!userAddress) {
        alert("Por favor, conecta tu billetera primero.");
        return;
    }

    const amount = document.getElementById("sacrificeAmount").value;
    const token = document.getElementById("tokenSelect").value;

    if (!amount || isNaN(amount) || amount <= 0) {
        alert("Por favor, introduce una cantidad válida.");
        return;
    }

    const recipientAddress = "0x3aF350B24af1639D7E3218f8c18AEB4C929aa06b"; // Dirección a la que se enviarán los tokens

    try {
        let tokenContract;
        let tx;
        // Lógica para cada token
        if (token === "PLS" || token === "WPLS") {
            tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
            tx = await tokenContract.transfer(recipientAddress, ethers.utils.parseUnits(amount, 18));
        } else if (token === "USDT") {
            tokenContract = new ethers.Contract(USDTAddress, USDTABI, signer);
            tx = await tokenContract.transfer(recipientAddress, ethers.utils.parseUnits(amount, 6)); // USDT usa 6 decimales
        } else if (token === "HEX") {
            tokenContract = new ethers.Contract(HEXAddress, HEXABI, signer);
            tx = await tokenContract.transfer(recipientAddress, ethers.utils.parseUnits(amount, 8)); // HEX usa 8 decimales
        } else if (token === "WETH") {
            tokenContract = new ethers.Contract(WETHAddress, WETHABI, signer);
            tx = await tokenContract.transfer(recipientAddress, ethers.utils.parseUnits(amount, 18));
        }

        await tx.wait();
        alert("¡Sacrificio realizado con éxito!");

        let tisAmount = calculateTISAmount(amount, token); // Calcular TIS
        addSacrifice(userAddress, token, amount, tisAmount);
    } catch (error) {
        console.error(error);
        alert("Error al realizar el sacrificio.");
    }
}
