const hre = require("hardhat");

async function main() {
    // 1. Configuración de Seguridad para HTTP
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    console.log("═══════════════════════════════════════════════════════════");
    console.log("       AMADEUS LIQUIDITY AGENT - DEPLOYMENT DIAGNOSTIC      ");
    console.log("═══════════════════════════════════════════════════════════");
    console.log("");
    console.log("📡 Conectando a Amadeus Testnet...");
    console.log("🔗 RPC:", hre.network.config.url);
    console.log("🔢 Chain ID (config):", hre.network.config.chainId || "auto");
    console.log("");

    // 2. Obtener la Wallet (Signer)
    const [deployer] = await hre.ethers.getSigners();
    console.log("👤 Desplegando con la cuenta:", deployer.address);

    // 3. Chequear Balance (Diagnóstico de Faucet)
    try {
        const balance = await hre.ethers.provider.getBalance(deployer.address);
        console.log("💰 Balance de la cuenta:", hre.ethers.formatEther(balance), "AMA/ETH");

        if (balance.toString() === "0") {
            console.warn("");
            console.warn("⚠️  ALERTA: Tu balance es 0.");
            console.warn("ℹ️  Si la red cobra gas, esto fallará con 'insufficient funds'.");
            console.warn("ℹ️  Intentando desplegar de todas formas (algunas testnets tienen gas gratis)...");
            console.warn("");
        }
    } catch (error) {
        console.error("❌ Error leyendo balance (¿Posible error de conexión RPC?):");
        console.error("   ", error.message);
        console.log("");
        console.log("🔄 Intentando continuar con el despliegue de todas formas...");
    }

    // 4. Verificar conexión a la red
    try {
        const network = await hre.ethers.provider.getNetwork();
        console.log("🌐 Red detectada - Chain ID:", network.chainId.toString());
    } catch (error) {
        console.error("❌ No se pudo detectar la red:", error.message);
    }

    // 5. Desplegar Contrato
    console.log("");
    console.log("🚀 Iniciando despliegue del contrato AmadeusLiquidityAgent...");
    console.log("");

    try {
        const Agent = await hre.ethers.getContractFactory("AmadeusLiquidityAgent");

        // Intento 1: Despliegue normal
        let agent;
        try {
            agent = await Agent.deploy();
        } catch (deployError) {
            // Intento 2: Con gasPrice forzado a 0 (algunas testnets lo permiten)
            console.log("⚠️  Primer intento falló, probando con gasPrice: 0...");
            agent = await Agent.deploy({ gasPrice: 0 });
        }

        await agent.waitForDeployment();

        const contractAddress = await agent.getAddress();

        console.log("═══════════════════════════════════════════════════════════");
        console.log("                    ✅ ¡ÉXITO!                              ");
        console.log("═══════════════════════════════════════════════════════════");
        console.log("");
        console.log("📜 Contrato desplegado en:", contractAddress);
        console.log("");
        console.log("👉 GUARDA ESTA DIRECCIÓN para tu presentación.");
        console.log("👉 Verifica en el explorador: https://ama-explorer.ddns.net/");
        console.log("");

        // 6. Ejecutar transacción de prueba
        console.log("📡 Enviando transacción de prueba 'submitSalesProof'...");
        try {
            const tx = await agent.submitSalesProof("CL-SANTIAGO-001", "PNR-XJ59LM", 5000);
            await tx.wait();
            console.log("✅ Transacción confirmada!");
            console.log("🔗 TX Hash:", tx.hash);
        } catch (txError) {
            console.log("⚠️  Transacción de prueba falló (el contrato está desplegado):", txError.message);
        }

        console.log("");
        console.log("═══════════════════════════════════════════════════════════");
        console.log("          📸 TOMA CAPTURA DE PANTALLA DE ESTO               ");
        console.log("═══════════════════════════════════════════════════════════");

    } catch (error) {
        console.error("");
        console.error("═══════════════════════════════════════════════════════════");
        console.error("                    ❌ ERROR EN DESPLIEGUE                  ");
        console.error("═══════════════════════════════════════════════════════════");
        console.error("");
        console.error("Mensaje:", error.message);
        console.error("");

        if (error.message.includes("insufficient funds")) {
            console.error("💡 SOLUCIÓN: Necesitas tokens de la Faucet de Amadeus.");
            console.error("   Contacta a los organizadores o busca una faucet en Discord.");
        } else if (error.message.includes("connect") || error.message.includes("ECONNREFUSED")) {
            console.error("💡 SOLUCIÓN: El RPC no está respondiendo.");
            console.error("   1. Verifica que la IP/puerto sean correctos");
            console.error("   2. Puede que la testnet esté caída temporalmente");
        } else if (error.message.includes("chainId")) {
            console.error("💡 SOLUCIÓN: El Chain ID no coincide.");
            console.error("   Prueba con --network amadeus_ip_auto (sin chainId)");
        }

        process.exitCode = 1;
    }
}

main().catch((error) => {
    console.error("❌ Error Fatal:", error);
    process.exitCode = 1;
});
