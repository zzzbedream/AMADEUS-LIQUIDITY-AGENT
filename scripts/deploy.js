const hre = require("hardhat");

async function main() {
    console.log("🚀 Iniciando despliegue en Amadeus Testnet...");

    const Agent = await hre.ethers.getContractFactory("AmadeusLiquidityAgent");
    const agent = await Agent.deploy();

    await agent.waitForDeployment();

    const address = await agent.getAddress();
    console.log(`✅ AmadeusLiquidityAgent desplegado en: ${address}`);
    console.log("👉 Guarda esta dirección para tu presentación.");

    // Opcional: Ejecutar una transacción de prueba para que se vea en el explorador
    console.log("📡 Enviando transacción de prueba 'submitSalesProof'...");
    const tx = await agent.submitSalesProof("CL-SANTIAGO-001", "PNR-XJ59LM", 5000);
    await tx.wait();
    console.log(`✅ Transacción confirmada: ${tx.hash}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
