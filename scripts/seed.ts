import "dotenv/config";

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userSubscription);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Spanish",
        imageSrc: "/es.svg",
      },
      {
        id: 2,
        title: "Italian",
        imageSrc: "/it.svg",
      },
      {
        id: 3,
        title: "French",
        imageSrc: "/fr.svg",
      },
      {
        id: 4,
        title: "Croatian",
        imageSrc: "/hr.svg",
      },
      {
        id: 5,
        title: "Japanese",
        imageSrc: "/jp.svg",
      },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1, //Spanish
        title: "Unit 1",
        description: "Learn the basics of Spanish",
        order: 1,
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1, //unit 1 (learn the basics)
        order: 1,
        title: "Nouns",
      },
      {
        id: 2,
        unitId: 1, //unit 1 (learn the basics)
        order: 2,
        title: "Pronouns",
      },
      {
        id: 3,
        unitId: 1, //unit 1 (learn the basics)
        order: 3,
        title: "Adjectives",
      },
      {
        id: 4,
        unitId: 1, //unit 1 (learn the basics)
        order: 4,
        title: "Verb",
      },
      {
        id: 5,
        unitId: 1, //unit 1 (learn the basics)
        order: 5,
        title: "Adverb",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1, //Nouns
        type: "SELECT",
        order: 1,
        question: 'Which one of these is the"the man"?',
      },
      {
        id: 2,
        lessonId: 1, //Nouns
        type: "ASSIST",
        order: 2,
        question: '"the man"',
      },
      {
        id: 3,
        lessonId: 1, //Nouns
        type: "SELECT",
        order: 3,
        question: 'Which one of these is "the robot"',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1,
        imageSrc: "/man.svg",
        correct: true,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 1,
        imageSrc: "/women.svg",
        correct: false,
        text: "la mujer",
        audioSrc: "/es_women.mp3",
      },
      {
        challengeId: 1,
        imageSrc: "/robot.svg",
        correct: false,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
    ]);
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 2,
        correct: true,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 2,
        correct: false,
        text: "la mujer",
        audioSrc: "/es_women.mp3",
      },
      {
        challengeId: 2,
        correct: false,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
    ]);
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 3,
        imageSrc: "/man.svg",
        correct: false,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 3,
        imageSrc: "/women.svg",
        correct: false,
        text: "la mujer",
        audioSrc: "/es_women.mp3",
      },
      {
        challengeId: 3,
        imageSrc: "/robot.svg",
        correct: true,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 4,
        lessonId: 2, //pronouns
        type: "SELECT",
        order: 4,
        question: 'Which one of these is the"the man"?',
      },
      {
        id: 5,
        lessonId: 2, //pronouns
        type: "ASSIST",
        order: 5,
        question: '"the man"',
      },
      {
        id: 6,
        lessonId: 2, //pronouns
        type: "SELECT",
        order: 6,
        question: 'Which one of these is "the robot"',
      },
    ]);
    console.log("Seeding Completed");
  } catch (error) {
    console.log("error");
    throw new Error("Failed to seed Database");
  }
};

main();
