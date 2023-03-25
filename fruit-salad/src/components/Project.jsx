import './Project.css';

import Button from '@mui/material/Button';

function Project(props){

    function project_manage_click(){
        props.manage_state_function(props.pid);
    }

    return(
        <div className="project_container">
            
            <div className="name_pid_group">
                <p className="projectname">{props.name}</p>
                <p className="pid">pid: {props.pid}</p>
            </div>
            
            <p className="authlist">{props.authlist}</p>

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