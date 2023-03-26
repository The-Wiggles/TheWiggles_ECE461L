import '../css/ProjectManager.css';

import { useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import Project from '../components/Project'
import HWSet from '../components/HWSet';
import { TextField, Button } from '@mui/material';


function ProjectManager(){

    const location = useLocation();

    const [project_list, set_project_list] = useState([]);
    const [active_pid, set_active_pid] = useState("");
    const [projects_refresh, set_projects_refresh] = useState(true)

    const get_projects = useCallback(async () => {
        const response = await fetch('/projects?userid='+location.state.userid);
        const response_body = await response.json();
        if(response.status !== 200){ return []; }
        return response_body;
    }, [location.state.userid]); 

    const add_project = async () => {
        let proj_name = document.getElementById("project_name_textfield").value;
        let proj_desc = document.getElementById("project_desc_textfield").value;
        let proj_id = document.getElementById("project_pid_textfield").value;
        let proj_authlist = [location.state.userid];

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
        const response = await fetch('/projects?pid='+pid+'&userid='+userid, {method: 'PUT'});
        if(response.status !== 200){
            alert("Invalid");
            return;
        }

        get_projects().then((projects) => {
            set_project_list(projects);
        });
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
                            <HWSet hwset_name="HWSet1" active_pid={active_pid} projects_refresh={projects_refresh} set_projects_refresh={set_projects_refresh} />
                            <HWSet hwset_name="HWSet2" active_pid={active_pid} projects_refresh={projects_refresh} set_projects_refresh={set_projects_refresh} />
                        </div>
                    </div>

                    <div>
                        <h2> Project Management</h2>
                        {/* TODO: need to display description for projects */}

                        {/* stuff to create new project | add new Project to database, update project_list? or somehow trigger useEffect */}
                        {/* maybe trigger with the same projects_refresh state? */}
                        {/* stuff to add users to project's authlist | will need some useEffect stuff like hwsets? */}
                        <div class="project_add_container">
                            <TextField required id="project_name_textfield" label="Name" />
                            <TextField required id="project_pid_textfield" label="ProjectID" />
                            <TextField required id="project_desc_textfield" label="Description" />
                            <Button variant="contained" onClick={add_project}>Add Project</Button>
                        </div>
                        <div class="project_authlist_container">
                            <TextField required id="userid_textfield" label="UserID" />
                            <Button variant="contained" onClick={add_to_authlist}>Add User</Button>
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
