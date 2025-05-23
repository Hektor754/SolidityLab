// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract TodoList {

    struct Task {
        string description;
        bool completed;
    }

    mapping(address => Task[]) private userTasks;

    function addTask(string memory _description) public {
        userTasks[msg.sender].push(Task(_description, false));
    }

    function removeTask(uint _index) public {
        require(_index < userTasks[msg.sender].length, "Invalid index");

        Task[] storage tasks = userTasks[msg.sender];
        tasks[_index] = tasks[tasks.length - 1];
        tasks.pop();
    }

    function markTaskDone(uint _index) public {
        require(_index < userTasks[msg.sender].length, "Invalid index");
        userTasks[msg.sender][_index].completed = true;
    }

    function getMyTasks() public view returns (Task[] memory) {
        return userTasks[msg.sender];
    }
}
