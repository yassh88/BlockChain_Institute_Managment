pragma solidity ^0.5.0;
import "./SuperAdmin.sol";

contract Student{
   address payable public admin;
   SuperAdmin superAdmin;

   struct StudentDetails {
        uint id;
        string name;
        uint studentCount;
    }
     // Store Candidates Count
    uint public StudentCount;


    mapping(address => StudentDetails) public Students;
    address[] public StudentsAccounts;

    constructor(SuperAdmin _superAdmin) public{
        superAdmin = _superAdmin;
        admin =  msg.sender;
    }

    event StudentCreatedEvent (
        uint  id
    );

    function getStudentsAccounts() view public returns(address[] memory) {
        require(msg.sender == admin);
        return StudentsAccounts;
    }

    function getStudents(address _address) view public returns (uint, string memory , uint) {
        require(msg.sender == admin);
        return (Students[_address].id, Students[_address].name, Students[_address].studentCount);
    }

    function addStudent (string memory _name) public payable {
        require(bytes(_name).length > 0);
        require(msg.sender != admin);
        StudentCount ++;
        Students[msg.sender] = StudentDetails(StudentCount, _name, 0);
        StudentsAccounts.push(msg.sender);
        address(admin).transfer(msg.value);
        emit StudentCreatedEvent(StudentCount);
    }
}