pragma solidity ^0.4.19;

contract Jobs {
  string[] jobs;
  uint public numberOfJobs;
  mapping (address => uint[]) public ownerToJobs;
  mapping (uint => address) public jobToOwner;
  mapping (uint => bool) public isJobDone;

  function addJob(string _hash) public {
    uint id = jobs.push(_hash) - 1;
    ownerToJobs[msg.sender].push(id);
    jobToOwner[id] = msg.sender;
    numberOfJobs = numberOfJobs + 1;
  }

  // returns the job hash, a bool indicating if the job is active or not and the address that owns/published the job
  function getJob(uint _index) public view returns (string, bool, address) {
    return (jobs[_index], isJobDone[_index], jobToOwner[_index]);
  }

  function markJobComplete(uint _index) public {
    require(jobToOwner[_index] == msg.sender);
    isJobDone[_index] = true;
  }
}
