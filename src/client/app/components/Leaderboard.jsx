import React from 'react'
import Leaderboard from './LeaderboardEntry.jsx'

var Leaderboard = ({leaderboardEntries}) => (
  <div className="bs-example">
    <div id="leaderboard" className="modal fade">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 className="modal-title">Leaderboard</h4>
                </div>
                <div className="modal-body">
                  <table className="table table-striped table-hover ">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Total <div>Score</div></th>
                        <th>Correct <div>Answers</div></th>
                        <th>Questions <div>Attempted</div></th>
                        <th>Percent</th>
                      </tr>
                    </thead>
                    {leaderboardEntries.map((user) => {
                      return (
                        <LeaderboardEntry user={user.name}/>
                      )
                    })}
                  </table>
                </div>
            </div>
        </div>
    </div>
  </div>
);

export default Leaderboard