import './HWSet.css';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { useState, useEffect } from 'react';

// figure out how to move sx={} stuff to separate file?
// or just somewhere else in this document to repeat

function HWSet(props){

    const [hwset_available, set_hwset_available] = useState(0);
    const [hwset_capacity, set_hwset_capacity] = useState(0);
    const [qty_textfield_val, set_qty_textfield_val] = useState("");

    async function check_in(){

        if(props.active_pid === ""){
            alert("Select a project to manage first!");
            return;
        }


        let check_in_qty = parseInt(qty_textfield_val);
        if(check_in_qty < 0 | isNaN(check_in_qty)){
            alert("Invalid QTY");
            return;
        }
        
        const check_in_data = {
            name: props.hwset_name, 
            qty: check_in_qty, 
            pid: props.active_pid
        };
        const fetch_options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(check_in_data)
        }

        const checkin_response = await fetch('/hardwaresets/checkin', fetch_options);
        if(checkin_response.status !== 200){return;}

        const hwset_query_response = await fetch('/hardwaresets?name='+props.hwset_name);
        const hwset = await hwset_query_response.json();

        set_hwset_available(hwset['available']);
        set_hwset_capacity(hwset['capacity']);
    }
    
    async function check_out(){

        if(props.active_pid === ""){
            alert("Select a project to manage first!");
            return;
        }


        let check_out_qty = parseInt(qty_textfield_val);
        if(check_out_qty < 0 | isNaN(check_out_qty)){
            alert("Invalid QTY");
            return;
        }
        
        const check_in_data = {
            name: props.hwset_name, 
            qty: check_out_qty, 
            pid: props.active_pid
        };
        const fetch_options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(check_in_data)
        };

        const checkout_response = await fetch('/hardwaresets/checkout', fetch_options);
        if(checkout_response.status !== 200){return;}

        const hwset_query_response = await fetch('/hardwaresets?name='+props.hwset_name);
        const hwset = await hwset_query_response.json();

        set_hwset_available(hwset['available']);
        set_hwset_capacity(hwset['capacity']);
    }


    useEffect(() => {

        fetch('/hardwaresets?name='+props.hwset_name).then( (response) => {
            if(response.status !== 200){return;}
            return response.json();
        }).then( (response_body) => {
            set_hwset_available(response_body['available']);
            set_hwset_capacity(response_body['capacity']);
        });
        

    }, [props.hwset_name]);


    return(
        <div class="hwsetcontainer">

            <p class="hwset_name">{props.hwset_name}:</p>
            <p class="hwset_capacitylabel">{hwset_available}/{hwset_capacity}</p>

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