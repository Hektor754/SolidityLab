// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Counter {
    uint public number = 0;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyowner() {
        require(owner == msg.sender, "Not owner");
        _;
    }
    
    function decreasenum() public returns (uint) {
        if (number >= 1) {
            number -= 1;
        }
        return number;
    }

    function increasenum() public returns (uint) {
        number += 1;
        return number;
    }

    function seenumber() public view onlyowner() returns (uint){
        return number;
    }
}