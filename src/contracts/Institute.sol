pragma solidity ^0.5.0;

contract Institute{
   struct InstituteDetails {
        uint id;
        string name;
        uint studentCount;
    }


    mapping(uint => InstituteDetails) public Institutes;

    event instituteCreatedEvent (
        uint indexed instituteCount
    );
     // Store Candidates Count
    uint public instituteCount;

  function addInstitute (string memory _name) public {
        instituteCount ++;
        Institutes[instituteCount] = InstituteDetails(instituteCount, _name, 0);
        emit instituteCreatedEvent(instituteCount);
    }
}