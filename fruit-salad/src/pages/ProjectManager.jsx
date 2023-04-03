import '../css/ProjectManager.css';

import { useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import Project from '../components/Project'
import HWSet from '../components/HWSet';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function ProjectManager(){

    const location = useLocation();

    const [project_list, set_project_list] = useState([]);
    const [active_pid, set_active_pid] = useState("");
    const [projects_refresh, set_projects_refresh] = useState(true);
    const [hwsets_refresh, set_hwsets_refresh] = useState(true);

    const get_projects = useCallback(async () => {
        const response = await fetch('/projects?userid='+location.state.userid);
        const response_body = await response.json();
        if(response.status !== 200){ return []; }
        return response_body;
    }, [location.state.userid]); 

    function update_projects() {
        get_projects().then((projects) => {
            set_project_list(projects);
        });
    }

    const add_project = async () => {
        let proj_name = document.getElementById("project_name_textfield").value;
        let proj_desc = document.getElementById("project_desc_textfield").value;
        let proj_id = document.getElementById("project_pid_textfield").value;
        let proj_authlist = [location.state.userid];

        if(proj_name === "" || proj_id === ""){
            alert("Project name and ProjectID must not be blank!");
            return;
        }

        const proj_data = {
            name: proj_name,
            description: proj_desc,
            pid: proj_id,
            authlist: proj_authlist
        };
        const fetch_options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(proj_data)
        };

        const response = await fetch('/projects', fetch_options);
        if(response.status !== 201){
            alert("Invalid");
            return;
        }

        get_projects().then((projects) => {
            set_project_list(projects);
        });
    }

    const add_to_authlist = async () => {
        let pid = active_pid;
        let userid = document.getElementById("userid_textfield").value;
        
        if(userid === ""){
            alert("UserID must not be blank!");
            return;
        }

        const response = await fetch('/projects?pid='+pid+'&userid='+userid, {method: 'PUT'});
        if(response.status !== 200){
            alert("Invalid");
            return;
        }

        get_projects().then((projects) => {
            set_project_list(projects);
        });
    }

    const join_project = async () => {
        let pid = document.getElementById("pid_textfield").value;
        let userid = location.state.userid;

        if(pid === ""){
            alert("ProjectID must not be blank!");
            return;
        }

        const response = await fetch('/projects?pid='+pid+'&userid='+userid, {method: 'PUT'});
        if(response.status !== 200){
            alert("Invalid");
            return;
        }

        get_projects().then((projects) => {
            set_project_list(projects);
        });
    }

    let navigate = useNavigate();
    function log_out(){
        navigate('/');
    }

    useEffect(() => {

        get_projects().then((projects) => {
            set_project_list(projects);
        });

    }, [get_projects]);
    
    const project_list_elements = project_list.map((project) => (
        <Project 
            key={project['pid']} 
            pid={project['pid']} 
            name={project['name']} 
            description={project['description']}
            authlist={project['authlist'].join(", ")} 
            set_active_pid={set_active_pid}
            projects_refresh={projects_refresh}
            update_projects={update_projects}
            userid={location.state.userid}
            hwsets_refresh={hwsets_refresh} 
            set_hwsets_refresh={set_hwsets_refresh} 
        />
    ));

    return(
        <div>

            <h1 className="welcome_header">Welcome, {location.state.userid}!</h1>

            <div className="project_manager_container">

                <div className="user_projects_container">
                    {project_list_elements}
                </div>

                <div className='utilities_section'>

                    <div>
                        
                        <h2>Resource Management</h2>

                        {active_pid === "" ?
                            <p>No project selected</p> :
                            <p>Currently managing <strong>{active_pid}</strong></p>
                        }

                        <div className='hwsets_container'>
                            <HWSet hwset_name="HWSet1" 
                                active_pid={active_pid} 
                                projects_refresh={projects_refresh} 
                                set_projects_refresh={set_projects_refresh} 
                                hwsets_refresh={hwsets_refresh}
                            />

                            <HWSet hwset_name="HWSet2" 
                                active_pid={active_pid} 
                                projects_refresh={projects_refresh} 
                                set_projects_refresh={set_projects_refresh}
                                hwsets_refresh={hwsets_refresh}
                            />
                        </div>

                    </div>

                    <div>

                        <h2> Project Management</h2>

                        <div className="project_add_container">
                            <TextField variant="filled" required id="project_name_textfield" label="Name" sx={{width: "8em"}} />
                            <TextField variant="filled" required id="project_pid_textfield" label="ProjectID" sx={{width: "7em"}} />
                            <TextField variant="filled" id="project_desc_textfield" label="Description" />
                            <Button variant="contained" onClick={add_project}>Create Project</Button>
                        </div>

                        <div className="project_join_container">
                            <TextField variant="filled" required id="pid_textfield" label="ProjectID" sx={{width: "7em"}} />
                            <Button variant="contained" onClick={join_project}>Join Project</Button>
                        </div>

                        <div className="project_authlist_container">
                            <TextField variant="filled" required id="userid_textfield" label="UserID" sx={{width: "10em"}} />
                            <Button variant="contained" onClick={add_to_authlist}>Add User To Project</Button>
                        </div>

                        <div>
                            <Button variant="contained" onClick={log_out} sx={{bgcolor: "darkred"}}>Logout</Button>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );

    // turn this into an overall management page? | or make a new one
    
    // section that shows every project a user has access to
    //      for each project, user can leave it with a leave button at the end
    //      if user leaves project and makes authlist empty, then check in leftover hwsets
    //      have a MANAGE button for each project
    
    // i guess to support popup/section, each project manage onClick should change some
    // active current managing state (pid)
    // each onClick can do a setState thing
    // and manage section useEffect can depend on that state for rendering
    // yuhhh 

}

export default ProjectManager;
