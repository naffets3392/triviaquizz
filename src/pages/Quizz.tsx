import { Box } from '@mui/material'
import { quizPageContainer } from "../AppStyles";
import Categories from "../components/Categories";


export default function Quizz() {
    return (
        <Box className="justifyCenter" sx={quizPageContainer}>
            <Categories />
        </Box>
    )
}