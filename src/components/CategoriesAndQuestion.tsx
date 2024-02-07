import { useEffect, useState } from "react";
import { Box, Grid, Select, FormControl, MenuItem, InputLabel, Button, Typography } from '@mui/material'
import { selectsContainerStyle } from "../AppStyles";
import { useWindowWidth, useCategories, useCleanUrl, useQuestions }  from "../customHooks";
import { loopFunc, settingCategoryTypes } from "../utilsFunc";
// import { useSearchParams } from "react-router-dom";
import { QuestionType } from "../types";
// import { Category, ControlPointSharp } from "@mui/icons-material";
// import {  Link } from 'react-router-dom'
import Loading from "./Loading";
import Question from "./Question";

export default function CategoriesAndQuestion() {
    const {windowWidth} = useWindowWidth()
    const {CATEGORIES, DIFFICULTIES, TYPES, categoriesLoading} = useCategories()
    const [QUESTIONS,setQUESTIONS] = useState<QuestionType[]>([])
    // const [loadingCategoriesAndQuestions, setloadingCategoriesAndQuestions] = useState(false)
    const [quizHasStarted,setQuizHasStarted] = useState(false)

    const [category,setCategory] = useState<string>('Any Category')
    const [numberOfQuestions,setNumberOfQuestions] = useState<string>('')
    const [difficulty,setDifficulty] = useState<string>('Any Difficulty')
    const [type,setType] = useState<string>('Any Type')

    const {url} = useCleanUrl({category, numberOfQuestions, difficulty, type})
    const {loadingQuestions,getQuestions,questions, noQuestions, setNoQuestions} = useQuestions(url)
    const [singleQuestionsNumber,setSingleQuestionNumber] = useState(loopFunc().length)
    const [questionsLength,setQuestionsLength] = useState(loopFunc())
    // const [notEnoughQuestions,setNotEnoughQuestions] = useState(false)
    
    function startQuizz() {
        getQuestions()
        setQuizHasStarted(true)
    }

    function resetQuizz() {
        setCategory('Any Category')
        setDifficulty('Any Difficulty')
        setType('Any Type')
        setNumberOfQuestions('50')
        setQUESTIONS([])
        setQuizHasStarted(false)
        setNoQuestions(false)
    }

    useEffect(() => {
        if(category == 'Any Category' && difficulty == 'Any Difficulty') {
            setSingleQuestionNumber(loopFunc().length)
            setNumberOfQuestions('50')
            setQuestionsLength(loopFunc())
            // setloadingCategoriesAndQuestions(false)
            return
        } else {
            settingCategoryTypes(
                category,
                difficulty,
                setQuestionsLength,
                setSingleQuestionNumber,
                setNumberOfQuestions
                // setloadingCategoriesAndQuestions
                )
        }
    },[category, difficulty])

    useEffect(() => {
        setQUESTIONS(questions)
    },[questions])

    return (
        <Box sx={selectsContainerStyle}>
            <Box>
                {categoriesLoading && <Loading />}
                {!categoriesLoading && !quizHasStarted && <Grid className="gridCenter" container spacing={windowWidth > 600 ? 2 : 2}>
                    <Grid item xs={6} lg={3} xl={3}>
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select
                            disabled={quizHasStarted}
                            label="Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            >
                            {CATEGORIES.map(category => {
                                return <MenuItem
                                value={category.id.toString()}
                                key={category.name}
                                >
                                    {category.name}
                                    </MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} lg={3}>
                        <FormControl fullWidth>
                            <InputLabel>{`Number of Questions ${singleQuestionsNumber}`}</InputLabel>
                            <Select
                            disabled={quizHasStarted}
                            label={`Number of Questions ${singleQuestionsNumber}`}
                            value={numberOfQuestions}
                            onChange={(e) => setNumberOfQuestions(e.target.value)}
                            >
                            {questionsLength.map(num => {
                                return <MenuItem
                                value={num}
                                key={num}
                                >
                                    {num}
                                    </MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} lg={3}>
                        <FormControl fullWidth>
                            <InputLabel>Difficulty</InputLabel>
                            <Select
                            disabled={quizHasStarted}
                            label="Difficulty"
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            >
                            {DIFFICULTIES.map(difficulty => {
                                return <MenuItem
                                value={difficulty}
                                key={difficulty}
                                >
                                    {difficulty}
                                    </MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} lg={3}>
                        <FormControl fullWidth>
                            <InputLabel>Type</InputLabel>
                            <Select
                            disabled={quizHasStarted}
                            label="Type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            >
                            {TYPES.map(type => {
                                return <MenuItem
                                value={type}
                                key={type}
                                >
                                    {type}
                                    </MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>}
                {!quizHasStarted && <Box className="justifyCenter" marginTop="13rem">
                    <Button onClick={startQuizz} color="secondary" variant="contained">Play Quizzz</Button>
                </Box>}
                {noQuestions && <Box className="containerCenterItems"><Typography marginTop="3rem" textAlign="center" variant="h3" color="secondary">No Questions... Try Again...</Typography></Box>}
                {loadingQuestions  && <Loading />}
                {QUESTIONS.length !== 0 && <Question QUESTIONS={QUESTIONS}/>}
                {quizHasStarted && <Box className="justifyCenter" marginTop="5rem">
                    <Button onClick={resetQuizz} color="secondary" variant="outlined">Reset Quizzz</Button>
                </Box>}
            </Box>
        </Box>
    )
}