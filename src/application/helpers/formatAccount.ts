export const formatAccount = (account: string): string => {
    const firstDigits = account.slice(0, 4);
    const lastDigits = account.slice(-4);

    return account ? `${firstDigits}...${lastDigits}` : "";
};
