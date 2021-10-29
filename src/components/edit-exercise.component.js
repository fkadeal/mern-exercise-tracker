import React, {Component} from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditExercise extends Component{
 
    constructor(props){
        super(props);

        this.onchangeUsername = this.onchangeUsername.bind(this);
        this.onchangeDuration = this.onchangeDuration.bind(this);
        this.onchangeDiscription = this.onchangeDiscription.bind(this);
        this.onchangeDate = this.onchangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            discription:'',
            duration:0,
            date:new Date(),
            users: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
       .then(response => {
          this.setState({
              username: response.data.username,
              discription:response.data.discription,
              duration: response.data.duration,
              date: new Date(response.data.date)
          })
       }).catch(function (error){
           console.log(error)
       })

       axios.get('http://localhost:5000/users/')
       .then(response => {
           if (response.data.length > 0){
               this.setState({
                   users: response.data.map(user => user.username),
                   username: response.data[0].username
               })
           }
       })
       }
    
        onchangeUsername(e){
            this.setState({
                username: e.target.value
            });
        }

        onchangeDiscription(e){
            this.setState({
                discription: e.target.value
            });
        }

        onchangeDuration(e){
            this.setState({
                duration: e.target.value
            });
        }

        onchangeDate(date){
            this.setState({
                date: date
            });
        }

        onSubmit(e){
            e.preventDefault();
            const exercise = {
                username: this.state.username,
                discription: this.state.discription,
                duration: this.state.duration,
                date: this.state.date
            }
            console.log(exercise);
            axios.post('http://localhost:5000/exercises/update/'+this.props.match.params.id, exercise)
            .then(res => console.log(res.data));
            
            window.location='/';
        }
    
    render(){
        return(
            <div>
               <h3>Edit Exercise Log</h3>
               <form onSubmit={this.onSubmit}>
                   <div className="form-group">
                       <label>Username</label>
                       <select  ref="UserInput" required className="form-control"
                       value={this.state.username}
                       onChange={this.onchangeUsername}>
                           {
                               this.state.users.map(function(user){
                                   return <option key={user} value={user}>{user} </option>
                               })
                           }
                       </select>
                   </div>
                   <div className="form-group">
                       <label>Description:</label>
                       <input type="text" required className="form-control" 
                       value={this.state.discription}
                       onChange={this.onchangeDiscription}/>
                   </div>
                   <div className="form-group">
                       <label>Duration in minutes:</label>
                       <input type="number" required className="form-control" 
                       value={this.state.duration}
                       onChange={this.onchangeDuration}/>
                   </div>
                   <div className="form-group">
                       <label>Select Date :</label>
                       <div>
                           <DatePicker 
                       selected={this.state.date}
                       onChange={this.onchangeDate}/>
                       </div>
                   </div>

                   <div className="form-group">
                       <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                   </div>
               </form>
            </div>
        )

    }

}