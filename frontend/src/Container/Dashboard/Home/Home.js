import React,{useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import useForceUpdate from 'use-force-update';
const useStyles = makeStyles(theme => ({
  Task: {
    height:"fit-content",
    marginBottom:'10px',
    padding:'20px'
},
duedate:{
    fontFamily:"roboto",
    fontSize:"14px",
    opacity:"0.7"
}
}));

// const upcommingTasks = [{
//     title:"Renew Netflix account",
//     dueDate:"25/3/2020",
//     id:1
// },{
//     title:"Complete flikr project",
//     dueDate:"23/3/2020",
//     id:2
// }]


const Home = ()=>{
    const forceUpdate = useForceUpdate()
    const [upcommingTasks,setUpcommingTasks] = useState([])
    const getTasks = ()=>{
        axios.post('https://peaceful-anchorage-63634.herokuapp.com/cards', {
        Authorization:localStorage.getItem('authentication'),
        OwnerId:localStorage.getItem('_id')
        })
        .then(function (response) {
            console.log(response.data)
            setUpcommingTasks(response.data)
            forceUpdate()
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    useEffect(()=>{
        getTasks()
    },[])

    const removeTask = (taskToRemove)=>{
        setUpcommingTasks(upcommingTasks.filter(task => task!==taskToRemove))
        forceUpdate()
    }
    const classes = useStyles();
    const pagecontent = ()=>{
        if(upcommingTasks.length!=0){
            return upcommingTasks.map(task=>{
                return(
                    <div key={task._id}>
                        <Paper elevation={2} className={classes.Task}>
                            <Typography variant="h5">{task.description}</Typography>
                            <p>Due date: <span className={classes.duedate}>{(task.dueDate?task.dueDate.slice(0,10):'')}</span></p>{console.log(typeof task.dueDate)}
                            <Button color="primary" onClick={()=>removeTask(task)}><DoneIcon/>Completed</Button>
                            <Button color="secondary"><ClearIcon/>Dismiss</Button>
                        </Paper>
                    </div>
                )
            })
        }else{
            return(
                <p>You are doing great no upcomming tasks.</p>
            )
        }
    }
    return(
        <div className="dashboard-home">
            {pagecontent()}
        </div>
    )
}

export default Home