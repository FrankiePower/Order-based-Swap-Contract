// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Web3Bridge is ERC20("Web3Bridge Token","W3B"){
    address public owner;

    constructor(){
        owner = msg.sender;
        _mint(msg.sender, 300000e18);
    }

    function mint(uint _amount) external {
        require(msg.sender == owner, "You are not the owner!");
        _mint(msg.sender,_amount * 1e18);
    }
}