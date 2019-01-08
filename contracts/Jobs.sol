pragma solidity ^0.4.25;

contract Jobs {
  uint public numberOfJobs;

  // we use mappings instead of arrays because we keep track of the length
  // ourselves in numberOfJobs
  mapping (uint => string) public jobs;
  mapping (address => uint[]) public ownerToJobs;
  mapping (uint => address) public jobToOwner;
  mapping (uint => bool) public isJobDone;

  function addJob(string memory _hash) public {
    // the current number of jobs is the identifier (index) for this job

    // save the hash to the jobs mapping
    jobs[numberOfJobs] = _hash;

    // add the id to the sender's ownerToJobs mapping (the array of jobs posted by the sender)
    ownerToJobs[msg.sender].push(numberOfJobs);

    // save the job's sender
    jobToOwner[numberOfJobs] = msg.sender;

    // increase the number of jobs
    numberOfJobs = numberOfJobs + 1;
  }

  // returns the job hash, a bool indicating if the job is active or not and
  // the address that owns/published the job
  function getJob(uint _index) public view returns (string memory, bool, address) {
    return (jobs[_index], isJobDone[_index], jobToOwner[_index]);
  }

  // returns the id of all jobs owned by this address
  function getJobsOwnedByAddresses(address _address) public view returns (uint[] memory) {
    return ownerToJobs[_address];
  }

  function markJobComplete(uint _index) public {
    require(jobToOwner[_index] == msg.sender, "the caller is not the owner of the contract");
    isJobDone[_index] = true;
  }
}
