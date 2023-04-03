import './Project.css';

import Button from '@mui/material/Button';

import { useState, useEffect } from 'react';

function Project(props){

    const [hwset1_qty, set_hwset1_qty] = useState(0);
    const [hwset2_qty, set_hwset2_qty] = useState(0);

    function project_manage_click(){
        props.set_active_pid(props.pid);
    }

    const project_leave = async () => {
        let confirm_result = window.confirm("Are you sure you want to leave " + props.pid + "?");
        if(confirm_result === false){return;}
        
        let pid = props.pid;
        let userid = props.userid;

        const response = await fetch('/projects?pid='+pid+'&userid='+userid, {method: 'PATCH'});

        if(response.status !== 200){
            alert("Failed to leave project.");
            return;
        }

        props.update_projects();
        props.set_active_pid("");
        props.set_hwsets_refresh(!props.hwsets_refresh); // no idea why this works
    }

    useEffect(() => {

        fetch('/projects?pid='+props.pid).then( (response) => {
            if(response.status !== 200){return;}
            return response.json();
        }).then( (response_body) => {
            set_hwset1_qty(response_body['hwsets']['HWSet1']);
            set_hwset2_qty(response_body['hwsets']['HWSet2']);
        });

    }, [props.projects_refresh, props.pid]);
    // somehow the hwset quantities update even without the props.projects_refresh dependency, so I have no idea what's going on

    return(
        <div className="project_container">
            
            <div className="name_pid_group">
                <p className="projectname">{props.name}</p>
                <p className="pid">pid: {props.pid}</p>
                <p className="description">{props.description}</p>
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

            <Button
                variant="contained"
                onClick={project_leave}
                sx={{
                    bgcolor: "darkred",
                    marginLeft: "auto"
                }}>
            LEAVE
            </Button>

        </div>
    );
}

export default Project;