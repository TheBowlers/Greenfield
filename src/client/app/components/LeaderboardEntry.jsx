import React from 'react'

var LeaderboardEntry = ({user, score, }) => (
  <tbody>
    <tr>
      <td>{user}</td>
      <td>{score}</td>
      <td>{correctAnswers}</td>
      <td>{questionsAttempted}</td>
      <td>{correctAnswers / questionsAttempted}</td>
    </tr>
  </tbody>
);

export default LeaderboardEntry