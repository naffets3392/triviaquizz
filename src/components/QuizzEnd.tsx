import { Box, Typography } from '@mui/material'

type QuizzEndType = {
    correctAnswers: number,
    allQuestions: number
}

export default function QuizzEnd({correctAnswers, allQuestions}: QuizzEndType) {

    return (
        <Box className="quizQuestionContainer">
            <Typography gutterBottom textAlign="center" variant="h1" color="secondary">Congratz!</Typography>
            <Typography textAlign="center" variant="h3" color="secondary">Correct Answers: {correctAnswers} / {allQuestions}</Typography>
        </Box>
    )
}