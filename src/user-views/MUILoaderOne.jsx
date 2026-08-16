
import { Box, CircularProgress } from "@mui/material";

const MUILoaderOne = ({props}) => {

  return (

        <>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '240px' }}>

                <CircularProgress size={40} />
                <Typography variant="body1" sx={{ color: '#333', fontWeight: 500 }}>
                    { props.message }
                </Typography>

            </Box>

        </>

  )

}

export default MUILoaderOne