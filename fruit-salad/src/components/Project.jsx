import './Project.css';

import Button from '@mui/material/Button';

import { useState, useEffect } from 'react';

function Project(props){

    const [hwset1_qty, set_hwset1_qty] = useState(0);
    const [hwset2_qty, set_hwset2_qty] = useState(0);

    function project_manage_click(){
        props.set_active_pid(props.pid);
    }

    useEffect(() => {
        // query project
        // GET /projects?pid=<pid>
    });

    return(
        <div className="project_container">
            
            <div className="name_pid_group">
                <p className="projectname">{props.name}</p>
                <p className="pid">pid: {props.pid}</p>
            </div>
            
            <p className="authlist">{props.authlist}</p>

            <div className="hwset_quantities">
                <p>HWSet1: {hwset1_qty}</p>
                <p>HWSet2: {hwset2_qty}</p>
            </div>

            <Button
                variant="contained"
                onClick={project_manage_click}
                sx={{
                    bgcolor: "#00AA00",
                    marginLeft: "auto"
                }}>
            MANAGE
            </Button>

        </div>
    );
}

export default Project;