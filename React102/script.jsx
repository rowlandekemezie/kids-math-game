var Card = React.createClass({
    getInitialState: function(){
      return {};
    },

    componentDidMount: function(){
      var component = this;
      $.get("https://api.github.com/users/" + this.props.login).then(function(data){
        component.setState(data);
      });
    },

  render: function(){
    return (
      <div>
        <img src={this.state.avatar_url} width="50" />
        <h3> {this.state.name} </h3>
      </div>
    )
  }
});

var Form = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();
    var inputLogin = ReactDOM.findDOMNode(this.refs.login);
    this.props.addCard(inputLogin.value);
    inputLogin.value = '';
  },
  render: function(){
    return(
        <h3> User input form</h3>
        <form onSubmit={this.handleSubmit}>
          <input placeholder="Github user" ref="login"/>
          <button>Add<button/>
        </form>
    );
  }
})

var Main = React.createClass({
  getInitialState: function(){
    return {logins: ['andela-rekemezie', 'andela-eakinyele', 'row123', 'andela-ashuaib', 'petehunt']}
  },
  addCard: function(inputLogin){
    this.setState({logins: this.state.logins.concat(inputLogin)})
  },
  render: function(){
  var cards = this.state.logins.map(function(login){
    return (<Card login={login} />)
  });
    return (
      <div>
        <Form addCard={this.addCard} />
        {cards}
      </div>
    )
  }
});

ReactDOM.render(React.createElement(Main), document.getElementById('github'))