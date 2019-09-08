pragma solidity ^0.5.0;
import "./SuperAdmin.sol";

contract Subject{
   address payable public admin;
   SuperAdmin superAdmin;

   struct SubjectDetails {
        uint id;
        string name;
    }
    
    uint public subjectCount;

    SubjectDetails[] SubjectDetailsArray;

    mapping(uint => SubjectDetails) public SubjectsMap;

    constructor(SuperAdmin _superAdmin) public{
        superAdmin = _superAdmin;
        admin =  msg.sender;
        addSubject('Hindi');
        addSubject('English');
        addSubject('Methametics');
        addSubject('Science');
        addSubject('Science');
        addSubject('Physics');
        addSubject('Chamestry');
    }

    event SubjectCreatedEvent (
        uint  id
    );


    function getSubjectsList(uint id) view public returns (uint, string memory) {
        require(msg.sender == admin);
        return (SubjectsMap[id].id, SubjectsMap[id].name);
    }

    function addSubjectByAdmin (string memory _name) public {
        require(bytes(_name).length > 0);
        require(msg.sender == admin);
        addSubject(_name);
        emit SubjectCreatedEvent(subjectCount);
    }

    function addSubject (string memory _name) private {
        subjectCount ++;
        SubjectDetails memory subjectDetailsObj = SubjectDetails(subjectCount, _name);
        SubjectsMap[subjectCount] = subjectDetailsObj;
        SubjectDetailsArray.push(subjectDetailsObj);
    }

}