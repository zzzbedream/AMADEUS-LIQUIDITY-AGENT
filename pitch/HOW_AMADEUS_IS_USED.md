# How Amadeus Is Used - Technical Integration Document

## Executive Summary

**Amadeus Liquidity Agent** leverages the Amadeus Network's unique capabilities to create an autonomous CFO agent for travel agencies. This document details how we integrate with the core Amadeus infrastructure.

---

## 1. Nova Runtime & WASM Integration

### Why Nova Runtime?

Traditional EVM chains cannot efficiently process the complex JSON payloads from travel GDS systems. The Amadeus Nova Runtime provides:

| Capability | Benefit for Liquidity Agent |
|------------|----------------------------|
| **WASM Execution** | Parse complex PNR JSON without gas limits |
| **Deterministic Computation** | Reproducible risk calculations across nodes |
| **State Proofs** | Cryptographic attestation of agent decisions |

### Our WASM Module

```rust
// agent_logic.wasm - Compiled from Rust
#[no_mangle]
pub fn evaluate_liquidity(input: &[u8]) -> Result<Decision, Error> {
    // 1. Parse Amadeus GDS JSON payload
    let agency_data: AgencySnapshot = serde_json::from_slice(input)?;
    
    // 2. Calculate liquidity gap
    let gap = agency_data.bsp_debt - agency_data.cash_balance;
    
    // 3. Evaluate collateral from PNR data
    let collateral: f64 = agency_data.bookings
        .iter()
        .map(|b| b.ticket_value)
        .sum();
    
    // 4. Risk assessment
    let risk = calculate_portfolio_risk(&agency_data.bookings);
    
    // 5. Decision with proof
    if collateral / gap >= 1.20 && risk < 0.50 {
        Ok(Decision::Approve { amount: gap, proof: generate_state_proof() })
    } else {
        Ok(Decision::Deny { reason: "Insufficient collateral" })
    }
}
```

---

## 2. State Proofs (Agent Identity & Trust)

### The Trust Problem

DeFi protocols need to trust that collateral claims are valid. Traditional solutions require:
- Centralized oracles (single point of failure)
- On-chain data storage (expensive, privacy issues)

### Our Solution: Amadeus State Proofs

The Nova Agent generates a **cryptographic State Proof** that attests:

```
┌─────────────────────────────────────────────────────────────┐
│                     STATE PROOF CONTENTS                    │
├─────────────────────────────────────────────────────────────┤
│  ✓ Agency has $65,000 in confirmed future bookings         │
│  ✓ Bookings are from Tier-1 airlines (LATAM, AA, IB)       │
│  ✓ Average departure date is 18 days from now              │
│  ✓ Historical payment compliance: 98%                       │
│  ✓ Proof generated at block #12345678                       │
│  ✓ Signed by Nova Agent: 0x7a8f...                          │
└─────────────────────────────────────────────────────────────┘
```

### Privacy Preservation (GDPR Compliant)

The State Proof **does NOT reveal**:
- Passenger names or PII
- Specific flight numbers
- Individual ticket values

It only proves **aggregate solvency** through zero-knowledge techniques.

---

## 3. Risk Evaluation Agent (Vertical Match)

### Amadeus Genesis Track: "Risk Evaluation Agents"

Our agent performs continuous risk evaluation using real-time Amadeus data:

#### Risk Factors Analyzed:

| Factor | Source | Weight |
|--------|--------|--------|
| Airline Credit Rating | Amadeus GDS | 30% |
| Flight Cancellation Rate | Amadeus Flight Status API | 25% |
| Agency Payment History | On-chain data | 25% |
| Booking Concentration | PNR Analysis | 20% |

#### Dynamic Rate Adjustment:

