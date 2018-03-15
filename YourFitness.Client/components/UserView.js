import React from 'react';
import axios from 'axios';
import store from '../store'
import RegisterView from './RegisterView.js'

export default class UserView extends React.Component {

    constructor(props){
      super(props);
      this.state = {view : "initial", objs : []}
      this.checkState = this.checkState.bind(this);
      this.ViewUsers = this.ViewUsers.bind(this);
      
    }

    ViewUsers(e){

        var bodyFormData = new FormData();
      
        axios({
          method: 'get',
          url: 'http://localhost:57515/api/user',
          config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then((response) => {
          //handle success
          this.setState( {objs : response.data});
      })
      .catch(function (response) {
          //handle error;
          console.log("failed");
      });

      this.setState({view: "users"});
      }

      checkState(){
        return this.state.view;
        }

        Register(){
            console.log("clicked")
            return ( <div><RegisterView /></div>)
            }

    render(){
        if(this.checkState() == "initial"){
            return <div><button onClick={this.ViewUsers}>ViewUsers</button></div>
        }
        else{
            
            let el = this.state.objs.map(objects =>
                <div key ={objects.id} > {objects.firstName} {objects.lastName} <button onClick={this.UpdateUser}>update</button></div>
            )
            
            return(<div>
            {el}
            <button onClick={this.Register}>Back</button>
            </div>
            )}
}
}