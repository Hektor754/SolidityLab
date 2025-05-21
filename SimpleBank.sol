// SPDX-License-Identifier: MIT

pragma solidity ^0.8.28;

contract SimpleBank {

    address public owner;
    mapping(address => uint) public balances;
    address[] public users;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    function deposit() public payable {
        require(msg.value > 0, "Must deposit more than 0");

        if (balances[msg.sender] == 0) {
            users.push(msg.sender);
        }

        balances[msg.sender] += msg.value;

    }

    function getBalance() public view returns (uint) {
        return balances[msg.sender];
    }

    function withdraw(uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient funds");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    function GetAllBalances() public view onlyOwner returns (address[] memory, uint[] memory) {
        uint[] memory allBalances = new uint[](users.length);
        for (uint i = 0; i < users.length; i++) {
            allBalances[i] = balances[users[i]];
        }
        return (users, allBalances);
    }

}
