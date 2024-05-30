import { Datagrid, List, ReferenceField, TextField } from "react-admin";

export const UnitsList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="description" />
        <ReferenceField reference="courses" source="courseId" />
        <TextField source="order" />
      </Datagrid>
    </List>
  );
};
