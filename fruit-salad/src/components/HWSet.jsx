import './HWSet.css';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { useState } from 'react';

// figure out how to move sx={} stuff to separate file?
// or just somewhere else in this document to repeat

function HWSet(props){

    const max_hwset_capacity = 100;
    const [hwset_capacity, set_hwset_capacity] = useState(100);
    const [qty_textfield_val, set_qty_textfield_val] = useState("");

    function check_in(){
        let check_in_qty = parseInt(qty_textfield_val);
        if(check_in_qty < 0 | isNaN(check_in_qty)){
            alert("Invalid QTY");
            return;
        }
        let new_capacity = hwset_capacity + check_in_qty;
        if(new_capacity > max_hwset_capacity){new_capacity = max_hwset_capacity;}
        set_hwset_capacity(new_capacity);
        // TODO: clear textfield?
    }
    
    function check_out(){
        let check_out_qty = parseInt(qty_textfield_val);
        if(check_out_qty < 0 | isNaN(check_out_qty)){
            alert("Invalid QTY");
            return;
        }
        let new_capacity = hwset_capacity - check_out_qty;
        if(new_capacity < 0){new_capacity = 0;}
        set_hwset_capacity(new_capacity);
        // TODO: clear textfield?
    }

    return(
        <div class="hwsetcontainer">

            <p class="hwset_name">{props.name}:</p>
            <p class="hwset_capacitylabel">{hwset_capacity}/{max_hwset_capacity}</p>

            <TextField
                variant="filled"
                type="number"
                size="small"
                label="QTY"
                onChange={(new_val) => set_qty_textfield_val(new_val.target.value)}
                sx={{
                    width: "5em"
                }}>
                {qty_textfield_val}
            </TextField>

            <Button variant="contained" onClick={check_in} sx={{height: "40px"}}>check in</Button>

            <Button variant="contained" onClick={check_out} sx={{height: "40px"}}>check out</Button>

        </div>
    );
}

export default HWSet;