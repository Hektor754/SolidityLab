// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Inspirational_Quotes {

    struct Note {
        string text;
        address author;
    }

    mapping(address => Note) public notes;
    address[] public quoters;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Not owner");
        _;
    }

    function postNote(string memory _text) public {
        // Only add to quoters if it's their first note
        if (bytes(notes[msg.sender].text).length == 0) {
            quoters.push(msg.sender);
        }
        notes[msg.sender] = Note(_text, msg.sender);
    }

    function getNote() public view returns (string memory) {
        return notes[msg.sender].text;
    }

    function deleteNote() public {
        require(msg.sender == notes[msg.sender].author, "Not your note");
        delete notes[msg.sender];
    }

    // Optional: only the contract owner can see how many people posted
    function getTotalQuoters() public view onlyOwner returns (uint) {
        return quoters.length;
    }
}