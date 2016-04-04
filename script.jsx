// Code goes here
var StarFrame = React.createClass({
  render: function(){
    var numOfStars = Math.floor(Math.random() * 9) + 1
    var stars = []
    for(var i = 0; i < numOfStars; i++){
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
})
var ButtonFrame = React.createClass({
  render: function(){
    return(
      <div id="button-frame">
        <div className="btn btn-primary btn-lg">=
        </div>
      </div>
    )
  }
})
var AnswerFrame = React.createClass({
  render: function(){
    return(
      <div id="answer-frame">
        <div className="well">
          ....
          ....
        </div>
      </div>
    )
  }
})

var NumberFrame = React.createClass({
  render: function(){
    var numbers = []
    for(var i = 0; i <= 9; i++){
      numbers.push(
        <div className="number">{i}</div>
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
  render: function(){
    return (
      <div id="game">
        <h3> The game application </h3>
        <hr />
        <div className="clearFix">
          <StarFrame />
          <ButtonFrame />
          <AnswerFrame />
          <NumberFrame />
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  React.createElement(Game),
  document.getElementById('container')
);
