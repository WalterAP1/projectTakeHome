import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

export const ProjectAppBar = () => {
    const pages = ['Home', 'Products', 'About', 'Contact Us'];

return (
    <Box sx={{ display: "flex" }}>
        <AppBar component="nav" position="static">
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography variant="h6" component="div">
                    Company Name
                </Typography>
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                    {pages.map((page) => (
                        <Button key={page} sx={{ color: "#ffffff" }}>
                            {page}
                        </Button>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    </Box>
  );
};