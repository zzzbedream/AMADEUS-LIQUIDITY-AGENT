import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ShieldCheck,
    Activity,
    Terminal,
    ExternalLink,
    CheckCircle,
    AlertTriangle,
    ArrowLeft,
    Wallet,
    Globe,
    TrendingUp,
    Clock
} from 'lucide-react';

// DATOS "REALES" PARA LA DEMO
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const TX_HASH = "0x64f80bcdb9834aa235cf96cfee9c2f6a948ec4c711ad8a158e9fefb931bbf9e0";
const EXPLORER_LINK = "https://sepolia.etherscan.io/tx/0x64f80bcdb9834aa235cf96cfee9c2f6a948ec4c711ad8a158e9fefb931bbf9e0";

export default function Dashboard() {
    const [status, setStatus] = useState('IDLE'); // IDLE, PROCESSING, SUCCESS
    const [logs, setLogs] = useState([
        { msg: "✓ Agent initialized", time: "00:00:01" },
        { msg: "✓ Connected to Amadeus GDS", time: "00:00:02" },
        { msg: "✓ Monitoring BSP deadlines...", time: "00:00:03" },
    ]);

    const executeLoan = () => {
        setStatus('PROCESSING');

        const sequence = [
            { msg: "📡 Connecting to Amadeus Nova Runtime...", delay: 600 },
            { msg: "🔍 Fetching PNR data from GDS Oracle...", delay: 1200 },
            { msg: "📊 Analyzing airline portfolio risk...", delay: 2000 },
            { msg: "✓ Risk score: 0.18 (LOW)", delay: 2800 },
            { msg: "🔐 Generating State Proof of Solvency...", delay: 3600 },
            { msg: "⛓️ Submitting to LiquidityVault.sol...", delay: 4500 },
            { msg: `📝 Contract: ${CONTRACT_ADDRESS.substring(0, 10)}...`, delay: 5200 },
            { msg: "⏳ Waiting for block confirmation...", delay: 5800 },
            { msg: "✅ Transaction confirmed on Block #4829102", delay: 6800 },
            { msg: `🔗 TxHash: ${TX_HASH.substring(0, 16)}...`, delay: 7200 },
        ];

        sequence.forEach(({ msg, delay }) => {
            setTimeout(() => {
                const time = `00:00:${String(Math.floor(delay / 1000) + 4).padStart(2, '0')}`;
                setLogs(prev => [...prev, { msg, time }]);
            }, delay);
        });

        setTimeout(() => {
            setStatus('SUCCESS');
        }, 7500);
    };

    const resetDemo = () => {
        setStatus('IDLE');
        setLogs([
            { msg: "✓ Agent initialized", time: "00:00:01" },
            { msg: "✓ Connected to Amadeus GDS", time: "00:00:02" },
            { msg: "✓ Monitoring BSP deadlines...", time: "00:00:03" },
        ]);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Header */}
            <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link to="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-sm">Back</span>
                        </Link>
                        <div className="h-6 w-px bg-white/10" />
                        <div>
                            <h1 className="font-semibold">Amadeus Liquidity Agent</h1>
                            <p className="text-xs text-white/40">Nova Runtime v1.0.4</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs">
                            <Globe className="w-3 h-3 text-emerald-400" />
                            <span className="text-white/60">Amadeus Mainnet</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono">
                            <Wallet className="w-3 h-3 text-white/40" />
                            <span className="text-white/60">{CONTRACT_ADDRESS.substring(0, 6)}...{CONTRACT_ADDRESS.substring(38)}</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Alert Banner */}
                {status !== 'SUCCESS' && (
                    <div className="mb-8 p-5 rounded-xl bg-red-500/5 border border-red-500/20 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-red-500/10">
                                <AlertTriangle className="w-6 h-6 text-red-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-red-400">LIQUIDITY CRUNCH DETECTED</h3>
                                <p className="text-sm text-white/50">BSP Payment deadline approaching</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20">
                            <Clock className="w-4 h-4 text-red-400" />
                            <span className="font-mono text-red-400">71:45:12</span>
                        </div>
                    </div>
                )}

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
                                <p className="text-sm text-white/40 mb-2">BSP Debt Due</p>
                                <p className="text-3xl font-bold text-red-400">$50,000</p>
                                <p className="text-xs text-white/30 mt-1">Due: Jan 17, 2026</p>
                            </div>
                            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
                                <p className="text-sm text-white/40 mb-2">Collateral Value</p>
                                <p className="text-3xl font-bold text-emerald-400">$65,000</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="px-2 py-0.5 text-xs rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">VERIFIED</span>
                                </div>
                            </div>
                        </div>

                        {/* Collateral Bar */}
                        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-sm text-white/40">Collateral Ratio</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-white">1.30x</span>
                                    <span className="px-2 py-0.5 text-xs rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">SAFE</span>
                                </div>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: '100%' }} />
                            </div>
                            <p className="text-xs text-white/30 mt-2">Minimum required: 1.20x (120%)</p>
                        </div>

                        {/* Terminal Logs */}
                        <div className="rounded-xl bg-black border border-white/10 overflow-hidden">
                            <div className="px-4 py-2 border-b border-white/10 flex items-center gap-2">
                                <Terminal className="w-4 h-4 text-white/40" />
                                <span className="text-xs text-white/40">SYSTEM LOGS</span>
                            </div>
                            <div className="p-4 h-56 overflow-y-auto font-mono text-xs space-y-1">
                                {logs.map((log, i) => (
                                    <div key={i} className="flex gap-3">
                                        <span className="text-white/20">[{log.time}]</span>
                                        <span className="text-emerald-400/80">{log.msg}</span>
                                    </div>
                                ))}
                                {status === 'PROCESSING' && (
                                    <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse" />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Action Panel */}
                    <div className="flex flex-col">
                        <div className="flex-1 p-6 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col">
                            {status === 'IDLE' && (
                                <>
                                    <div className="flex-1">
                                        <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 mb-6">
                                            <div className="flex items-center gap-2 mb-2">
                                                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                                                <span className="font-medium text-emerald-400">LOAN PRE-APPROVED</span>
                                            </div>
                                            <p className="text-sm text-white/50">Nova Agent has validated your collateral via Amadeus Oracle</p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex justify-between py-3 border-b border-white/5">
                                                <span className="text-white/50">Loan Amount</span>
                                                <span className="font-semibold">$41,500 USDC</span>
                                            </div>
                                            <div className="flex justify-between py-3 border-b border-white/5">
                                                <span className="text-white/50">Interest Rate</span>
                                                <span className="font-semibold text-emerald-400">8.5% APR</span>
                                            </div>
                                            <div className="flex justify-between py-3 border-b border-white/5">
                                                <span className="text-white/50">Repayment Term</span>
                                                <span className="font-semibold">30 days</span>
                                            </div>
                                            <div className="flex justify-between py-3">
                                                <span className="text-white/50">Risk Score</span>
                                                <span className="font-semibold text-emerald-400">0.18 (Low)</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={executeLoan}
                                        className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-semibold rounded-xl hover:opacity-90 transition-opacity mt-6"
                                    >
                                        EXECUTE FLASH LOAN
                                    </button>
                                </>
                            )}

                            {status === 'PROCESSING' && (
                                <div className="flex-1 flex flex-col items-center justify-center">
                                    <Activity className="w-12 h-12 text-emerald-400 animate-spin mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">Processing On-Chain</h3>
                                    <p className="text-white/50 text-sm">Executing flash loan via LiquidityVault.sol</p>
                                </div>
                            )}

                            {status === 'SUCCESS' && (
                                <div className="flex-1 flex flex-col">
                                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                                            <CheckCircle className="w-8 h-8 text-emerald-400" />
                                        </div>
                                        <h2 className="text-2xl font-bold mb-2">Loan Disbursed</h2>
                                        <p className="text-white/50 mb-6">$41,500 USDC transferred to Agency Wallet</p>

                                        <div className="w-full p-4 rounded-lg bg-black/50 border border-white/10 text-left space-y-3">
                                            <div>
                                                <p className="text-xs text-white/40 mb-1">CONTRACT ADDRESS</p>
                                                <p className="font-mono text-sm text-white/80 break-all">{CONTRACT_ADDRESS}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-white/40 mb-1">TRANSACTION HASH</p>
                                                <a
                                                    href={EXPLORER_LINK}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="font-mono text-sm text-emerald-400 hover:underline flex items-center gap-2 break-all"
                                                >
                                                    {TX_HASH}
                                                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={resetDemo}
                                        className="w-full py-3 bg-white/5 border border-white/10 text-white/60 font-medium rounded-xl hover:bg-white/10 transition-colors mt-6"
                                    >
                                        Reset Demo
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* PNR Table */}
                <div className="mt-8 rounded-xl bg-white/[0.02] border border-white/5 overflow-hidden">
                    <div className="px-6 py-4 border-b border-white/5">
                        <h3 className="font-semibold">Validated PNRs (Collateral)</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/5 text-left text-xs text-white/40">
                                    <th className="px-6 py-3 font-medium">PNR</th>
                                    <th className="px-6 py-3 font-medium">Airline</th>
                                    <th className="px-6 py-3 font-medium">Route</th>
                                    <th className="px-6 py-3 font-medium text-right">Value</th>
                                    <th className="px-6 py-3 font-medium text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {[
                                    { pnr: 'XJ59LM', airline: 'LATAM', route: 'SCL-MIA', value: 12500, status: 'Confirmed' },
                                    { pnr: 'AA982K', airline: 'American', route: 'SCL-DFW', value: 18000, status: 'Flown' },
                                    { pnr: 'IB4452', airline: 'Iberia', route: 'SCL-MAD', value: 15000, status: 'Confirmed' },
                                    { pnr: 'AF402P', airline: 'Air France', route: 'SCL-CDG', value: 11000, status: 'Confirmed' },
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4 font-mono text-emerald-400">{row.pnr}</td>
                                        <td className="px-6 py-4">{row.airline}</td>
                                        <td className="px-6 py-4 text-white/50">{row.route}</td>
                                        <td className="px-6 py-4 text-right font-semibold">${row.value.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2 py-1 text-xs rounded ${row.status === 'Confirmed'
                                                    ? 'bg-emerald-500/20 text-emerald-400'
                                                    : 'bg-teal-500/20 text-teal-400'
                                                }`}>
                                                {row.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
