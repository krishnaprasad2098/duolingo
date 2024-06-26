"use client";

import { courses, userProgress } from "@/db/schema";
import React, { useTransition } from "react";
import Card from "./card";
import { useRouter } from "next/navigation";
import { upsertUserProgress } from "@/actions/user-progress";
import { toast } from "sonner";

type Props = {
  courses: (typeof courses.$inferSelect)[];
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};

const List = ({ courses, activeCourseId }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onClick = (id: number) => {
    if (pending) return;

    if (id === activeCourseId) {
      return router.push("/learn");
    }
    startTransition(() => {
      upsertUserProgress(id).catch(() => toast.error("Something Went Wrong"));
    });
  };

  return (
    <div className="grid grid-cols-2 gap-2 pt-6 sm:pb-4 md:grid-cols-3 lg:min-w-[217px] lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] lg:gap-4">
      {courses.map((course) => {
        return (
          <Card
            key={course.id}
            id={course.id}
            title={course.title}
            imageSrc={course.imageSrc}
            onClick={onClick}
            disabled={pending}
            active={course.id === activeCourseId}
          />
        );
      })}
    </div>
  );
};

export default List;
