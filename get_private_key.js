const { Keypair } = require('@solana/web3.js');
const bip39 = require('bip39');
const { derivePath } = require('ed25519-hd-key');
const bs58 = require('bs58');

// REPLACE WITH YOUR 24 WORD RECOVERY PHRASE
const mnemonic = "used tackle either train lunar parade volcano furnace number original decrease iron area dinosaur cake notable journey wink tobacco goat define sauce exist mandate";

// Generate seed from mnemonic
const seed = bip39.mnemonicToSeedSync(mnemonic);

// Derive Solana keypair
const path = `m/44'/501'/0'/0'`;
const derivedSeed = derivePath(path, seed.toString('hex')).key;
const keypair = Keypair.fromSeed(derivedSeed);

console.log("DRAIN_WALLET_ADDRESS:", keypair.publicKey.toBase58());
console.log("PRIVATE_KEY (Base58):", bs58.default.encode(keypair.secretKey));