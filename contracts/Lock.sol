// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OrderBasedSwap {
    enum ReturnToken {
        W3B,
        USDC,
        SPT,
        SHIB,
        USDT
    }

    // Mapping of token addresses to their balances
    mapping(address => mapping(address => uint256)) public tokenBalances;

    // Mapping of token addresses to their orders
    mapping(address => mapping(address => uint256)) public tokenOrders;

    // Event emitted when a token is deposited
    event Deposit(address indexed tokenAddress, uint256 amount, ReturnToken returnToken);

    /**
     * @dev Deposit tokens into the contract
     * @param _tokenAddress The address of the token to deposit
     * @param _amount The amount of tokens to deposit
     * @param returnToken The return token selected from the enum
     */
    function depositToken(IERC20 _tokenAddress, uint256 _amount, ReturnToken returnToken) external {
        // Transfer tokens from the user to the contract
        require(_tokenAddress.transferFrom(msg.sender, address(this), _amount), "Transfer failed");

        // Update the token balance
        tokenBalances[address(_tokenAddress)][msg.sender] += _amount;

        // Map returnToken to its address (you need to define this mapping)
        address returnTokenAddress = getTokenAddress(returnToken);
        tokenOrders[address(_tokenAddress)][returnTokenAddress] += _amount;

        emit Deposit(address(_tokenAddress), _amount, returnToken);
    }

    // Example function to map ReturnToken to actual token addresses
    function getTokenAddress(ReturnToken token) internal view returns (address) {
        // Implement the mapping logic here
        // For example:
      //  if (token == ReturnToken.W3B) return /* W3B token address */;
       // if (token == ReturnToken.USDC) return /* USDC token address */;
    //    if (token == ReturnToken.SPT) return /* SPT token address */;
        //if (token == ReturnToken.SHIB) return /* SHIB token address */;
      //  if (token == ReturnToken.USDT) return /* USDT token address */;

      //  revert("Invalid token");
    }
}
