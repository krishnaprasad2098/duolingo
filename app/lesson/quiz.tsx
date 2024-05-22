"use client";

import { challengeOptions, challenges, userSubscription } from "@/db/schema";
import React, { useState, useTransition } from "react";
import Header from "./header";
import QuestionBubble from "./questionBubble";
import Challenge from "./challenge";
import Footer from "./footer";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { toast } from "sonner";
import { reduceHearts } from "@/actions/user-progress";
import { useAudio, useWindowSize, useMount } from "react-use";
import Image from "next/image";
import ResultCard from "./ResultCard";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { useHeartsModel } from "@/store/use-hearts-modal";
import { usePracticeModel } from "@/store/use-practice-modal";

type Props = {
  initialLessonId: number;
  initialPercentage: number;
  initialHearts: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
  userSubscription:
    | (typeof userSubscription.$inferSelect & {
        isActive: boolean;
      })
    | null;
};

const Quiz = ({
  initialLessonId,
  initialPercentage,
  initialHearts,
  initialLessonChallenges,
  userSubscription,
}: Props) => {
  const { open: openHeartsModal } = useHeartsModel();
  const { open: openPracticeModal } = usePracticeModel();
  useMount(() => {
    if (initialPercentage === 100) {
      openPracticeModal();
    }
  });

  const router = useRouter();
  const { width, height } = useWindowSize();

  const [correctAudio, _c, correctControls] = useAudio({ src: "/correct.wav" });
  const [inCorrectAudio, _i, inCorrectControls] = useAudio({
    src: "/incorrect.wav",
  });
  const [finishAudio] = useAudio({ src: "/finish.mp3", autoPlay: true });

  const [pending, startTransition] = useTransition();

  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(() => {
    return initialPercentage === 100 ? 0 : initialPercentage;
  });

  const [challenges] = useState(initialLessonChallenges);
  const [lessonId, setLessonId] = useState(initialLessonId);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed,
    );
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });
  const [selectedOption, setSelectedOption] = useState<number>();
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

  const onSelect = (id: number) => {
    if (status !== "none") return;
    setSelectedOption(id);
  };

  const challenge = challenges[activeIndex];

  const options = challenge?.challengeOptions ?? [];

  if (!challenge) {
    return (
      <>
        {finishAudio}
        <Confetti
          recycle={false}
          numberOfPieces={800}
          tweenDuration={10000}
          width={width}
          height={height}
        />
        <div className="mx-auto flex h-full max-w-lg flex-col items-center justify-center gap-y-4 text-center lg:gap-y-8 ">
          <Image
            src="/finish.svg"
            alt="Finished Challenges"
            className="hidden lg:block"
            width={100}
            height={100}
          />
          <Image
            src="/finish.svg"
            alt="Finished Challenges"
            className="block lg:hidden"
            width={100}
            height={100}
          />
          <p className="text-xl font-bold text-green-500 lg:text-3xl">
            Great job! <br /> You&apos;ve completed the lesson !!!
          </p>
          <div className="flex w-full items-center gap-x-4">
            <ResultCard variant="points" value={challenges.length * 10} />
            <ResultCard variant="hearts" value={hearts} />
          </div>
        </div>
        <Footer
          lessonId={lessonId}
          status="completed"
          onCheck={() => router.push("/learn")}
        />
      </>
    );
  }

  const title =
    challenge.type === "ASSIST"
      ? "Select the correct meaning"
      : challenge.question;
  const onNext = () => {
    return setActiveIndex((current) => current + 1);
  };
  const onContinue = () => {
    if (!selectedOption) return;
    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }
    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    const correctOption = options.find((option) => option.correct);
    if (!correctOption) {
      return;
    }

    if (correctOption && correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              console.error("Missing Hearts");
              openHeartsModal();
              return;
            }

            correctControls.play();
            setStatus("correct");
            setPercentage((prev) => prev + 100 / challenges.length);

            //This is practice
            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5));
            }
          })
          .catch(() => toast.error("Something went wrong.Please try again."));
      });
    } else {
      startTransition(() => {
        reduceHearts(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              console.error("Missing Hearts");
              openHeartsModal();
              return;
            }
            inCorrectControls.play();
            setStatus("wrong");
            if (!response?.error) {
              setHearts((prev) => Math.max(prev - 1, 0));
            }
          })
          .catch(() => toast.error("Something Went Wrong. Please try again."));
      });
    }
  };
  return (
    <>
      {inCorrectAudio}
      {correctAudio}
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
      <div className="flex-1">
        <div className="flex h-full items-center justify-center">
          <div className="flex w-full flex-col gap-y-12 px-6 lg:min-h-[350px] lg:w-[600px] lg:px-0">
            <h1 className="text-center text-lg font-bold text-neutral-700 lg:text-start lg:text-3xl">
              {title}
            </h1>
            <div>
              {challenge.type === "ASSIST" && (
                <QuestionBubble question={challenge.question} />
              )}
              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={pending}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={pending || !selectedOption}
        status={status}
        onCheck={onContinue}
      />
    </>
  );
};

export default Quiz;
