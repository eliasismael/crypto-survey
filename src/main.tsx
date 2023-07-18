import React from "react";
import ReactDOM from "react-dom/client";
import App from "./application/App.tsx";

import { WalletConnectionProvider } from "./infrastructure/contexts/walletConnectionContext.tsx";
import { QuizContractContextProvider } from "./infrastructure/contexts/contractContext.tsx";



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <WalletConnectionProvider>
            <QuizContractContextProvider>
                <App />
            </QuizContractContextProvider>
        </WalletConnectionProvider>
    </React.StrictMode>
);
