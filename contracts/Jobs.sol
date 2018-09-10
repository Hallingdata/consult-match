pragma solidity ^0.4.19;

contract Jobs {
  string[] jobs;
  uint public numberOfJobs;
  // mapping between users and array of there publiched jobs
  mapping (address => uint[]) public userToJobs;

  function addJob(string _hash) public {
    uint id = jobs.push(_hash) + 1;
    userToJobs[msg.sender].push(id);
    numberOfJobs = numberOfJobs + 1;
  }

  function getJob(uint _index) public view returns (string) {
    return jobs[_index];
  }

}