```python
def calculate_interest_rate(base_rate: float, risk_factors: dict) -> float:
    """
    Dynamically adjusts APR based on real-time Amadeus data
    """
    rate = base_rate  # 6.0% base
    
    # Airline risk premium
    if risk_factors['airline_mix_score'] > 0.3:
        rate += 2.0  # Higher risk airlines
    
    # Cancellation risk
    if risk_factors['cancellation_probability'] > 0.1:
        rate += 1.5  # Volatile routes
    
    # Loyalty discount
    if risk_factors['on_chain_history_score'] > 0.8:
        rate -= 1.0  # Good payment history
    
    return min(rate, 15.0)  # Cap at 15% APR
```

---

## 4. Amadeus API Integration Points

### Required API Access:

| API Endpoint | Purpose | Data Retrieved |
|--------------|---------|----------------|
| `GET /bookings/pnr/{id}` | Validate individual bookings | PNR status, value, dates |
| `GET /agencies/{id}/bsp` | BSP settlement schedule | Due dates, amounts |
| `GET /flights/{id}/status` | Real-time flight status | Cancellations, delays |
| `POST /oracle/verify` | Submit state proof | Proof validation |

### Sample API Request (PNR Validation):

```json
// Request
GET /v1/bookings/pnr/XJ59LM
Authorization: Bearer {amadeus_token}

// Response
{
  "pnr_locator": "XJ59LM",
  "status": "CONFIRMED",
  "airline": {
    "code": "LA",
    "name": "LATAM Airlines",
    "risk_tier": 1
  },
  "route": {
    "origin": "SCL",
    "destination": "MIA",
    "departure": "2026-02-10T08:00:00Z"
  },
  "ticket_value": {
    "amount": 12500.00,
    "currency": "USD"
  },
  "passenger_count": 2,
  "collection_status": "PENDING"
}
```

---

## 5. On-Chain Integration

### Smart Contract Events (Amadeus L1):

```solidity
// Events that bridge Amadeus data to on-chain
event AmadeusProofVerified(
    bytes32 indexed proofHash,
    address indexed agency,
    uint256 collateralValue,
    uint256 timestamp
);

event LiquidityInjected(
    address indexed agency,
    uint256 amount,
    uint256 interestRate,
    uint256 repaymentDeadline
);

event CollateralUpdated(
    address indexed agency,
    uint256 previousValue,
    uint256 newValue,
    string reason  // "FLIGHT_CANCELLED", "NEW_BOOKING", etc.
);
```

---

## 6. Technical Architecture Summary

```
┌─────────────────────────────────────────────────────────────────┐
│                         AMADEUS GDS                             │
│  (PNR Data, BSP Schedule, Flight Status, Agency Profile)       │
└──────────────────────────────┬──────────────────────────────────┘
                               │ REST API / WebSocket
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      ORACLE NODE LAYER                          │
│  • Data validation & sanitization                               │
│  • Rate limiting & caching                                      │
│  • Format conversion (JSON → WASM input)                        │
└──────────────────────────────┬──────────────────────────────────┘
                               │ WASM Payload
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    NOVA AGENT RUNTIME                           │
│  • Risk evaluation logic (WASM)                                 │
│  • State proof generation                                       │
│  • Decision audit trail                                         │
└──────────────────────────────┬──────────────────────────────────┘
                               │ State Proof + Decision
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                     AMADEUS L1 BLOCKCHAIN                       │
│  • LiquidityVault smart contract                                │
│  • USDC liquidity pool                                          │
│  • Proof verification (zk-Verify)                               │
└──────────────────────────────┬──────────────────────────────────┘
                               │ USDC Transfer
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      AGENCY WALLET                              │
│  • Receives instant liquidity                                   │
│  • Repays on BSP collection                                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 7. Why This Matters for Amadeus

1. **New Revenue Stream**: Transaction fees on liquidity injections
2. **Data Monetization**: Amadeus data becomes collateral for DeFi
3. **Agency Retention**: Agencies that don't die become long-term customers
4. **Network Effect**: More agencies → More liquidity providers → Better rates

---

*Amadeus Liquidity Agent | Technical Integration Document | v1.0*
