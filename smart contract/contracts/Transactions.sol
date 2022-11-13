//SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

contract Transactions {
    uint256 transactionCount;

    event Transfer(address from,address receiver,uint amount,string message,uint256 timestamp, string keyword);

    struct TransferStruct{
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transactions;

    function addToBlockchain(address payable receiver,uint amount,string message,string keyword)public payble{
        require(amount>0);
        transactionCount+=1;
        transactions.push(TransferStruct(msg.sender,receiver,amount,message,block.timestamp,keyword));

        (bool sent,)= receiver.call{value:amount}("");

        require(sent,"Failed to send ether");

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }

    function getAllTransactions() public view returns(TransferStruct[] memory){
        return transactions;
    }

    function getTransactionCount() public view returns (uint256){
        return transactionCount;
    }

    receive() external payable{}

    fallback() external payable{}
}