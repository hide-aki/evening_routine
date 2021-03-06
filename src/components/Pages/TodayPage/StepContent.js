import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import TextField from '@material-ui/core/TextField';


import Scroll from '../../Layout/Scroll/Scroll'
import ToDosTable from './ToDosTable';
import GoalsPage from '../GoalsPage/GoalsPage';

import { addGoal, editGoal, removeGoal } from '../../../actions/actions'

const mapStateToProps = state => {
    return {
        darkMode: state.changeDarkMode.darkMode,
        goals: state.changeGoals.goals                    // -''-
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddGoal: (goal) => dispatch(addGoal(goal)),
        onEditGoal: (goal, index) => dispatch(editGoal(goal, index)),
        onRemoveGoal: (index) => dispatch(removeGoal(index)),
    }
}


const useStyles = makeStyles(theme => ({
    headerStepper: {

    },
    typoStepper: {
        marginTop: 24,
        marginBottom: 24,
        fontSize: 20,
    },
    boxStepperContent: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    boxGiphy: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    buttonShuffleGiphy: {
        marginBottom: 28,
    },
    boxGiphyImage: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        width: '60vw',
        maxWidth: 900,
    },
    giphy: {
        height: '90%',
        width: '100%',
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
    },
    boxRecapDay: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '90%',
    },
    boxReviewGoals: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
    },
    boxToDos: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
    },
    textFieldRecapDay: {
        height: '100%',
    },
    innerTextField: {
        '& label.Mui-focused': {
            color: 'green',
        },
    },
}));

const routineSteps = [
    {
        label: 'Eliminate negativity',
        description: ["The best way to get rid of bad thoughts and eliminiate negativity is to take some minutes to watch something funny and entertaining.", "Shuffle through some cat giphy's and move on to the next step if you feel comfortable: "],
    },
    {
        label: 'Empty your brain & close your day',
        description: ['"At the end of each day, you should play back the tapes of your performance. The results should either applaud you or prod you". [Jim Rohn] ', 'Remember what you did today and notice everything you\'ve accomplished, learned and anything worth remembering:'],
    },
    {
        label: 'Review your progress',
        description: ["After you have emptied your brain and you have written down what you have achieved today, review your progress and see whether you're doing all the things that you should be doing to fulfill your goals. ", "Review and edit your goals if needed:"],
    },
    {
        label: 'Get ready for tomorrow today',
        description: ['This is one of the most important things you can do before tomorrow morning. ', 'Write down the 3 most important tasks for tomorrow and give them a specific timeframe:'],
    },
    {
        label: 'Allow a moment of reflection & prayer',
        description: ['To close your day and your thoughts, write down what you have learned today and what was satisfying. '],
    },
];



const StepContent = (props) => {
    const classes = useStyles();
    const { activeStep, randomGiphyURL, shuffleGiphy, goals, onAddGoal, onEditGoal, onRemoveGoal, darkMode } = props;
    const [height, setHeight] = useState(window.innerHeight);

    const goalsPageOptions = {
        hideTitle: true,
        noGoalsMessage: "No goals defined. Define at least one goal to move on.",
    }

    useEffect(() => {
        function handleResize() {
            setHeight(window.innerHeight);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [height]);

    const getMaxRows = (height) => {
        if (height > 1700) return 50
        if (height > 1600) return 46
        if (height > 1500) return 42
        if (height > 1400) return 38
        if (height > 1300) return 34
        if (height > 1200) return 30
        if (height > 1100) return 26
        if (height > 1000) return 22
        if (height > 900) return 18
        if (height > 820) return 14
        if (height > 750) return 10
        if (height > 700) return 7
        if (height > 630) return 5
        if (height > 580) return 3
        return 1
    }

    return (
        <>
            <Paper square elevation={0} className={classes.headerStepper}>
                <Typography variant="h4">{routineSteps[activeStep].label}</Typography>
            </Paper>
            {
                routineSteps[activeStep].description
                    .map((part, index) =>
                        <Typography key={index} className={classes.typoStepper}>{part}</Typography>
                    )
            }
            <Box className={classes.boxStepperContent}>
                {
                    activeStep === 0 &&
                    <>
                        <Box className={classes.boxGiphy}>
                            <Box className={classes.boxGiphyImage}>
                                <div style={{ backgroundImage: 'url(' + randomGiphyURL + ')' }} className={classes.giphy} />
                                {/*<img alt="Giphy" className={classes.giphy} src={randomGiphyURL} />*/}
                            </Box>
                            <Button
                                variant="contained"
                                color={darkMode ? "secondary" : "primary"}
                                size="small"
                                className={classes.buttonShuffleGiphy}
                                onClick={() => shuffleGiphy('cat')}
                            ><ShuffleIcon /></Button>
                        </Box>

                    </>
                }{
                    activeStep === 1 &&
                    <>
                        <Box className={classes.boxRecapDay}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Notes of today"
                                multiline
                                rows={getMaxRows(height) * 3 / 4}
                                rowsMax={getMaxRows(height)}
                                className={classes.textFieldRecapDay}
                                defaultValue="Write your notes of today here."
                                variant="outlined"
                                fullWidth={true}
                            />
                        </Box>
                    </>
                }{
                    activeStep === 2 &&
                    <>
                        <Box className={classes.boxReviewGoals}>
                            <Scroll>
                                <GoalsPage goals={goals} onAddGoal={onAddGoal} onEditGoal={onEditGoal} onRemoveGoal={onRemoveGoal} options={goalsPageOptions} darkMode={darkMode} />
                            </Scroll>
                        </Box>
                    </>
                }{
                    activeStep === 3 &&
                    <>
                        <Box className={classes.boxToDos}>
                            <Scroll>
                                <ToDosTable />
                            </Scroll>

                        </Box>
                    </>
                }
                {
                    activeStep === 4 &&
                    <>
                    </>
                }
            </Box>
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(StepContent);
