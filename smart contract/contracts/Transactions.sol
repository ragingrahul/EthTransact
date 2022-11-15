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

    function addToBlockchain(address payable receiver,string memory message,string memory keyword)public payable{
        require(msg.value>0);
        
        uint256 amount=address(this).balance;
        (bool sent,)= receiver.call{value:amount}("");

        require(sent,"Failed to send ether");

        transactionCount+=1;
        transactions.push(TransferStruct(msg.sender,receiver,amount,message,block.timestamp,keyword));
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