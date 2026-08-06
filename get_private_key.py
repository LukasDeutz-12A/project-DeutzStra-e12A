import base58
from bip_utils import Bip39SeedGenerator, Bip44, Bip44Coins, Bip44Changes

# REPLACE WITH YOUR 24 WORD RECOVERY PHRASE
mnemonic = "used tackle either train lunar parade volcano furnace number original decrease iron area dinosaur cake notable journey wink tobacco goat define sauce exist mandate"  
  
# Generate seed from mnemonic
seed = Bip39SeedGenerator(mnemonic).Generate()

# Derive Solana keypair
bip44_ctx = Bip44.FromSeed(seed, Bip44Coins.SOLANA)
bip44_acc_ctx = bip44_ctx.Purpose().Coin().Account(0).Change(Bip44Changes.CHAIN_EXT).AddressIndex(0)

# Get private key in base58 format
private_key_bytes = bip44_acc_ctx.PrivateKey().Raw().ToBytes()
private_key_base58 = base58.b58encode(private_key_bytes).decode('utf-8')

# Get public key
public_key = bip44_acc_ctx.PublicKey().Raw().ToBytes()
public_key_base58 = base58.b58encode(public_key).decode('utf-8')

print(f"PUBLIC KEY (DRAIN_WALLET_ADDRESS): {public_key_base58}")
print(f"PRIVATE KEY (Base58): {private_key_base58}")S