
import { TextField, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';

export const MUIFormField = ({ children }) => (

    <div className="mt-2" style={{ width: '100%' }}>
        {children}
    </div>

);

export const MUISelect = ({ options = [], ...props }) => (

        <FormControl fullWidth sx={{ minWidth: 250 }}>

            <InputLabel id={`${props.llabelId}-autowidth`}>{props.label}</InputLabel>
            <Select {...props}>
            
                <MenuItem value="">{ options.length ? 'Select One': 'No Matching Items' }</MenuItem>
                {options.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                    </MenuItem>
                    
                ))}

            </Select>

        </FormControl>

);

export const MUITextField = ({...props}) => (

        <FormControl fullWidth sx={{ minWidth: 250 }}>

            <TextField {...props}></TextField>

        </FormControl>
);

export const MUIButton = ( {...props} )=>(
    
        <Button {...props} sx={{ px: 4, py: 1.5, textTransform: 'none', fontWeight: 'bold' }}>
            { props.btnlable }
        </Button>
  
)

  

