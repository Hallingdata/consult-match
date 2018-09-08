pragma solidity ^0.4.19;

contract Consultants {
  string[] consultants;
  uint public numberOfConsultants;

  function addConsultant(string hash) public {
    consultants.push(hash);
    numberOfConsultants = numberOfConsultants + 1;
  }

  function getConsultant(uint index) public view returns (string) {
    return consultants[index];
  }
}