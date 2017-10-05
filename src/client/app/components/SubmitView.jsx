import React from 'react';

class SubmitView extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      mainButtonText: 'Submit'
    };
  }

  componentWillUpdate(nextProps, nextState) {

  }

  render() {
    return (
      <div className="submitView">
        <button onClick={this.props.submitAnswer} className="btn btn-lg btn-primary col-md-3 submit">{this.state.mainButtonText}</button>
        <button onClick={this.props.getNextQuestion} className="btn btn-lg btn-primary col-md-3 skip">NextQuestion</button>
      </div>
    )
  }
}

export default SubmitView;