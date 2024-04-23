import {
  useConnection,
  useWallet,
  useAnchorWallet,
} from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";
import { FC, useEffect, useState } from "react";
import idl from "../idl.json";
import { Button } from "@chakra-ui/react";

const PROGRAM_ID = new anchor.web3.PublicKey(
  `CFbwgQJsumwDXmXXDcdE8LiR7TUb7Jay9Q2j6rDvdvPU`
);

export interface Props {
  setCounter;
  setTransactionUrl;
}

export const Initialize: FC<Props> = ({ setCounter, setTransactionUrl }) => {
  const [program, setProgram] = useState<anchor.Program>();

  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  useEffect(() => {
    let provider: anchor.Provider;

    try {
      provider = anchor.getProvider();
    } catch {
      provider = new anchor.AnchorProvider(connection, wallet, {});
      anchor.setProvider(provider);
    }

    const program = new anchor.Program(idl as anchor.Idl, PROGRAM_ID);
    setProgram(program);
  }, []);

  const onClick = async () => {
    const newAccount = anchor.web3.Keypair.generate();

    const sig = await program.methods
      .initialize()
      .accounts({
        signer: wallet.publicKey,
      })
      .rpc();

    // setTransactionUrl(`https://explorer.solana.com/tx/${sig}?cluster=devnet`)
    // setCounter(newAccount.publicKey)
  };

  const checkIn = async () => {
    const newAccount = anchor.web3.Keypair.generate();

    const sig = await program.methods
      .checkIn()
      .accounts({
        signer: wallet.publicKey,
      })
      .rpc();
  };

  const draw = async () => {
    const newAccount = anchor.web3.Keypair.generate();

    const sig = await program.methods
      .draw()
      .accounts({
        signer: wallet.publicKey,
      })
      .rpc();
  };

  const claimMushroom = async () => {
    const newAccount = anchor.web3.Keypair.generate();

    const sig = await program.methods
      .claimMushroom()
      .accounts({
        signer: wallet.publicKey,
      })
      .rpc();
  };

  return (
    <div>
      <p>
        <Button onClick={onClick}>Activate</Button>
      </p>
      <p>
        <Button onClick={checkIn}>CheckIn</Button>
      </p>
      <p>
        <Button onClick={draw}>Draw</Button>
      </p>
      <p>
        <Button onClick={claimMushroom}>ClaimMushroom</Button>
      </p>
    </div>
  );
};
