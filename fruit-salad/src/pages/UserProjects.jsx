import '../css/UserProjects.css';

import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function UserProjects(){

    const {state} = useLocation();

    const [project_list, set_project_list] = useState([]);


    return(
        <div className="user_projects_container">
            <h1>Welcome, {state.userid}!</h1>
        </div>
    );
}

export default UserProjects;
