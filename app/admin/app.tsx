"use client";

import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { CourseList } from "./course/list";
import { CourseCreate } from "./course/create";
import { CourseEdit } from "./course/edit";
import { UnitsList } from "./units/list";
import { UnitCreate } from "./units/create";
import { UnitEdit } from "./units/edit";
import { LessonList } from "./lesson/list";
import { LessonEdit } from "./lesson/edit";
import { LessonCreate } from "./lesson/create";
import { ChallengeList } from "./challenge/list";
import { ChallengeCreate } from "./challenge/create";
import { ChallengeEdit } from "./challenge/edit";
import { ChallengeOptionList } from "./challengeOption/list";
import { ChallengeOptionCreate } from "./challengeOption/create";
import { ChallengeOptionEdit } from "./challengeOption/edit";

const dataProvider = simpleRestProvider("/api");

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="courses"
        list={CourseList}
        create={CourseCreate}
        edit={CourseEdit}
        recordRepresentation="title"
      />
      <Resource
        name="units"
        list={UnitsList}
        create={UnitCreate}
        edit={UnitEdit}
        recordRepresentation="title"
      />
      <Resource
        name="lessons"
        list={LessonList}
        create={LessonCreate}
        edit={LessonEdit}
        recordRepresentation="title"
      />
      <Resource
        name="challenges"
        list={ChallengeList}
        create={ChallengeCreate}
        edit={ChallengeEdit}
        recordRepresentation="question"
      />
      <Resource
        name="challengeOptions"
        list={ChallengeOptionList}
        create={ChallengeOptionCreate}
        edit={ChallengeOptionEdit}
        recordRepresentation="text"
      />
    </Admin>
  );
};

export default App;
