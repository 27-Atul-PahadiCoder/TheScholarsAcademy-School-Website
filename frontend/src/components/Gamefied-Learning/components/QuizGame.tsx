import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Trophy, Lightbulb } from "lucide-react";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";
import { Progress } from "../../ui/progress";

interface QuizGameProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizQuestions: Question[] = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
    explanation: "Paris is the capital and largest city of France!",
  },
  {
    question: "How many continents are there on Earth?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2,
    explanation:
      "There are 7 continents: Africa, Antarctica, Asia, Europe, North America, Oceania, and South America.",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 2,
    explanation: "Jupiter is the largest planet in our solar system!",
  },
  {
    question: "What is 12 × 12?",
    options: ["124", "144", "154", "134"],
    correctAnswer: 1,
    explanation: "12 × 12 = 144",
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correctAnswer: 2,
    explanation:
      "Plants absorb carbon dioxide (CO₂) and release oxygen through photosynthesis.",
  },
  {
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctAnswer: 2,
    explanation:
      "2 is the smallest prime number and the only even prime number.",
  },
  {
    question: "How many sides does a hexagon have?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 1,
    explanation: "A hexagon has 6 sides.",
  },
  {
    question: "What is the boiling point of water at sea level?",
    options: ["90°C", "100°C", "110°C", "120°C"],
    correctAnswer: 1,
    explanation: "Water boils at 100°C (212°F) at sea level.",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: [
      "Charles Dickens",
      "William Shakespeare",
      "Mark Twain",
      "Jane Austen",
    ],
    correctAnswer: 1,
    explanation:
      "William Shakespeare wrote the famous tragedy 'Romeo and Juliet'.",
  },
  {
    question: "What is the closest star to Earth?",
    options: ["Alpha Centauri", "Sirius", "The Sun", "Proxima Centauri"],
    correctAnswer: 2,
    explanation:
      "The Sun is the closest star to Earth, at about 93 million miles away.",
  },
];

export function QuizGame({ onComplete, onBack }: QuizGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswerSelect = (index: number) => {
    if (answered) return;

    setSelectedAnswer(index);
    setAnswered(true);
    setShowFeedback(true);

    if (index === question.correctAnswer) {
      setScore(score + 15);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setAnswered(false);
    } else {
      setGameOver(true);
      onComplete(score);
    }
  };

  if (gameOver) {
    const percentage = Math.round((score / (quizQuestions.length * 15)) * 100);

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
              "linear-gradient(135deg, #ecfdf5 0%, #e0f2fe 40%, #dcfce7 100%)",
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex p-6 rounded-full mb-6"
            style={{
              background:
                "linear-gradient(135deg, #22c55e 0%, #10b981 50%, #0ea5e9 100%)",
            }}
          >
            <Trophy className="w-20 h-20 text-white" />
          </motion.div>

          <h2 className="text-4xl text-gray-900 mb-4">Quiz Complete! 🎓</h2>
          <p className="text-xl text-gray-600 mb-6">
            You earned {score} points!
          </p>

          <div className="mb-8">
            <div className="text-6xl mb-4">
              {percentage >= 80 ? "🌟" : percentage >= 60 ? "😊" : "💪"}
            </div>
            <p className="text-2xl text-gray-700 mb-2">{percentage}% Correct</p>
            <p className="text-gray-600">
              {percentage >= 80
                ? "Outstanding! You're a quiz master!"
                : percentage >= 60
                ? "Great job! Keep it up!"
                : "Good effort! Practice makes perfect!"}
            </p>
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
                setCurrentQuestion(0);
                setSelectedAnswer(null);
                setScore(0);
                setShowFeedback(false);
                setAnswered(false);
                setGameOver(false);
              }}
              className="flex-1 px-6 py-3 text-white"
              style={{
                background:
                  "linear-gradient(90deg, #22c55e 0%, #10b981 50%, #0ea5e9 100%)",
              }}
            >
              Play Again
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8 max-w-3xl"
    >
      <div
        className="rounded-3xl p-7 md:p-10 border border-emerald-100"
        style={{
          background:
            "linear-gradient(135deg, #ecfdf5 0%, #e0f2fe 40%, #e0f2fe 100%)",
          boxShadow: "0 18px 45px rgba(15, 23, 42, 0.16)",
        }}
      >
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
            <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
              <Trophy className="w-5 h-5 text-green-600" />
              <span className="text-green-900">{score} points</span>
            </div>
          </div>
          <Progress value={progress} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
          >
            {/* Question Card */}
            <Card
              className="p-7 md:p-9 mb-7 mx-2 my-2"
              style={{
                background:
                  "linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #059669 100%)",
              }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-2xl md:text-3xl text-white">
                    {question.question}
                  </p>
                </div>
              </div>
            </Card>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correctAnswer;
                const showResult = answered && (isSelected || isCorrect);

                let bgColor = "bg-white hover:bg-gray-50";
                let borderColor = "border-gray-200";

                if (showResult) {
                  if (isCorrect) {
                    bgColor = "bg-green-100";
                    borderColor = "border-green-500";
                  } else if (isSelected && !isCorrect) {
                    bgColor = "bg-red-100";
                    borderColor = "border-red-500";
                  }
                }

                return (
                  <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={!answered ? { scale: 1.02 } : {}}
                    whileTap={!answered ? { scale: 0.98 } : {}}
                  >
                    <Card
                      className={`p-6 md:p-7 cursor-pointer border-2 transition-all mx-1 my-1 ${bgColor} ${borderColor} ${
                        answered ? "cursor-default" : ""
                      }`}
                      onClick={() => handleAnswerSelect(index)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg text-gray-900">{option}</span>
                        {showResult && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            {isCorrect ? (
                              <CheckCircle className="w-6 h-6 text-green-600" />
                            ) : isSelected ? (
                              <XCircle className="w-6 h-6 text-red-600" />
                            ) : null}
                          </motion.div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Explanation */}
            {showFeedback && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="mb-6"
              >
                <Card className="p-5 bg-white/90 border border-emerald-100 flex items-start gap-4 mx-2 my-2">
                  <div
                    className={`p-2 rounded-xl ${
                      selectedAnswer === question.correctAnswer
                        ? "bg-green-100 text-green-700"
                        : "bg-sky-100 text-sky-700"
                    }`}
                  >
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold mb-1">
                      {selectedAnswer === question.correctAnswer
                        ? "🎉 Correct!"
                        : "💡 Did you know?"}
                    </p>
                    <p className="text-gray-700">{question.explanation}</p>
                  </div>
                </Card>
              </motion.div>
            )}

            <div className="text-center">
              <Button
                onClick={handleNext}
                size="lg"
                className="px-12 py-3 text-white mx-1 my-1"
                style={{
                  background:
                    "linear-gradient(90deg, #22c55e 0%, #16a34a 50%, #059669 100%)",
                }}
              >
                {currentQuestion < quizQuestions.length - 1
                  ? "Next Question"
                  : "See Results"}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
