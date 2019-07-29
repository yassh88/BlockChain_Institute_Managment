pragma solidity ^0.5.0;

contract SuperAdmin{
  string userName = "MyInstitute";
  string password = "123@abc";

  event LoginResponse(bool isLoggedIn);

  function login(string memory _userName, string memory _password) public{
    require(bytes(_userName).length > 0, "userName should not be empty");
    require(bytes(_password).length > 0, "password should not be empty");
    if(keccak256(abi.encodePacked(_userName)) == keccak256(abi.encodePacked(userName))
     && keccak256(abi.encodePacked(_password)) == keccak256(abi.encodePacked(password))){
       emit LoginResponse(true);
     } else {
       emit LoginResponse(false);
     }

  }
}