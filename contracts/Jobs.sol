pragma solidity ^0.4.19;

contract Jobs {
  uint public numberOfJobs;

  // we use mappings instead of arrays because we keep track of the length
  // ourselfes in numberOfJobs
  mapping (uint => string) public jobs;
  mapping (address => uint[]) public ownerToJobs;
  mapping (uint => address) public jobToOwner;
  mapping (uint => bool) public isJobDone;

  function addJob(string _hash) public {
    // the current number of jobs is the identifier (index) for this job

    // add the hash to the jobs mapping
    jobs[numberOfJobs] = _hash;

    // add the id to the senders ownerToJob mapping
    ownerToJobs[msg.sender].push(numberOfJobs);

    // save the jobs sender
    jobToOwner[numberOfJobs] = msg.sender;

    // increase the number of jobs
    numberOfJobs = numberOfJobs + 1;
  }

  // returns the job hash, a bool indicating if the job is active or not and
  // the address that owns/published the job
  function getJob(uint _index) public view returns (string, bool, address) {
    return (jobs[_index], isJobDone[_index], jobToOwner[_index]);
  }

  // returns the id of all jobs owned by this address
  function getJobsOwnedByAddresses(address _address) public view returns (uint[]) {
    return ownerToJobs[_address];
  }

  function markJobComplete(uint _index) public {
    require(jobToOwner[_index] == msg.sender, "the caller is not the owner of the contract");
    isJobDone[_index] = true;
  }
}
