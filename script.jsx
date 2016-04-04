// Code goes here
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
    var disabled = (this.props.selectedNum.length === 0)
    return(
      <div id="button-frame">
        <div className="btn btn-primary btn-lg" disabled={disabled} >=
        </div>
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
    selectedNum = this.props.selectedNum;
    for(var i = 1; i <= 9; i++){
      className = "number selected-"+ (selectedNum.indexOf(i)>=0)
      numbers.push(
        <div className={className} onClick={selectClick.bind(null, i)}>{i}</div>
      )
    }
    return (
      <div id="number-frame">
        <div className="well">
          {numbers}
        </div>
      </div>
    )
  }
})

var Game = React.createClass({
  getInitialState: function(){
    return {selectedNum:[],
    numberOfStars:Math.floor(Math.random() * 9) + 1}
  },
  selectClick: function(numToAdd){
    if (this.state.selectedNum.indexOf(numToAdd) < 0){
    this.setState({selectedNum: this.state.selectedNum.concat(numToAdd)})
    }
  },
  unselectClick: function(numToAdd){
    var selectedNum = this.state.selectedNum,
    index = selectedNum.indexOf(numToAdd);
    selectedNum.splice(index, 1);
    this.setState({selectedNum: selectedNum });
  },
  render: function(){
    var selectedNum = this.state.selectedNum,
        numberOfStars = this.state.numberOfStars;
    return (
      <div id="game">
        <h3> kids math game </h3>
        <hr />
        <div className="clearFix">
          <StarFrame numberOfStars={numberOfStars} />
          <ButtonFrame selectedNum={selectedNum}/>
          <AnswerFrame selectedNum={selectedNum} unselectClick={this.unselectClick} />
        </div>
        <NumberFrame selectedNum={selectedNum} selectClick={this.selectClick} />
      </div>
    );
  }
});

ReactDOM.render(
  React.createElement(Game),
  document.getElementById('container')
);
