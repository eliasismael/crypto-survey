import React from "react";
import ReactDOM from "react-dom/client";

import App from "./application/App.tsx";

// Contexts
import { WalletConnectionProvider } from "./infrastructure/contexts/wallet/walletConnectionContext.tsx";
import { ContractContextProvider } from "./infrastructure/contexts/contract/contractContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <WalletConnectionProvider>
            <ContractContextProvider>
                <App />
            </ContractContextProvider>
        </WalletConnectionProvider>
    </React.StrictMode>
);
