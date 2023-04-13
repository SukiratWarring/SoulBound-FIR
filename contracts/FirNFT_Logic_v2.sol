//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./CertiNFT.sol";

contract FirNFT_Logic is CertiNFT {
    using Counters for Counters.Counter;
    Counters.Counter public totalComplaints;
    struct Complaint {
        uint256 _complaintNumber;
        address _Officer; //cause every officer has a wallet address
        string _by;
        string suspect;
        string _description;
        uint256 _issuedDate;
        bool _status;
        string imageHash;
    }
    //mapping a complaint
    mapping(uint256 => Complaint[]) public complaintNumberToComplaint;
    mapping(address => bool) public complaintMade;
    //address to its Complaint's index
    mapping(address => uint) public indexOfAddress;

    event reached(address _msgsender, uint from);

    //creating a complaint
    function createComplaint(
        string calldata _by,
        string calldata _for,
        string calldata _description,
        string calldata _imageHash
    ) public {
        if (complaintMade[msg.sender] == true) {
            emit reached(msg.sender, indexOfAddress[msg.sender]);
            uint len = complaintNumberToComplaint[indexOfAddress[msg.sender]]
                .length;
            complaintNumberToComplaint[indexOfAddress[msg.sender]].push(
                Complaint(
                    len,
                    msg.sender,
                    _by,
                    _for,
                    _description,
                    block.timestamp,
                    false,
                    _imageHash
                )
            );
            emit reached(msg.sender, 0);
        } else {
            //creating a complaint
            complaintNumberToComplaint[totalComplaints.current()].push(
                Complaint(
                    totalComplaints.current(),
                    msg.sender,
                    _by,
                    _for,
                    _description,
                    block.timestamp,
                    false,
                    _imageHash
                )
            );
            complaintMade[msg.sender] = true;
            indexOfAddress[msg.sender] = totalComplaints.current();
            totalComplaints.increment();
        }
    }

    function getLengthOfAddress(address _address) public view returns (uint) {
        require(complaintMade[msg.sender], "No Fir is regestered with address");
        return complaintNumberToComplaint[indexOfAddress[_address]].length;
    }

    function complaintResolved(uint256 _numberOfTheComplaint) public {
        require(complaintMade[msg.sender], "No Fir is regestered with address");
        complaintNumberToComplaint[indexOfAddress[msg.sender]][
            _numberOfTheComplaint
        ]._status = true;
    }

    function statusOfMyComplaint(
        uint256 _numberOfTheComplaint
    ) public view returns (bool) {
        return
            complaintNumberToComplaint[indexOfAddress[msg.sender]][
                _numberOfTheComplaint
            ]._status;
    }

    function allComplaintNumber(
        address _address
    ) public view returns (uint[] memory) {
        uint lengthOfComplaints = getLengthOfAddress(_address);
        uint[] memory arr = new uint[](lengthOfComplaints);
        for (uint i = 0; i < lengthOfComplaints; i++) {
            uint helper = complaintNumberToComplaint[
                indexOfAddress[msg.sender]
            ][i]._complaintNumber;
            arr[i] = helper;
        }
        return arr;
    }
}
