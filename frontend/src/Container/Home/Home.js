import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import './Home.css'
// import OverallTrending from './OverallTrending/OverallTrending'
// import Search from './Search/Search'
// import Topics from './Topics/Topics'
// import CurrentTrending from './CurrentTrending/CurrentTrending'
// import News from './News/News'
const useStyles = makeStyles(theme => ({
    root: {
      position: 'relative',
      paddingTop: '80px'
    },
  }));
    
const Home = ()=>{
    const classes = useStyles()
    return(
        <div className={classes.root}>
            <div className="landing-page">
              <div className="onboard">
              <Typography variant="h1" className="classes.typography">"Focus on being productive insted of being busy."</Typography>
              </div>
              <div className="quote">

              </div>
            </div>
            {/* <Search></Search>
            <OverallTrending/>
            <Topics/>
            <CurrentTrending/>
            <News/> */}
        </div>
    )
}

export default Home