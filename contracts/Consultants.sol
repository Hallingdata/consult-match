pragma solidity ^0.4.19;

contract Consultants {
  string[] consultants;
  uint public numberOfConsultants;
  mapping (uint => address) public consultantToOwner;
  mapping (address => uint[]) public ownerToConsultants;

  function addConsultant(string _hash) public {
    uint id = consultants.push(_hash) - 1;
    ownerToConsultants[msg.sender].push(id);
    consultantToOwner[id] = msg.sender;
    numberOfConsultants = numberOfConsultants + 1;
  }

  // Returns the consultant hash and the address of the owner
  function getConsultant(uint _index) public view returns (string, address) {
    return (consultants[_index], consultantToOwner[_index]);
  }


  // This removes the conultant hash
  function removeConsultant(uint _index) public {
    require(consultantToOwner[_index] == msg.sender);
    consultants[_index] = "";
  }
}
