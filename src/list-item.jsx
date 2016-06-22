var React= require('react');
var Firebase = require('firebase');
var rootUrl = 'https://luminous-heat-1048.firebaseio.com/';


module .exports= React.createClass({
    getInitialState : function(){
        return {
            text : this.props.item.text,
            done: this.props.item.done,
            textChanged : false

        }
    },
    componentWillMount : function () {
      this.fb= new Firebase(rootUrl + 'items/ /' + this.props.item.key);

    },

   render : function() {
       return <div className="input-group">
           <span className="input-group-addon" >
               <input
                   type="checkbox"
                   onChange={this.handleDoneChange}
                   checked={this.state.done}/>
           </span>
           <input
               type="text"
               className="form-control"
               value={this.state.text}
               onChange={this.handleTextChange}
               disabled={this.state.done}/>
           <span className="input-group-btn">
               {this.changesButtons()}
               <button
                   className="btn btn-default"
                   onClick={this.handleDeleteClick}>
                   DELETE
               </button>
           </span>

           </div>
   },
    changesButtons : function(){
        if(this.state.textChanged) {


            return [
          <button className="btn btn-default" onClick={this.handleSaveClick}>SAVE</button>,
          <button className="btn btn-default" onClick={this.handleUndoClick}>UNDO</button>
            ]
        } else {
            return null
        }
    },
    handleUndoClick : function(){
      this.setState({text : this.props.item.text});
        this.setState({textChanged:false});
    },

    handleSaveClick : function() {
      this.fb.update({text : this.state.text});
        this.setState({textChanged:false});
    },
       handleTextChange : function(event) {
           this.setState({
               text : event.target.value,
               textChanged:true});

       },
    handleDeleteClick : function(){
      this.fb.remove();
    },
    handleDoneChange : function(event){
        var update={done:event.target.checked}
       this.setState(update);
        this.fb.update(update);

    }
});