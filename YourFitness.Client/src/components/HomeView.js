import React from 'react';
import {Route, Switch} from 'react-router-dom';
import { isLoggedIn } from '../utils/AuthService';
import Auth from '../utils/AuthService';
import NavBar from './NavBar';
import Login from './Login';
import SideMenu from './SideMenu';
import Main from './HomeViews/Main';
import Profile from './HomeViews/ProfileView';
import WorkOut from './HomeViews/WorkOutView';
import Selection from './HomeViews/WorkOutViews/SelectionView';
import Settings from './HomeViews/Settings';
import Calorie from './HomeViews/ColorieView';
import Management from './HomeViews/ManageWork';
import History from '../utils/History';

const auth = new Auth();

export default class HomeView extends React.Component {


    constructor(props){
      super(props);
      this.Logout = this.Logout.bind(this);
      this.OpenMenu = this.OpenMenu.bind(this);
      this.setUser = this.setUser.bind(this);
      this.GetView = this.GetView.bind(this);
      this.BackToWorkOut = this.BackToWorkOut.bind(this);
      this.state = {toggle: false, name:"", picture:"",loading:"", weight: "", height: "", goal:"", gender: "", age: "",calories:""};
      
    }

    Logout()
    {
      auth.logout();
    }

    BackToWorkOut()
    {
      History.push('/Home/Home-WorkOut')
    }

    getStatus()
    {
        return this.state.loading;
    }

    componentDidMount()
    {
      auth.getInformation(this.setUser);
    }

    OpenMenu()
    {
      if(!this.state.toggle)
      {
        document.getElementById("menu").style.left = "0px";
        this.setState({toggle: true});
      }else{
        document.getElementById("menu").style.left = "-146px";
        this.setState({toggle: false});
      }
    }
    
    setUser(name, picture, weight, height, goal, gender, age, calories)
    {
      this.setState({
        name: "Hi "+name+"!",
        picture: picture,
        loading: "loaded",
        weight: weight,
        height: height,
        goal: goal,
        gender: gender,
        age: age,
        calories: calories
      });
    }

    GetView(location)
    {
      let view = location.target.id;
      if(view == "Profile")
      {
        this.props.history.push('/Home/Home-Profile');
        this.setState({toggle:false});
        this.OpenMenu();
      }
      else if(view == "Workouts")
      {
        this.props.history.push('/Home/Home-WorkOut');
        this.setState({toggle:false});
        this.OpenMenu()
      }
      else if(view == "Settings")
      {
        this.props.history.push('/Home/Home-Settings');
        this.setState({toggle:false});
        this.OpenMenu();
      }
      else if(view == "Home")
      {
        this.props.history.push('/Home');
        this.setState({toggle:false});
        this.OpenMenu()
      }
      else if(view == "Calorie")
      {
        this.props.history.push('/Home/Home-Calorie');
        this.setState({toggle:false});
        this.OpenMenu()
      }
      else if(view == "Management")
      {
        this.props.history.push('/Home/Home-Management');
        this.setState({toggle:false});
        this.OpenMenu()
      }

    }

    render(){
    if(auth.isAuthenticated())
    {
      if(this.getStatus() == "loaded")
      {
        return (   
          <div>
          <div className="content">
           <NavBar OpenMenu = {this.OpenMenu} Logout = {this.Logout}/>
           <div className="user-greeting"> {this.state.name}</div>
           <SideMenu Click={this.GetView}/>
                <Switch>
                  <Route exact path='/Home' render={() => <Main picture={this.state.picture} />} />
                  <Route exact path='/Home/Home-Profile' render={() => <Profile Weight={this.state.weight} Height = {this.state.height} Goal = {this.state.goal} Gender = {this.state.gender} Age = {this.state.age} Calories = {this.state.calories}/>} />
                  <Route exact path='/Home/Home-WorkOut' render={(props) => <WorkOut />} />
                  <Route exact path='/Home/Home-Settings' render={() => <Settings />} />
                  <Route exact path='/Home/Home-Calorie' render={() => <Calorie />} />
                  <Route exact path='/Home/Home-WorkOut/SelectionView' render={(props) => <Selection Back={this.BackToWorkOut} />} />
                </Switch> 
                
          </div>
            
          <div className="footer"> </div>
          </div>   
          )
      }
      else{
        return <div> gathering your info.. </div>
      }
    }
    else{
      return <Login/>
   }
	}
    
}