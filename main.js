const SHA256 = require('crypto-js/sha256');

class Block {
   constructor(index, timestamp, data, previousHash = '') {
      this.index = index;
      this.timestamp = timestamp;
      this.data = data;
      this.previousHash = previousHash;
      this.hash = this.calculateHash;
   }

   calculateHash() {
      return SHA256(
         this.index +
            this.previousHash +
            this.timestamp +
            JSON.stringify(this.data)
      ).toString();
   }
}

class Blockchain {
   constructor() {
      this.chain = [this.craeateBlock()];
   }

   craeateBlock() {
      return new Block(0, 17 / 3 / 2020, 'MY bLOCK', '0');
   }

   getLatestBlock() {
      return this.chain[this.chain.length - 1];
   }

   addBlock(newBlock) {
      newBlock.previousHash = this.getLatestBlock().hash;
      newBlock.hash = newBlock.calculateHash();
      this.chain.push(newBlock);
   }
}

let coin = new Blockchain();
coin.addBlock(new Block(1, '17/3/20', { amount: 4 }));
coin.addBlock(new Block(2, '17/3/20', { amount: 4 }));

console.log(JSON.stringify(coin, null, 6));
