import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Button } from '@mui/material'
import { QuestionType } from "../types";
import QuizzEnd from "./QuizzEnd";

type QuestionComponentType = {
    QUESTIONS: QuestionType[],
}

export default function Question({QUESTIONS}: QuestionComponentType) {
    const [numberOfQuestion,setNumberOfQuestion] = useState(0)
    const [timer,setTimer] = useState(30)
    const [correctAnswers,setCorrectAnswers] = useState(0)
    const [answeredQuestions,setAnsweredQuestions] = useState(-1)
    const [quizzEnd,setQuizzEnd] = useState(false)

    if(timer == 0) {
        setNumberOfQuestion(numberOfQuestion + 1)
        setTimer(30)
    }

    function checkAnswer(e:  React.MouseEvent) {
        const target = e.target as HTMLElement
        let isCorrect = target.getAttribute("data-iscorrect")
        if(isCorrect == 'true') {
            setCorrectAnswers(correctAnswers + 1)
        }
        setNumberOfQuestion(numberOfQuestion + 1)
    }    

    useEffect(() => {
        if(numberOfQuestion == QUESTIONS.length) {
            setQuizzEnd(true)
            return
        }
        setAnsweredQuestions(answeredQuestions + 1)
        setTimer(30)
        const interval = setInterval(() => {
            setTimer(prevTime => prevTime - 1)
        },1000)
        return () => clearInterval(interval)
    },[numberOfQuestion])

    return (
        <Box>
            {quizzEnd && <QuizzEnd correctAnswers={correctAnswers} allQuestions={QUESTIONS.length}/>}
            {!quizzEnd && <Box className='quizQuestionContainer'>
                <Grid spacing={3} justifyContent="center" container className="marginBottom3rem">
                    <Grid item xs={6}><Typography gutterBottom textAlign="center" color="secondary" variant="h5">Questions: {QUESTIONS.length}</Typography></Grid>
                    <Grid item xs={6}><Typography gutterBottom textAlign="center" color="secondary" variant="h5">Score: {correctAnswers}/{answeredQuestions}</Typography></Grid>
                    <Grid item xs={12}><Typography textAlign="center" color="secondary" variant="h5">Time: {timer}</Typography></Grid>
                </Grid>
                <Grid container justifyContent="center" spacing={5}>
                    <Grid item xl={12}>
                        <Typography textAlign="center" color="secondary" variant="h5">{QUESTIONS[numberOfQuestion]?.question}</Typography>
                    </Grid>
                    <Grid item container spacing={3} marginTop={1} justifyContent="center">
                    {QUESTIONS[numberOfQuestion]?.answers?.map(answer => {
                        return (
                            <Grid item xs={12} sm={6} key={answer.answer} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <Button sx={{width: "max-content"}} onClick={(e) => checkAnswer(e)} data-iscorrect={answer.isCorrect} size="large" color="secondary">{answer.answer}</Button>
                            </Grid>
                            )
                        })}
                        </Grid>
                    </Grid>    
                <Grid container justifyContent="center" className="marginTop5rem">
                    <Grid item xs={4}>
                        <Button fullWidth onClick={() => setNumberOfQuestion(numberOfQuestion + 1)} variant="contained" color="secondary">Next Question</Button>
                    </Grid>
                </Grid>
            </Box>}
         </Box>
    )
}
