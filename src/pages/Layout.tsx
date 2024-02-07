import { Box } from '@mui/material'
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <Box className="appContainer">
            <Header />
            <Outlet />
        </Box>
    )
}