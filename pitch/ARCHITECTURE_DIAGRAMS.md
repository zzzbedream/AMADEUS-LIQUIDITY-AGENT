# Amadeus Liquidity Agent - Architecture Diagram

## Main Flow Diagram (Copy to Mermaid Live Editor)

```mermaid
graph TD
    subgraph "Off-Chain World (Travel Data)"
        A[Amadeus GDS API] -->|Real-time Booking Data| B(Oracle Node)
        B -->|JSON Payload: PNR + Ticket Value| C{Nova Agent Node}
    end

    subgraph "Amadeus Network (The Brain)"
        C -->|1. Risk Evaluation Logic| C
        C -->|2. Generate State Proof| D[uPoW Verification]
        D -->|3. Submit Proof| E[Amadeus L1 Core]
    end

    subgraph "On-Chain DeFi (Liquidity)"
        E -->|Valid Proof Event| F[Smart Contract: LiquidityVault]
        F -->|Trigger| G[Flash Loan Execution]
        G -->|USDC Transfer| H[Agency Wallet]
    end

    style C fill:#f9f,stroke:#333,stroke-width:4px
    style F fill:#bbf,stroke:#333,stroke-width:2px
```

---

## Sequence Diagram (Agent Decision Flow)

```mermaid
sequenceDiagram
    participant Agency as Travel Agency
    participant GDS as Amadeus GDS
    participant Agent as Nova Agent
    participant Oracle as Amadeus Oracle
    participant Vault as LiquidityVault
    participant Wallet as Agency Wallet

    Agency->>GDS: Daily booking activity
    GDS->>Agent: PNR data stream (JSON)
    
    Note over Agent: Evaluate Liquidity Gap
    Agent->>Agent: cash_gap = BSP_debt - cash_balance
    Agent->>Agent: collateral = sum(future_bookings)
    Agent->>Agent: risk_score = avg(airline_risk)
    
    alt Collateral >= 120% AND Risk < 50%
        Agent->>Oracle: Generate State Proof
        Oracle->>Vault: Submit proof + loan request
        Vault->>Vault: Verify proof (zk-Verify)
        Vault->>Wallet: Transfer USDC
        Wallet-->>Agency: ✅ Loan Received
    else Insufficient collateral
        Agent-->>Agency: ❌ Loan Denied
    end
```

---

## Component Architecture

```mermaid
graph LR
    subgraph "Data Layer"
        A1[Amadeus API] --> A2[PNR Data]
        A1 --> A3[BSP Schedule]
        A1 --> A4[Flight Status]
    end
    
    subgraph "Agent Layer (Nova Runtime)"
        B1[Risk Engine] --> B2[WASM Module]
        B2 --> B3[State Proof Generator]
    end
    
    subgraph "Blockchain Layer"
        C1[Amadeus L1] --> C2[LiquidityVault]
        C2 --> C3[USDC Pool]
    end
    
    subgraph "User Layer"
        D1[Agency Dashboard] --> D2[Mobile Notifications]
    end
    
    A2 --> B1
    A3 --> B1
    A4 --> B1
    B3 --> C1
    C3 --> D1
```

---

## Risk Evaluation Model

```mermaid
graph TD
    subgraph "Input Data"
        I1[PNR Count] --> R[Risk Engine]
        I2[Total Ticket Value] --> R
        I3[Airline Mix] --> R
        I4[Days to BSP Due] --> R
        I5[Payment History] --> R
    end
    
    subgraph "Risk Calculation"
        R --> R1{Collateral Ratio}
        R --> R2{Portfolio Risk}
        R --> R3{Urgency Score}
        
        R1 -->|>= 1.20x| OK1[✅ Pass]
        R1 -->|< 1.20x| FAIL1[❌ Fail]
        
        R2 -->|< 0.50| OK2[✅ Pass]
        R2 -->|>= 0.50| FAIL2[❌ Fail]
    end
    
    subgraph "Decision"
        OK1 --> D{AND Gate}
        OK2 --> D
        D -->|All Pass| APPROVE[🟢 APPROVE LOAN]
        FAIL1 --> DENY[🔴 DENY LOAN]
        FAIL2 --> DENY
    end
    
    style APPROVE fill:#10b981,color:#fff
    style DENY fill:#ef4444,color:#fff
```

---

## Instructions

1. Go to [Mermaid Live Editor](https://mermaid.live/)
2. Copy any diagram code block above
3. Paste and export as PNG/SVG
4. Insert into your Pitch Deck (Google Slides/PowerPoint)

### Recommended Export Settings:
- Background: Transparent or #0f172a (dark)
- Scale: 2x for high resolution
- Format: SVG for scalability
