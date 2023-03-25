import './Project.css';
import HWSet from './HWSet'

import Button from '@mui/material/Button';
import { useState } from 'react';

function Project(props){

    function project_manage_click(){
        props.manage_state_function(props.pid);
    }

    return(
        <div class="project_container">

            <p class="projectname">{props.name}</p>
            <p class="authlist">{props.authlist}</p>

            <div class="project_hwsets">
                <HWSet name="HWSet1" />
                <HWSet name="HWSet2" />
            </div>

            <Button
                variant="contained"
                onClick={project_manage_click}
                sx={{
                    bgcolor: "#00AA00",
                    height: "60px",
                    marginLeft: "auto"
                }}>
            MANAGE
            </Button>

        </div>
    );
}

export default Project;