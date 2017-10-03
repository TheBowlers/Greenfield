import React from 'react';

class SubmitView extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="submitView">
        <button className="btn btn-lg btn-primary col-md-5 submit">Submit</button>
      </div>
    )
  }
}

export default SubmitView;