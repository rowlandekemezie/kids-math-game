// kids math game application

var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

var StarFrame = React.createClass({
  render: function(){
    var stars = []
    for(var i = 0; i < this.props.numberOfStars; i++){
      stars.push(<span className="glyphicon glyphicon-star"></span>)
    }
    return(
      <div id="star-frame">
        <div className="well">
         {stars}
        </div>
      </div>
    )
  }
});

var ButtonFrame = React.createClass({
  render: function(){
    var disabled, correct = this.props.correct, button;

    switch(correct){
      case true:
        button = (<div className="btn btn-success btn-lg"
          onClick={this.props.acceptAnswer} >
        <span className="glyphicon glyphicon-ok"></span>
        </div>
        )
        break;
      case false:
        button = (<div className="btn btn-danger btn-lg">
          <span className="glyphicon glyphicon-remove"></span>
        </div>
        )
        break;

      default:
        disabled = (this.props.selectedNum.length === 0)
        button = (<div className="btn btn-primary btn-lg"
          onClick={this.props.checkAnswer} disabled={disabled} >=
          </div>
          )
    }

    return(
      <div id="button-frame">
        {button}
        <br/> <br/>
        <button className="btn btn-warning btn-xs" onClick={this.props.redraw}>
          <span className="glyphicon glyphicon-refresh">
          &nbsp;
          {this.props.redraws}
          </span>
        </button>
      </div>
    )
  }
});

var AnswerFrame = React.createClass({
  render: function(){
    var props = this.props;
    var selectedNum = props.selectedNum.map(function(i){
      return (<span onClick={props.unselectClick.bind(null, i)}>
        {i}
      </span>)
    });
    return(
      <div id="answer-frame">
        <div className="well">
          {selectedNum}
        </div>
      </div>
    )
  }
})

var NumberFrame = React.createClass({
  render: function(){
    var numbers = [], className,
    selectClick = this.props.selectClick,
    selectedNum = this.props.selectedNum,
    usedNums = this.props.usedNums;
    for(var i = 1; i <= 9; i++){
      className = "number selected-"+ (selectedNum.indexOf(i)>=0)
      className += " used-" + (usedNums.indexOf(i)>=0)
      numbers.push(
        <div className={className} onClick={selectClick.bind(null, i)}>{i}</div>
      );
    }
    return (
      <div id="number-frame">
        <div className="well">
          {numbers}
        </div>
      </div>
    );
  }
});

var GameDone = React.createClass({
  render: function(){
    return(
      <div className="well text-center">
        {this.props.gameStatus}
        &nbsp;
        <br />
        <br />
        <button onClick={this.props.resetGame}>Try Again</button>
      </div>
    );
  }
});

var Game = React.createClass({
  getInitialState: function(){
    return {selectedNum:[],
      correct: null,
      numberOfStars: this.random(),
      usedNums: [],
      redraws: 5,
      gameStatus: null
      }
  },

  selectClick: function(numToAdd){
    if (this.state.selectedNum.indexOf(numToAdd) < 0){
      this.setState({selectedNum: this.state.selectedNum.concat(numToAdd),
        correct: null
      });
    }
  },

  unselectClick: function(numToAdd){
    var selectedNum = this.state.selectedNum,
    index = selectedNum.indexOf(numToAdd);
    selectedNum.splice(index, 1);
    this.setState({selectedNum: selectedNum,
      correct: null});
  },

  sumOfSelectedNum: function(){
    return (
      this.state.selectedNum.reduce(function(p,n){
        return p + n
      })
    )
  },

  checkAnswer: function(){
    var correct =  (this.state.numberOfStars === this.sumOfSelectedNum());
    this.setState({correct: correct});
  },

  acceptAnswer: function(){
    // used numbers
    var usedNums = this.state.usedNums.concat(this.state.selectedNum)
    this.setState({selectedNum: [],
      numberOfStars: this.random(),
      correct: null,
      usedNums: usedNums
    }, function(){
      this.updateStatus()
    });
  },

  redraw: function(){
    if(this.state.redraws > 0){
    this.setState({
      numberOfStars: this.random(),
      selectedNum:[],
      redraws: this.state.redraws - 1,
      correct: null
    }, function(){
      this.updateStatus()
    });
    }
  },

  random: function(){
    return Math.floor(Math.random() * 9) +1;
  },

  possibleSolutions: function(){
    var numberOfStars = this.state.numberOfStars,
        usedNums = this.state.usedNums,
        possibleNums = [];
      for(var i =1; i <= 9; i++){
        if(usedNums.indexOf(i) < 0){
          possibleNums.push(i);
        }
      }
      return possibleCombinationSum(possibleNums, numberOfStars);
  },

  updateStatus: function(){
    if(this.state.usedNums.length === 9){
      this.setState({gameStatus: "Done! Nice Job"
      })
      return;
    }
    if(this.state.redraws === 0 && !this.possibleSolutions()){
      this.setState({gameStatus: "Game Over!"})
    }
  },

  resetGame: function(){
    this.replaceState(this.getInitialState())
  },

  render: function(){
    var selectedNum = this.state.selectedNum,
        numberOfStars = this.state.numberOfStars,
        correct = this.state.correct,
        usedNums = this.state.usedNums,
        redraws = this.state.redraws,
        gameStatus = this.state.gameStatus,
        bottomFrame;

        if(gameStatus){
          bottomFrame = (<GameDone gameStatus={gameStatus}
          resetGame={this.resetGame} />)
        } else {
          bottomFrame = (<NumberFrame selectedNum={selectedNum}
            selectClick={this.selectClick} usedNums={usedNums} />)
        }

    return (
      <div id="game">
        <h3> kids math game </h3>
        <hr />
        <div className="clearFix">
          <StarFrame numberOfStars={numberOfStars} />
          <ButtonFrame selectedNum={selectedNum}
            correct={correct}
            checkAnswer={this.checkAnswer}
            acceptAnswer={this.acceptAnswer}
            redraw={this.redraw}
            redraws={redraws}/>
          <AnswerFrame selectedNum={selectedNum}
          unselectClick={this.unselectClick} />
        </div>
        {bottomFrame}
      </div>
    );
  }
});

ReactDOM.render(
  React.createElement(Game),
  document.getElementById('container')
);
