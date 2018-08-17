pragma solidity ^0.4.19;

contract Jobs {
  string[] jobs;
  uint numberOfJobs;

  function addJob(string hash) public {
    jobs.push(hash);
    numberOfJobs = numberOfJobs + 1;
  }

  function getJob(uint index) public view returns (string) {
    return jobs[index];
  }
}