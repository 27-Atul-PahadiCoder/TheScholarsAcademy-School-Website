import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Trophy, Zap } from "lucide-react";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";
import { Progress } from "../../ui/progress";

interface MathGameProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

interface Question {
  num1: number;
  num2: number;
  operator: "+" | "-" | "×" | "÷";
  answer: number;
}

export function MathGame({ onComplete, onBack }: MathGameProps) {
  const [question, setQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);

  const totalQuestions = 10;

  useEffect(() => {
    generateQuestion();
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeout();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver, questionNumber]);

  const generateQuestion = () => {
    const operators: Array<"+" | "-" | "×" | "÷"> = ["+", "-", "×", "÷"];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let num1, num2, answer;

    switch (operator) {
      case "+":
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 50) + 1;
        answer = num1 + num2;
        break;
      case "-":
        num1 = Math.floor(Math.random() * 50) + 20;
        num2 = Math.floor(Math.random() * num1);
        answer = num1 - num2;
        break;
      case "×":
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
        answer = num1 * num2;
        break;
      case "÷":
        num2 = Math.floor(Math.random() * 10) + 2;
        answer = Math.floor(Math.random() * 10) + 1;
        num1 = num2 * answer;
        break;
    }

    setQuestion({ num1, num2, operator, answer });
    setUserAnswer("");
    setFeedback(null);
    setTimeLeft(30);
  };

  const handleTimeout = () => {
    setFeedback("wrong");
    setStreak(0);

    setTimeout(() => {
      if (questionNumber >= totalQuestions) {
        endGame();
      } else {
        setQuestionNumber(questionNumber + 1);
        generateQuestion();
      }
    }, 1000);
  };

  const handleSubmit = () => {
    if (!question || userAnswer === "") return;

    const isCorrect = parseInt(userAnswer) === question.answer;

    if (isCorrect) {
      setFeedback("correct");
      const bonusPoints = Math.floor(timeLeft / 5);
      const points = 10 + bonusPoints;
      setScore(score + points);
      setStreak(streak + 1);
    } else {
      setFeedback("wrong");
      setStreak(0);
    }

    setTimeout(() => {
      if (questionNumber >= totalQuestions) {
        endGame();
      } else {
        setQuestionNumber(questionNumber + 1);
        generateQuestion();
      }
    }, 1500);
  };

  const endGame = () => {
    setGameOver(true);
    onComplete(score);
  };

  if (gameOver) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="container mx-auto px-4 py-8 max-w-2xl"
      >
        <Card
          className="p-9 md:p-10 text-center"
          style={{
            background:
              "linear-gradient(135deg, #eff6ff 0%, #e0f2fe 40%, #ede9fe 100%)",
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex p-6 rounded-full mb-6"
            style={{
              background:
                "linear-gradient(135deg, #facc15 0%, #f97316 50%, #ea580c 100%)",
            }}
          >
            <Trophy className="w-20 h-20 text-white" />
          </motion.div>

          <h2 className="text-4xl text-gray-900 mb-4">Game Complete!</h2>
          <p className="text-xl text-gray-600 mb-6">
            You earned {score} points!
          </p>

          <div className="space-y-2 mb-8">
            <div className="flex justify-between text-gray-700">
              <span>Questions Answered:</span>
              <span>{totalQuestions}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Total Score:</span>
              <span className="text-2xl text-purple-600">{score}</span>
            </div>
          </div>

          <div className="flex gap-5">
            <Button
              onClick={onBack}
              variant="outline"
              className="flex-1 px-6 py-3"
            >
              Back to Games
            </Button>
            <Button
              onClick={() => {
                setScore(0);
                setQuestionNumber(1);
                setGameOver(false);
                setStreak(0);
                generateQuestion();
              }}
              className="flex-1 px-6 py-3 text-white"
              style={{
                background:
                  "linear-gradient(90deg, #3b82f6 0%, #6366f1 50%, #4f46e5 100%)",
              }}
            >
              Play Again
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  if (!question) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8 max-w-2xl"
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full">
            <Trophy className="w-5 h-5 text-purple-600" />
            <span className="text-purple-900">{score}</span>
          </div>

          {streak > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full"
            >
              <Zap className="w-5 h-5 text-orange-600 fill-orange-600" />
              <span className="text-orange-900">{streak} Streak!</span>
            </motion.div>
          )}
        </div>

        <div className="text-gray-600">
          Question {questionNumber}/{totalQuestions}
        </div>
      </div>

      {/* Timer */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Time Left</span>
          <span
            className={`text-sm ${
              timeLeft <= 10 ? "text-red-600" : "text-gray-900"
            }`}
          >
            {timeLeft}s
          </span>
        </div>
        <Progress
          value={(timeLeft / 30) * 100}
          className={timeLeft <= 10 ? "bg-red-100" : ""}
        />
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={questionNumber}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
        >
          <Card
            className="p-8 md:p-12 text-white mx-2 my-2"
            style={{
              background:
                "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #4f46e5 100%)",
            }}
          >
            <div className="text-center">
              <motion.div
                className="text-6xl md:text-8xl mb-8 space-x-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
              >
                <span>{question.num1}</span>
                <span>{question.operator}</span>
                <span>{question.num2}</span>
                <span>=</span>
                <span>?</span>
              </motion.div>

              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="Your answer"
                className="w-full max-w-xs text-center text-4xl p-4 rounded-2xl border-4 border-white/30 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white/50"
                disabled={feedback !== null}
                autoFocus
              />

              {feedback === null && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="mt-8"
                >
                  <Button
                    onClick={handleSubmit}
                    disabled={userAnswer === ""}
                    size="lg"
                    className="bg-white text-purple-600 hover:bg-gray-100 px-12 rounded-full text-xl mx-1 my-1"
                  >
                    Submit Answer
                  </Button>
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="p-12 rounded-3xl"
              style={{
                background:
                  feedback === "correct"
                    ? "linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #0f766e 100%)"
                    : "linear-gradient(135deg, #f97316 0%, #ef4444 50%, #be123c 100%)",
              }}
            >
              {feedback === "correct" ? (
                <>
                  <CheckCircle className="w-32 h-32 text-white mx-auto mb-4" />
                  <p className="text-4xl text-white text-center">Correct! 🎉</p>
                </>
              ) : (
                <>
                  <XCircle className="w-32 h-32 text-white mx-auto mb-4" />
                  <p className="text-4xl text-white text-center mb-2">Oops!</p>
                  <p className="text-xl text-white text-center">
                    The answer was {question.answer}
                  </p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}