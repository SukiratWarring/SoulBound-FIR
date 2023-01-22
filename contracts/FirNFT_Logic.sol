//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./CertiNFT.sol";

contract FirNFT_Logic is CertiNFT {
    using Counters for Counters.Counter;
    Counters.Counter public totalComplaints;
    // Counters.Counter public tokenIDs;
    struct Complaint {
        uint256 _complaintNumber;
        address _Officer; //cause every officer has a wallet address
        string _by;
        string _for;
        string _description;
        uint256 _issuedDate;
        bool _status;
    }
    //mapping a complaint
    mapping(uint256 => Complaint) public complaintNumberToComplaint;

    //creating a complaint
    function createComplaint(
        string calldata _by,
        string calldata _for,
        string calldata _description
    ) public {
        //creating a complaint
        complaintNumberToComplaint[totalComplaints.current()] = Complaint(
            totalComplaints.current(),
            msg.sender,
            _by,
            _for,
            _description,
            block.timestamp,
            false
        );
        totalComplaints.increment();
    }

    //Change the status of the complaint
    function complaintResolved(uint256 _numberOfTheComplaint) private {
        require(
            msg.sender ==
                complaintNumberToComplaint[_numberOfTheComplaint]._Officer,
            "Only the officer who has issued the FIR can change the Status of the complaint"
        );
        complaintNumberToComplaint[_numberOfTheComplaint]._status = true;
    }

    //Get the status of the complaint
    function statusOfMyComplaint(uint256 _numberOfTheComplaint)
        public
        view
        returns (bool)
    {
        return complaintNumberToComplaint[_numberOfTheComplaint]._status;
    }
}
