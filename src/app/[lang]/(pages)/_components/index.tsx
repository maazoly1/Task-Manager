import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import TaskList from "./TaskList";
import TaskModal from "./TaskModal";
import { actionGetAuthUser } from "@/actions/authAction";
import TaskHeading from "./TaskHeading";

async function Home() {
  const userData = await actionGetAuthUser();
  const userId = !!userData && "data" in userData && userData.data.id;
  return (
    <Box>
      <Container fixed maxWidth="xl">
        <Paper variant="outlined" sx={{ p: 4 }}>
          <Grid container>
            <Grid item xs sx={{ pb: 5 }}>
              <TaskHeading />
            </Grid>
            {userId && (
              <Grid xs="auto">
                <TaskModal action="Add" userId={userId} />
              </Grid>
            )}
          </Grid>
          <TaskList />
        </Paper>
      </Container>
    </Box>
  );
}

export default Home;
