export interface Key {
  readonly name: string;
  readonly algo: string;
  readonly pubKey: Uint8Array;
  readonly address: Uint8Array;
  readonly bech32Address: string;
  readonly ethereumHexAddress: string;
  readonly isNanoLedger: boolean;
  readonly isKeystone: boolean;
}

export interface StdSignature {
  readonly pub_key: { type: string; value: string };
  readonly signature: string;
}

export interface Keplr {
  getKey(chainId: string): Promise<Key>;
  signArbitrary(
    chainId: string,
    signer: string,
    data: string | Uint8Array
  ): Promise<StdSignature>;
}
