import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    Zap,
    Shield,
    Clock,
    TrendingUp,
    CheckCircle,
    ExternalLink,
    Plane,
    DollarSign,
    FileCheck
} from 'lucide-react';

export default function Landing() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                            <Plane className="w-4 h-4 text-black" />
                        </div>
                        <span className="font-semibold text-lg">AmadeusAgent</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-sm text-white/60 hover:text-white transition-colors">Features</a>
                        <a href="#how" className="text-sm text-white/60 hover:text-white transition-colors">How it works</a>
                    </div>

                    <Link
                        to="/dashboard"
                        className="px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-white/90 transition-colors"
                    >
                        Launch App
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                        <span className="text-white">Instant liquidity</span>
                        <br />
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">for travel agencies</span>
                    </h1>

                    <p className="mt-6 text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
                        Transform future bookings into liquid assets in seconds.
                        <br className="hidden md:block" />
                        AI-powered risk assessment. Zero friction.
                    </p>

                    <a
                        href="#features"
                        className="inline-flex items-center gap-2 mt-10 text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                        Learn more
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-20 px-6 border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Feature 1 */}
                        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6">
                                <Shield className="w-6 h-6 text-emerald-400" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3">Nova AI risk assessment</h3>
                            <p className="text-white/50 text-sm leading-relaxed">
                                Deterministic scoring engine evaluates airline reliability, booking status, and payment history in milliseconds. Fully transparent and auditable.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center mb-6">
                                <Zap className="w-6 h-6 text-teal-400" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3">Instant liquidity</h3>
                            <p className="text-white/50 text-sm leading-relaxed">
                                Pre-funded liquidity pool. Sell your validated PNR collateral instantly with competitive rates. No orderbooks, no delays.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6">
                                <DollarSign className="w-6 h-6 text-cyan-400" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3">Built on Amadeus</h3>
                            <p className="text-white/50 text-sm leading-relaxed">
                                State proofs validate bookings on-chain. Nova Runtime processes GDS data efficiently. GDPR compliant by design.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how" className="py-20 px-6 border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold">Simple, powerful workflow</h2>
                        <p className="mt-4 text-white/50">From crisis detection to liquidity in three steps</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="relative">
                            <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-sm font-bold">
                                1
                            </div>
                            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 h-full">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mb-6">
                                    <TrendingUp className="w-6 h-6 text-emerald-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Crisis detection</h3>
                                <p className="text-white/50 text-sm leading-relaxed">
                                    Agent monitors BSP debt vs. cash balance 24/7. Triggers alert 72 hours before deadline with full transparency.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative">
                            <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 text-sm font-bold">
                                2
                            </div>
                            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 h-full">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center mb-6">
                                    <FileCheck className="w-6 h-6 text-teal-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Collateral validation</h3>
                                <p className="text-white/50 text-sm leading-relaxed">
                                    Amadeus validates your future bookings as collateral. 120% coverage required. State proofs generated on-chain.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative">
                            <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-sm font-bold">
                                3
                            </div>
                            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 h-full">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-6">
                                    <Zap className="w-6 h-6 text-cyan-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Instant cash</h3>
                                <p className="text-white/50 text-sm leading-relaxed">
                                    Execute DeFi flash loan. Receive USDC instantly at 8-12% APR. No waiting, no banks, no friction.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-emerald-400">30s</div>
                            <div className="mt-2 text-sm text-white/50">Approval time</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-teal-400">8%</div>
                            <div className="mt-2 text-sm text-white/50">Starting APR</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-cyan-400">120%</div>
                            <div className="mt-2 text-sm text-white/50">Min collateral</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-blue-400">$0</div>
                            <div className="mt-2 text-sm text-white/50">Hidden fees</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to transform your liquidity?
                    </h2>
                    <p className="text-white/50 mb-10">
                        No agency should die waiting for a bank.
                    </p>
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-semibold rounded-xl hover:opacity-90 transition-opacity"
                    >
                        Launch Dashboard
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-6 border-t border-white/5">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-gradient-to-br from-emerald-400 to-teal-500" />
                        <span className="font-medium text-sm">Amadeus Liquidity Agent</span>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-white/40">
                        <a href="#" className="hover:text-white transition-colors">Docs</a>
                        <a href="#" className="hover:text-white transition-colors">GitHub</a>
                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                    </div>

                    <div className="text-sm text-white/30">
                        Genesis Hackathon 2026
                    </div>
                </div>
            </footer>
        </div>
    );
}
