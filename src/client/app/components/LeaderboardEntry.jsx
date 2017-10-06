import React from 'react'

var LeaderboardEntry = ({user, score, questionsCorrect, questionsAttempted}) => (
  <tbody>
    <tr>
      <td>{user}</td>
      <td>{score}</td>
      <td>{questionsCorrect}</td>
      <td>{questionsAttempted}</td>
      <td>{questionsCorrect / questionsAttempted}</td>
    </tr>
  </tbody>
);

export default LeaderboardEntry