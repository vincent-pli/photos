import React from 'react';
import {
    Show,
    ShowButton,
    SimpleShowLayout,
    RichTextField,
    DateField,
    List,
    Edit,
    Create,
    Datagrid,
    ReferenceField,
    TextField,
    EditButton,
    DisabledInput,
    LongTextInput,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextInput,
    Filter,
    SelectArrayInput,
} from 'react-admin';

import GridList from './GridList';
import Photo from './Photo';
import {DATE, PLACE, PERSON} from './constant';


const PostFilter = props => (
    <Filter {...props}>
        <TextInput label="查询" source="q" alwaysOn />
        <TextInput label="时间" source="date" defaultValue="" />
        <SelectInput label="地点" source="place" choices={PLACE} />
        <SelectInput label="人物" source="person" choices={PERSON} />
    </Filter>
);

export class PostList extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <List {...this.props} filters={<PostFilter />}>
                <GridList/>
            </List>
        );
    }
};


const PostTitle = ({ record }) => {
    return <span>Post {record ? `"${record.name}"` : ''}</span>;
};

export const PostEdit = props => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
            <Photo/>
            <SelectInput label="时间" source="date" choices={DATE} />
            <SelectInput label="地点" source="place" choices={PLACE} />
            <SelectArrayInput label="人物" source="person" choices={PERSON} />
            <LongTextInput label="描述" source="describtion" />
        </SimpleForm>
    </Edit>
);

export const PostShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="title" />
            <TextField source="teaser" />
            <RichTextField source="body" />
            <DateField label="Publication date" source="created_at" />
        </SimpleShowLayout>
    </Show>
);
