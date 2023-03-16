export const checkWalletIsConnected = async () => {
  const { ethereum } = window;
  if (!ethereum) {
    console.log("Make sure you have installed Metamask");
    return { status: 0, account: null };
  } else {
    console.log("Wallet exists");
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      return { status: 1, account: account };
    } else {
      console.log("No authorized account found");
      return { status: 0, account: null };
    }
  }
};
