import { Box, Typography } from '@mui/material'
import { NavLink } from "react-router-dom";

export default function Home() {
    return (
        <Box className="centerItems homeContainer">
            <Box sx={{padding: "0rem 3rem"}}>
                <Typography
                gutterBottom
                className="textCenter textColor"
                variant="h4"
                >
                    Do you wanna check your knowledge?
                </Typography>
                <NavLink to='quizz' className="navLink">
                    <Typography
                    className="textCenter"
                    variant="h3"
                    >
                        Play!
                    </Typography>
                </NavLink>
            </Box>
        </Box>
    )
}