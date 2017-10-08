import React from 'react'

var LeaderboardEntry = ({user, score, questionsCorrect, questionsAttempted}) => (
  <tbody>
    <tr>
      <td>{user}</td>
      <td>{score}</td>
      <td>{questionsCorrect !== undefined ? questionsCorrect : 0}</td>
      <td>{questionsAttempted}</td>
      <td>{console.log(questionsCorrect)} {questionsCorrect !== undefined ? (questionsCorrect / questionsAttempted).toFixed(4) * 100 + '%' : '0%'}</td>
    </tr>
  </tbody>
);

export default LeaderboardEntry