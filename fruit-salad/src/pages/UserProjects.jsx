import '../css/UserProjects.css';

import { useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

function UserProjects(){

    const location = useLocation();

    const [project_list, set_project_list] = useState([]);

    const get_projects = useCallback(async () => {
        const response = await fetch('/projects?userid='+location.state.userid);
        const response_body = await response.json();
        if(response.status !== 200){ return []; }
        return response_body;
    }, [location.state.userid]); // empty dependency array means function won't change between renders

    // 2nd parameter in useEffect is an array of dependencies
    // determines when the effect will rerun
    // if not provided, run on every render
    // if empty array, only run once
    // if one or more value, will rerun whenever those values change
    useEffect(() => {

        get_projects().then((projects) => {
            set_project_list(projects);
        });
        
    }, [get_projects]);
    
    const project_list_elements = project_list.map((project) => (
        <p>{project['name']}</p>
    ));

    return(
        <div className="user_projects_container">
            <h1>Welcome, {location.state.userid}!</h1>
            {project_list_elements}
        </div>
    );
}

export default UserProjects;
