import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import assert from "assert";
import { Calculator } from "../target/types/calculator";

describe("calculator", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env()
  anchor.setProvider(provider);

  const program = anchor.workspace.Calculator as Program<Calculator>;
  const calc = anchor.web3.Keypair.generate();
  var _calc;
  it("Create a Calculator", async () => {
    await program.rpc.create("Welcome to Solana", {
      accounts: {
        calc: calc.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId
      },
      signers: [calc]
    })
    const account = await program.account.calc.fetch(calc.publicKey);
    assert.ok(account.greeting === "Welcome to Solana");
    _calc = calc
  });
  it("Adds two numbers", async () => {
    const calc = _calc;

    await program.rpc.add(new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calc: calc.publicKey,
      },
    });

    const account = await program.account.calc.fetch(calc.publicKey);
    assert.ok(account.result.eq(new anchor.BN(5)));
    assert.ok(account.greeting === "Welcome to Solana");

  });
  it("Subtracts two numbers", async () => {
    const calc = _calc;

    await program.rpc.subtract(new anchor.BN(3), new anchor.BN(3), {
      accounts: {
        calc: calc.publicKey,
      },
    });

    const account = await program.account.calc.fetch(calc.publicKey);
    assert.ok(account.result.eq(new anchor.BN(0)));
    assert.ok(account.greeting === "Welcome to Solana");

  });
  it("Multiplies two numbers", async () => {
    const calc = _calc;

    await program.rpc.multiply(new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calc: calc.publicKey,
      },
    });

    const account = await program.account.calc.fetch(calc.publicKey);
    assert.ok(account.result.eq(new anchor.BN(6)));
    assert.ok(account.greeting === "Welcome to Solana");

  });
  it("Divides two numbers", async () => {
    const calc = _calc;

    await program.rpc.divide(new anchor.BN(3), new anchor.BN(2), {
      accounts: {
        calc: calc.publicKey,
      },
    });

    const account = await program.account.calc.fetch(calc.publicKey);
    assert.ok(account.result.eq(new anchor.BN(1)));
    assert.ok(account.result.eq(new anchor.BN(1)));
    assert.ok(account.greeting === "Welcome to Solana");

  });
});
