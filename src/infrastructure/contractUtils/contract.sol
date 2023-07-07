// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Survey is ERC20, Ownable {
  uint256 public cooldownSeconds;

  mapping(address => uint256) public lastSubmittal;

  mapping(address => mapping(uint256 => uint256[][])) answers;

  constructor(uint256 _cooldownSeconds) ERC20("Quiz Token", "QUIZ") {
    cooldownSeconds = _cooldownSeconds;
  }

  function submit(uint256 _surveyId, uint256[] memory _answerIds) public {
    require(
      block.timestamp > lastSubmittal[msg.sender] + cooldownSeconds,
      "Cooldown period not finished"
    );
    lastSubmittal[msg.sender] = block.timestamp;
    uint256[][] storage surveyAnswers = answers[msg.sender][_surveyId];
    surveyAnswers.push(_answerIds);
    _mint(msg.sender, 1 ether);
  }

  function setCooldown(uint256 _cooldownSeconds) public onlyOwner {
    cooldownSeconds = _cooldownSeconds;
  }
}