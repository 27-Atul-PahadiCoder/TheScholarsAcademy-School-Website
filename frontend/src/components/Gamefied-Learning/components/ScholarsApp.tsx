import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Star,
  Brain,
  Gamepad2,
  Book,
  Award,
  Zap,
  Target,
  Sparkles,
  ChevronRight,
  Home,
  ArrowLeft,
  Volume2,
  VolumeX,
} from "lucide-react";
import { MathGame } from "./MathGame";
import { MemoryGame } from "./MemoryGame";
import { QuizGame } from "./QuizGame";
import { WordPuzzle } from "./WordPuzzle";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";
import { Progress } from "../../ui/progress";

type Screen =
  | "home"
  | "games"
  | "math"
  | "memory"
  | "quiz"
  | "word"
  | "achievements";

function ScholarsApp() {
  const [screen, setScreen] = useState<Screen>("home");
  const [navigationHistory, setNavigationHistory] = useState<Screen[]>([]);
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const [achievements, setAchievements] = useState<string[]>([]);

  // Custom setScreen function to manage history
  const navigateTo = (newScreen: Screen) => {
    if (newScreen !== screen) {
      setNavigationHistory((prevHistory) => [...prevHistory, screen]);
      setScreen(newScreen);
    }
  };

  const navigateBack = () => {
    if (navigationHistory.length > 0) {
      const prevScreen = navigationHistory[navigationHistory.length - 1];
      setNavigationHistory((prevHistory) => prevHistory.slice(0, -1));
      setScreen(prevScreen);
    } else {
      // If history is empty, go to home
      setScreen("home");
    }
  };

  useEffect(() => {
    // Load saved progress from localStorage
    const savedPoints = localStorage.getItem("scholarPoints");
    const savedLevel = localStorage.getItem("scholarLevel");
    const savedStreak = localStorage.getItem("scholarStreak");
    const savedAchievements = localStorage.getItem("scholarAchievements");

    if (savedPoints) setPoints(parseInt(savedPoints));
    if (savedLevel) setLevel(parseInt(savedLevel));
    if (savedStreak) setStreak(parseInt(savedStreak));
    if (savedAchievements) setAchievements(JSON.parse(savedAchievements));
  }, []);

  useEffect(() => {
    // Save progress
    localStorage.setItem("scholarPoints", points.toString());
    localStorage.setItem("scholarLevel", level.toString());
    localStorage.setItem("scholarStreak", streak.toString());
    localStorage.setItem("scholarAchievements", JSON.stringify(achievements));

    // Level up logic
    if (points >= level * 100) {
      setLevel(level + 1);
      addAchievement(`Level ${level + 1} Unlocked!`);
    }
  }, [points, level, streak, achievements]);

  const addPoints = (newPoints: number) => {
    setPoints(points + newPoints);
    setStreak(streak + 1);
  };

  const addAchievement = (achievement: string) => {
    if (!achievements.includes(achievement)) {
      setAchievements([...achievements, achievement]);
    }
  };

  const games = [
    {
      id: "math",
      title: "Math Challenge",
      description: "Solve math problems and boost your skills!",
      icon: Brain,
      gradient: "linear-gradient(135deg, #3b82f6, #6366f1)",
      screen: "math" as Screen,
    },
    {
      id: "memory",
      title: "Memory Match",
      description: "Match pairs and train your memory!",
      icon: Sparkles,
      gradient: "linear-gradient(135deg, #ec4899, #a855f7)",
      screen: "memory" as Screen,
    },
    {
      id: "quiz",
      title: "Quiz Master",
      description: "Answer questions and show your knowledge!",
      icon: Book,
      gradient: "linear-gradient(135deg, #22c55e, #0ea5e9)",
      screen: "quiz" as Screen,
    },
    {
      id: "word",
      title: "Word Puzzle",
      description: "Find hidden words and expand vocabulary!",
      icon: Target,
      gradient: "linear-gradient(135deg, #f97316, #ef4444)",
      screen: "word" as Screen,
    },
  ];

  const achievementsList = [
    {
      name: "First Steps",
      description: "Earn your first 10 points",
      requirement: 10,
    },
    { name: "Quick Learner", description: "Reach Level 3", requirement: 3 },
    { name: "Star Student", description: "Earn 500 points", requirement: 500 },
    {
      name: "Streak Master",
      description: "Get a 10-game streak",
      requirement: 10,
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ margin: "0.5%", padding: "0.5%" }}
          >
            {screen !== "home" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={navigateBack}
                data-testid="back-button"
              >
                {screen === "games" ? (
                  <Home className="w-5 h-5" />
                ) : (
                  <ArrowLeft className="w-5 h-5" />
                )}
              </Button>
            )}
            <Sparkles className="w-8 h-8 text-purple-600" />
            <span className="text-xl text-purple-900">
              Scholars Play & Learn
            </span>
          </motion.div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSoundOn(!soundOn)}
            >
              {soundOn ? (
                <Volume2 className="w-5 h-5" />
              ) : (
                <VolumeX className="w-5 h-5" />
              )}
            </Button>

            <motion.div
              className="flex items-center gap-2 bg-yellow-100 px-3 py-1.5 rounded-full"
              whileHover={{ scale: 1.05 }}
              style={{ margin: "0.5%", padding: "0.5%" }}
            >
              <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
              <span className="text-yellow-900">{points}</span>
            </motion.div>

            <motion.div
              className="flex items-center gap-2 bg-purple-100 px-3 py-1.5 rounded-full"
              whileHover={{ scale: 1.05 }}
              style={{ margin: "0.5%", padding: "0.5%" }}
            >
              <Trophy className="w-5 h-5 text-purple-600 fill-purple-600" />
              <span className="text-purple-900">Lv {level}</span>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Floating playful background shapes */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-24 -left-16 w-64 h-64 bg-sky-200 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-72 h-72 bg-pink-200 rounded-full blur-3xl" />
        <div className="absolute bottom-[-6rem] left-1/2 -translate-x-1/2 w-80 h-80 bg-purple-200 rounded-full blur-3xl" />
      </div>

      {/* Main animated content */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {screen === "home" && (
            <HomeScreen
              key="home"
              onNavigate={navigateTo}
              points={points}
              level={level}
              streak={streak}
            />
          )}

          {screen === "games" && (
            <GamesScreen key="games" games={games} onSelectGame={navigateTo} />
          )}

          {screen === "math" && (
            <MathGame
              key="math"
              onComplete={addPoints}
              onBack={() => navigateTo("games")}
            />
          )}

          {screen === "memory" && (
            <MemoryGame
              key="memory"
              onComplete={addPoints}
              onBack={() => navigateTo("games")}
            />
          )}

          {screen === "quiz" && (
            <QuizGame
              key="quiz"
              onComplete={addPoints}
              onBack={() => navigateTo("games")}
            />
          )}

          {screen === "word" && (
            <WordPuzzle
              key="word"
              onComplete={addPoints}
              onBack={() => navigateTo("games")}
            />
          )}

          {screen === "achievements" && (
            <AchievementsScreen
              key="achievements"
              achievements={achievementsList}
              unlockedAchievements={achievements}
              points={points}
              level={level}
              streak={streak}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function HomeScreen({
  onNavigate,
  points,
  level,
  streak,
}: {
  onNavigate: (screen: Screen) => void;
  points: number;
  level: number;
  streak: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8 max-w-6xl"
      style={{ margin: "2% auto", padding: "0.5%", maxWidth: "70%" }}
    >
      {/* Hero Section */}
      <motion.div
        className="overflow-hidden shadow-2xl mb-10"
        style={{
          borderRadius: "32px",
          background:
            "linear-gradient(90deg, #7B2CFF 0%, #D41EF3 50%, #FF1476 100%)",
          margin: "0.5%",
          padding: "0.5%",
        }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="grid md:grid-cols-2 gap-10 p-8 md:p-12 items-stretch">
          <div className="flex flex-col justify-center space-y-6 md:space-y-7 text-white max-w-xl">
            <motion.h1
              className="text-4xl md:text-5xl font-semibold tracking-tight"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Learn Through Play!
            </motion.h1>
            <div className="text-3xl mt-1">🎮</div>
            <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-md mt-1">
              Join thousands of students in making learning fun and exciting!
            </p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="pt-2 md:pt-4"
            >
              <Button
                size="lg"
                className="rounded-full px-8 md:px-10 py-3 md:py-4 shadow-lg text-base md:text-lg flex items-center gap-2 backdrop-blur-md bg-black/80 hover:bg-black/90 text-white mx-1 my-1"
                onClick={() => onNavigate("games")}
              >
                <span>Start Playing</span>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>

          <div className="relative flex items-center justify-center h-64 md:h-auto">
            <div
              className="p-3 md:p-4"
              style={{
                borderRadius: "32px",
                backgroundColor: "#FF1E3A",
                boxShadow: "0 18px 45px rgba(0, 0, 0, 0.35)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1647621129185-cc09bc212ff1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNoaWxkcmVuJTIwbGVhcm5pbmd8ZW58MXx8fHwxNzY1MzM5NDk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Happy children learning"
                className="w-full h-full object-cover rounded-3xl min-h-[220px]"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ margin: "0.5%", padding: "0.5%" }}
        >
          <Card
            className="p-7 md:p-8 border-0 text-white mx-2 my-2"
            style={{
              background:
                "linear-gradient(135deg, #facc15 0%, #f97316 50%, #f97316 100%)",
            }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur">
                <Star className="w-8 h-8 fill-white" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Total Points</p>
                <p className="text-3xl">{points}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ margin: "0.5%", padding: "0.5%" }}
        >
          <Card
            className="p-7 md:p-8 border-0 text-white mx-2 my-2"
            style={{
              background:
                "linear-gradient(135deg, #a855f7 0%, #4f46e5 50%, #312e81 100%)",
            }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur">
                <Trophy className="w-8 h-8 fill-white" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Current Level</p>
                <p className="text-3xl">{level}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ margin: "0.5%", padding: "0.5%" }}
        >
          <Card
            className="p-7 md:p-8 border-0 text-white mx-2 my-2"
            style={{
              background:
                "linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)",
            }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur">
                <Zap className="w-8 h-8 fill-white" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Win Streak</p>
                <p className="text-3xl">{streak}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-10">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ margin: "0.5%", padding: "0.5%" }}
        >
          <Card
            className="p-9 md:p-10 cursor-pointer bg-white hover:shadow-xl transition-shadow mx-2 my-2"
            onClick={() => onNavigate("games")}
          >
            <div className="flex items-center gap-4">
              <div
                className="p-4 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
                }}
              >
                <Gamepad2 className="w-12 h-12 text-white" />
              </div>
              <div>
                <h3 className="text-2xl text-gray-900 mb-1">Play Games</h3>
                <p className="text-gray-600">Choose from 4 exciting games</p>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400 ml-auto" />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ margin: "0.5%", padding: "0.5%" }}
        >
          <Card
            className="p-9 md:p-10 cursor-pointer bg-white hover:shadow-xl transition-shadow mx-2 my-2"
            onClick={() => onNavigate("achievements")}
          >
            <div className="flex items-center gap-4">
              <div
                className="p-4 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, #ec4899 0%, #e11d48 100%)",
                }}
              >
                <Award className="w-12 h-12 text-white" />
              </div>
              <div>
                <h3 className="text-2xl text-gray-900 mb-1">Achievements</h3>
                <p className="text-gray-600">View your progress & rewards</p>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400 ml-auto" />
            </div>
          </Card>
        </motion.div>
      </div>

      {/* School Motto Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10 bg-white rounded-3xl p-9 md:p-10 shadow-lg mx-2 my-2"
        style={{ margin: "0.5%", padding: "0.5%" }}
      >
        <h2 className="text-3xl text-center text-gray-900 mb-4">
          "Excellence Through Knowledge & Character"
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          At Scholars Pithoragarh, we believe in nurturing young minds through
          innovative learning methods. Our gamified platform makes education
          engaging, interactive, and fun!
        </p>
      </motion.div>
    </motion.div>
  );
}

function GamesScreen({
  games,
  onSelectGame,
}: {
  games: Array<{
    id: string;
    title: string;
    description: string;
    icon: any;
    gradient: string;
    screen: Screen;
  }>;
  onSelectGame: (screen: Screen) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8 max-w-6xl"
      style={{ margin: "2% auto", padding: "0.5%", maxWidth: "70%" }}
    >
      <motion.h2
        className="text-4xl text-center text-gray-900 mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Choose Your Adventure! 🎯
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ margin: "0.5%", padding: "0.5%" }}
          >
            <Card
              className="p-8 cursor-pointer bg-white hover:shadow-2xl transition-all overflow-hidden group relative mx-2 my-2"
              onClick={() => onSelectGame(game.screen)}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                style={{ backgroundImage: game.gradient }}
              />

              <div className="relative z-10">
                <div
                  className="inline-flex p-4 rounded-2xl mb-4"
                  style={{ backgroundImage: game.gradient }}
                >
                  <game.icon className="w-10 h-10 text-white" />
                </div>

                <h3 className="text-2xl text-gray-900 mb-2">{game.title}</h3>
                <p className="text-gray-600 mb-4">{game.description}</p>

                <div className="flex items-center text-purple-600 group-hover:translate-x-2 transition-transform">
                  <span>Play Now</span>
                  <ChevronRight className="w-5 h-5 ml-1" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function AchievementsScreen({
  achievements,
  unlockedAchievements,
  points,
  level,
  streak,
}: {
  achievements: Array<{
    name: string;
    description: string;
    requirement: number;
  }>;
  unlockedAchievements: string[];
  points: number;
  level: number;
  streak: number;
}) {
  const isUnlocked = (achievement: any) => {
    if (achievement.name === "First Steps" && points >= achievement.requirement)
      return true;
    if (
      achievement.name === "Quick Learner" &&
      level >= achievement.requirement
    )
      return true;
    if (
      achievement.name === "Star Student" &&
      points >= achievement.requirement
    )
      return true;
    if (
      achievement.name === "Streak Master" &&
      streak >= achievement.requirement
    )
      return true;
    return unlockedAchievements.includes(achievement.name);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8 max-w-4xl"
      style={{ margin: "2% auto", padding: "0.5%", maxWidth: "70%" }}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8"
        style={{ margin: "0.5%", padding: "0.5%" }}
      >
        <div
          className="inline-flex p-4 rounded-3xl mb-4"
          style={{
            background: "linear-gradient(135deg, #facc15 0%, #f97316 100%)",
          }}
        >
          <Trophy className="w-16 h-16 text-white" />
        </div>
        <h2 className="text-4xl text-gray-900 mb-2">Your Achievements</h2>
        <p className="text-gray-600">Keep playing to unlock more rewards!</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((achievement, index) => {
          const unlocked = isUnlocked(achievement);

          return (
            <motion.div
              key={achievement.name}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              style={{ margin: "4%", padding: "4%" }}
            >
              <Card
                className={`p-6 mx-2 my-2 ${
                  unlocked ? "border-yellow-200" : "bg-gray-50 border-gray-200"
                }`}
                style={
                  unlocked
                    ? {
                        background:
                          "linear-gradient(135deg, #fef9c3 0%, #ffedd5 100%)",
                      }
                    : undefined
                }
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-2xl ${
                      unlocked ? "" : "bg-gray-300"
                    }`}
                    style={
                      unlocked
                        ? {
                            background:
                              "linear-gradient(135deg, #facc15 0%, #f97316 100%)",
                          }
                        : undefined
                    }
                  >
                    <Award
                      className={`w-8 h-8 ${
                        unlocked ? "text-white" : "text-gray-500"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-xl mb-1 ${
                        unlocked ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {achievement.name}
                    </h3>
                    <p
                      className={`text-sm mb-2 ${
                        unlocked ? "text-gray-700" : "text-gray-400"
                      }`}
                    >
                      {achievement.description}
                    </p>
                    {!unlocked && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                          <span>Progress</span>
                          <span>
                            {Math.min(
                              100,
                              Math.round(
                                (points / achievement.requirement) * 100
                              )
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={Math.min(
                            100,
                            (points / achievement.requirement) * 100
                          )}
                        />
                      </div>
                    )}
                    {unlocked && (
                      <div className="flex items-center gap-1 text-yellow-600 mt-2">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm">Unlocked!</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default ScholarsApp;
