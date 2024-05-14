// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// import "hardhat/console.sol";

contract VotingSystem {
    address public immutable chairperson;

    uint256 public voting_id = 0;

    bytes32 private hash;

    Voting[] private votings;
    Vote[] private votes;
    
    mapping (address => uint256[]) private voterVodingIds;


    constructor() {
        chairperson = msg.sender;
    }

    struct Voting {
        uint256 voting_id;
        string[] options;
        string title;
        string content;
        uint expiration_time;
    }

    struct Vote {
        uint256 voting_id;
        uint vote_option;
    }

    function getVotings () public view returns (Voting[] memory) {
        return votings;
    }

    function getVoting (uint256 _voting_id) public view returns (Voting memory) {
        return votings[_voting_id];
    }

    function addVoting (string[] memory options, string memory title, string memory content, uint expiration_time) public {
        if (msg.sender != chairperson) {
            revert("You are not chairperson");
        }

        votings.push(Voting(voting_id, options, title, content, expiration_time));
        voting_id++;
    }

    function getVotes () public view returns (Vote[] memory) {
        return votes;
    }

    function isVoterAlreadyVote (uint256 _voting_id) private view returns (bool) {
        for (uint256 i = 0; i < voterVodingIds[msg.sender].length; i++) {
            if (voterVodingIds[msg.sender][i] == _voting_id) {
                return true;
            }
        }
        return  false;
    }

    function addVote (uint256 _voting_id, uint _vote_option, bytes32 _hash) public {
        if (_hash != hash || hash == "") {
            revert("You cannot use this funcion");
        } 

        if (_voting_id >= voting_id || voting_id == 0) {
            revert("This voting doesn't exist");
        }

        if (block.timestamp > votings[_voting_id].expiration_time) {
            revert("Expiration time of voting is gone");
        }

        if (isVoterAlreadyVote(_voting_id)) {
            revert("You already vote");
        }

        if (_vote_option > votings[_voting_id].options.length - 1 || _vote_option < 0) {
            revert("You pass wrong option");
        }

        voterVodingIds[msg.sender].push(_voting_id);
        votes.push(Vote(_voting_id, _vote_option));
    } 

    function getVoterVotingsIds () public view returns (uint256[] memory) {
        return voterVodingIds[msg.sender];
    } 

    function setHash (bytes32 _hash) public {
        if (msg.sender != chairperson) {
            revert("You are not owner of this contract");
        }

        hash = _hash;
    } 
}
