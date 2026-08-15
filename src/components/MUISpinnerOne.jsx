
import { CircularProgress, Typography } from "@mui/material";

const MUISpinnerOne = () => {
  return (

    <>
      <CircularProgress color="inherit" size={45} />
      <Typography variant="body1" sx={{ color: '#333', fontWeight: 500 }}>
        Loading...
      </Typography>
    </>
    
  )
}

export default MUISpinnerOne;