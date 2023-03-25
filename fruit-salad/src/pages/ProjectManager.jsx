import '../css/ProjectManager.css';

import { useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import Project from '../components/Project'
import HWSet from '../components/HWSet';

import { TextField } from '@mui/material';

function ProjectManager(){

    const location = useLocation();

    const [project_list, set_project_list] = useState([]);
    const [active_project, set_active_project] = useState("");

    const get_projects = useCallback(async () => {
        const response = await fetch('/projects?userid='+location.state.userid);
        const response_body = await response.json();
        if(response.status !== 200){ return []; }
        return response_body;
    }, [location.state.userid]); 

    useEffect(() => {

        get_projects().then((projects) => {
            set_project_list(projects);
        });

    }, [get_projects]);
    
    const project_list_elements = project_list.map((project) => (
        <Project key={project['pid']} pid={project['pid']} manage_state_function={set_active_project} name={project['name']} authlist={project['authlist'].join(", ")} />
    ));

    return(
        <div>

            <h1>Welcome, {location.state.userid}!</h1>

            <div className="project_manager_container">

                <div className="user_projects_container">
                    {project_list_elements}
                </div>

                <div className='resource_management_section'>

                    <h2>resource management</h2>
                    
                    {active_project === "" ?
                        <p>No project selected</p> :
                        <p>Currently managing <strong>{active_project}</strong></p>
                    }

                    <div>
                        <HWSet name="HWSet1" />
                        <HWSet name="HWSet2" />
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
