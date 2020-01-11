pragma solidity ^0.5.0;
import "./SuperAdmin.sol";
import "./Subject.sol";

contract Course{
   address payable public admin;
   SuperAdmin superAdmin;

   struct CourseDetails {
        uint id;
        string name;
        Subject[]  subjects;
    }
    
    uint public CourseCount;

    CourseDetails[] CourseDetailsArray;

    mapping(uint => CourseDetails) public CoursesMap;

    constructor(SuperAdmin _superAdmin) public{
        superAdmin = _superAdmin;
        admin =  msg.sender;
    }

    event CourseCreatedEvent (
        uint  id
    );


    function getCoursesList(uint id) view public returns (uint, string memory) {
        require(msg.sender == admin);
        return (CoursesMap[id].id, CoursesMap[id].name);
    }

    function addCourseByAdmin (string memory _name) public {
        require(bytes(_name).length > 0);
        require(msg.sender == admin);
        addCourse(_name);
        emit CourseCreatedEvent(CourseCount);
    }

    function addCourse (string memory _name) private {
        CourseCount ++;
        CourseDetails memory CourseDetailsObj = CourseDetails(CourseCount, _name);
        CoursesMap[CourseCount] = CourseDetailsObj;
        CourseDetailsArray.push(CourseDetailsObj);
    }

}