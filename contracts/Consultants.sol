pragma solidity ^0.4.19;

contract Consultants {
  uint public numberOfConsultants;

  mapping (uint => string) public consultants;
  mapping (uint => address) public consultantToOwner;
  mapping (address => uint[]) public ownerToConsultants;

  function addConsultant(string memory _hash) public {
    consultants[numberOfConsultants] = _hash;
    ownerToConsultants[msg.sender].push(numberOfConsultants);
    consultantToOwner[numberOfConsultants] = msg.sender;
    numberOfConsultants = numberOfConsultants + 1;
  }

  // Returns the consultant hash and the address of the owner
  function getConsultant(uint _index) public view returns (string memory, address) {
    return (consultants[_index], consultantToOwner[_index]);
  }


  // This removes the conultant hash
  function removeConsultant(uint _index) public {
    require(consultantToOwner[_index] == msg.sender, "the caller is not the owner of the contract");
    consultants[_index] = "";
  }
}
