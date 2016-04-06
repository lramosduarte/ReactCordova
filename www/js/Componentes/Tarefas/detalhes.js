var React = require('react');
var ReactDOM = require('react-dom');
var $ = require("jquery");

var Detalhes = React.createClass({
  loadCommentsFromServer: function(){
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: this.props.url,
      success: function(data){
        this.setState({data: data})
      }.bind(this),
      error: function(xhr, status, err){
        alert('Não foi possivel estabelecer conexão!\n');
      }.bind(this)
    })
  },
  getInitialState: function(){
    return {data: []}
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    document.addEventListener("backbutton", function(){
      ReactDOM.render(<Main /> , document.getElementById('root'));
    }, false);
  },
  render: function(){
    return (
      <div className="container">
        <div className="row">
          <h1> Detalhes da tarefa </h1>
          <hr />
        </div>
        <div className="row">
          <h2> <span> {this.state.data.id} </span> - {this.state.data.descricao} </h2>
        </div>
        <div className="row">
          <ItemConcluido status={this.state.concluido} />
        </div>
      </div>
    );
  }
});

var ItemConcluido = React.createClass({
  render: function(){
    var status;
    switch (this.props.status) {
      case '1':
        status = 'V';
        break;
      default:
        status = '';
    }
    return (
      <span className="col-xs-2">
        {status}
      </span>
    );
  }
});

module.exports = Detalhes;
