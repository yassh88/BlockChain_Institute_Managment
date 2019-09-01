pragma solidity ^0.5.0;

contract SuperAdmin{
  address public admin;
  string userName = "MyInstitute";
  string password = "123@abc";

  event LoginResponse(bool isLoggedIn);
  
  constructor() public{
        admin =  msg.sender;
    }


  function login() public{
    if(msg.sender == admin){
       emit LoginResponse(true);
     } else {
       emit LoginResponse(false);
     }

  }
}