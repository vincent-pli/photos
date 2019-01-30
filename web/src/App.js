import React from 'react';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import { PostList, PostEdit, PostCreate, PostShow } from './posts';
import { UserList } from './users';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import simpleRestProvider from 'ra-data-simple-rest';

const App = () => (
    <Admin
        dataProvider={simpleRestProvider('api')}
        authProvider={authProvider}
        dashboard={Dashboard}   
    >
        <Resource
            name="photos"
            icon={PostIcon}
            list={PostList}
            edit={PostEdit}
        />
    </Admin>
);
export default App;
