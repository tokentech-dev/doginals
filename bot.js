#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();
const fs = require('fs');

program
  .version('1.0.0')
  .description(('A command-line tool with multiple commands and options.'));


/* ------------- ------------- ----------- ----------- ----------- 
                              Check setup
 ------------- ------------- ----------- ----------- ----------- */
program.command('check-setup')
  .description('Verify that there is a .env')
  .action(_ => {
    let file = fs.readFileSync('.env', 'utf-8');
    if (file.includes('NODE_RPC_URL=') && file.includes('NODE_RPC_USER') && file.includes('NODE_RPC_PASS')) {
      console.log("You seem good to go");
    } else {
      console.log(`Some fields are missing.
      Required fields are : 
      - NODE_RPC_URL // url of the RPC you want to use
      - NODE_RPC_USER 
      - NODE_RPC_PASS`)
    }
    console.log({ file })
  })

/* ------------- ------------- ----------- ----------- ----------- 
                              Bot commands
 ------------- ------------- ----------- ----------- ----------- */

/*------------- Generate wallets -----------*/
program.command('generate [amount]')
  .description('Create new wallet(s)')
  .action(amount => {
    if (amount) {
      console.log("Amount provided is " + parseInt(amount))
    } else {
      console.log("No amount provided")
    }
  })

/*------------- Sync wallet -----------*/
program.command('sync [wallet]')
  .description('Sync your wallet to the blockchain')
  .action(wallet => {

  })

/*------------- Split utxos -----------*/
program.command('split [count]')
  .description('Split your UTXOs')
  .action(_ => { })

/*------------- Mint -----------*/
program.command('mint [address] [token]')
  .description(`Mint from all wallets to target address.
Address to receive result of mint, token is the ticker of the drc20`)
  .action(_ => { })

/*-------------  -----------*/
program.parse(process.argv);