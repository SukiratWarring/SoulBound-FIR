class MyObject {
  constructor(key1, key2) {
    this.key1 = key1;
    this.key2 = key2;
  }
}
const obj_1 = {
  Name: "Charizard",
  description: "Crypto Art",
  image: "https://ipfs.io/ipfs/QmT7BTX9KurTacAHsngK5dBDJwsPH95E5G1c32ELqQPwuS",
  attributes: [
    {
      trait_type: "Power",
      value: 100,
    },
    {
      trait_type: "Attack",
      value: "Fire",
    },
    {
      trait_type: "Type_Of_Attack",
      value: "Air",
    },
  ],
};
let obj = new MyObject(1, 2);
console.log("obj", obj_1);
