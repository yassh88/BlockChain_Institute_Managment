pragma solidity ^0.5.0;
import "./SuperAdmin.sol";

contract Institute{
   address payable public admin;
   uint public accountPrice;
   SuperAdmin superAdmin;

   struct InstituteDetails {
        uint id;
        string name;
        uint studentCount;
    }
     // Store Candidates Count
    uint public instituteCount;


    mapping(address => InstituteDetails) public Institutes;
    address[] public InstitutesAccounts;

    constructor(SuperAdmin _superAdmin, uint256 _Price) public{
        superAdmin = _superAdmin;
        accountPrice = _Price;
        admin =  msg.sender;
    }

    event instituteCreatedEvent (
        uint  id
    );

    function getInstitutesAccounts() view public returns(address[] memory) {
        require(msg.sender == admin);
        return InstitutesAccounts;
    }

    function getInstitutes(address _address) view public returns (uint, string memory , uint) {
        require(msg.sender == admin);
        return (Institutes[_address].id, Institutes[_address].name, Institutes[_address].studentCount);
    }

    function addInstitute (string memory _name) public payable {
        require(msg.value == accountPrice);
        require(bytes(_name).length > 0);
        require(address(msg.sender).balance >= accountPrice);
        require(msg.sender != admin);
        instituteCount ++;
        Institutes[msg.sender] = InstituteDetails(instituteCount, _name, 0);
        InstitutesAccounts.push(msg.sender);
        address(admin).transfer(msg.value);
        emit instituteCreatedEvent(instituteCount);
    }
}