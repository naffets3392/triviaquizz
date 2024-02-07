import { Box } from '@mui/material'
import { quizPageContainer } from "../AppStyles";
import CategoriesAndQuestion from "../components/CategoriesAndQuestion";


export default function Quizz() {
    return (
        <Box className="justifyCenter" sx={quizPageContainer}>
            <CategoriesAndQuestion />
        </Box>
    )
}