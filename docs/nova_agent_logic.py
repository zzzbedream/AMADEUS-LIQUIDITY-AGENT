"""
AMADEUS NOVA AGENT: LIQUIDITY MANAGER v1.0
Author: Sentinel-AI Team
Description: Autonomous agent logic running on Tenstorrent/Nova infrastructure.
"""

import amadeus_api
import defi_integrations

# Risk configuration: Lower score = Better reliability
AIRLINE_RISK_MATRIX = {
    "LA": 0.1,  # LATAM (Tier 1)
    "AA": 0.1,  # American (Tier 1)
    "IB": 0.2,  # Iberia (Tier 1)
    "AF": 0.2,  # Air France (Tier 1)
    "XX": 0.9   # Low Cost / Charter (High Risk)
}

MIN_COLLATERAL_RATIO = 1.20  # 120% coverage required

def evaluate_liquidity_gap(agency_data):
    """
    Analyzes IATA BSP debt vs. Future confirmed receivables.
    Triggers flash loan if liquidity crunch is detected.
    """
    
    # 1. Calculate Liquidity Position
    debt = agency_data['financial_snapshot']['bsp_total_debt_usd']
    cash = agency_data['financial_snapshot']['current_cash_balance_usd']
    receivables = agency_data['confirmed_future_bookings']['summary']['total_receivables_usd']
    
    cash_gap = debt - cash
    
    print(f"ANALYSIS: Debt: ${debt} | Cash: ${cash} | GAP: -${cash_gap}")

    # 2. Safety Check (No gap? Do nothing)
    if cash_gap <= 0:
        return {"status": "HEALTHY", "action": "NONE"}

    # 3. Calculate Collateral Ratio (Value of future tickets / Gap)
    collateral_ratio = receivables / cash_gap
    print(f"METRIC: Collateral Ratio is {collateral_ratio:.2f}x (Min: {MIN_COLLATERAL_RATIO}x)")

    # 4. Calculate Risk Score based on Airline Mix
    portfolio_risk = 0
    for pnr in agency_data['confirmed_future_bookings']['pnr_samples']:
        airline_code = pnr['airline']
        # Default to high risk if airline unknown
        risk = AIRLINE_RISK_MATRIX.get(airline_code, 0.9) 
        portfolio_risk += risk
    
    avg_risk_score = portfolio_risk / len(agency_data['confirmed_future_bookings']['pnr_samples'])
    
    # 5. EXECUTION LOGIC
    # Condition: Sufficient Collateral AND Low Risk Portfolio
    if (collateral_ratio >= MIN_COLLATERAL_RATIO) and (avg_risk_score < 0.5):
        
        print(">>> CRITICAL: LIQUIDITY CRUNCH DETECTED <<<")
        print(">>> DECISION: INITIATING FLASH LOAN <<<")
        
        tx_hash = defi_integrations.execute_flash_loan(
            amount=cash_gap,
            token="USDC",
            collateral_proof=agency_data['agency_profile']['agency_id']
        )
        
        return {
            "status": "LOAN_REQUESTED", 
            "amount": cash_gap, 
            "tx_hash": tx_hash
        }
    else:
        return {"status": "REJECTED", "reason": "High Risk or Low Collateral"}
