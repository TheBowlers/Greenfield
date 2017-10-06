import React from 'react'

var Leaderboard = () => (
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
                    <tbody>
                      <tr>
                        <td>Kent Shepard</td>
                        <td>100,000</td>
                        <td>75</td>
                        <td>150</td>
                        <td>50%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
            </div>
        </div>
    </div>
  </div>
);

export default Leaderboard