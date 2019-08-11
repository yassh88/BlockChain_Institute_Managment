pragma solidity ^0.5.0;
import "./SuperAdmin.sol";

contract Institute{
   address public admin;
   uint public accountPrice;
   SuperAdmin superAdmin;

   struct InstituteDetails {
        uint id;
        string name;
        uint studentCount;
        string username;
        string password;
    }
     // Store Candidates Count
    uint public instituteCount;


    mapping(address => InstituteDetails) public Institutes;

    constructor(SuperAdmin _superAdmin, uint256 _Price) public{
        superAdmin = _superAdmin;
        accountPrice = _Price;
        admin =  msg.sender;
    }

    event instituteCreatedEvent (
        uint  id
    );

    function addInstitute (string memory _name, string memory _username, string memory _password) public {
        instituteCount ++;
        Institutes[msg.sender] = InstituteDetails(instituteCount, _name, 0, _username, _password);
        emit instituteCreatedEvent(instituteCount);
    }
}