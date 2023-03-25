import '../css/ProjectManager.css';

import { useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import Project from '../components/Project'
import HWSet from '../components/HWSet';


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

                <div className='resource_management_section'>

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
