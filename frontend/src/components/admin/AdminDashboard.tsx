import { useState, useEffect } from "react";
import {
  Lock,
  Unlock,
  LogOut,
  Eye,
  EyeOff,
  Settings,
  ToggleRight,
  RotateCcw,
  Shield,
  Loader2,
} from "lucide-react";
import { useSuboptionLock } from "../../hooks/useSuboptionLock";
import {
  SUBOPTIONS_LOCKS,
  getSuboptionById,
} from "../../config/suboptionsLocks";
import { loginAdmin, logoutAdmin, hasAdminSession } from "../../api/admin";
import AdminMediaDashboard from "../MediaComponent/AdminMediaDashboard";

interface AdminStats {
  totalSuboptions: number;
  lockedCount: number;
  unlockedCount: number;
}

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(hasAdminSession());
  const [email, setEmail] = useState("founder@school.com");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const { unlock, lock, isUnlocked, getUnlockedState, resetAll } =
    useSuboptionLock();

  const allSuboptions = Object.values(SUBOPTIONS_LOCKS).flat();

  // Prevent right-click and dev tools access
  useEffect(() => {
    const preventDevTools = (e: any) => {
      if (e.keyCode === 123) {
        e.preventDefault(); // F12 key
      }
    };
    document.addEventListener("keydown", preventDevTools);
    return () => {
      document.removeEventListener("keydown", preventDevTools);
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      await loginAdmin(email, passwordInput);
      setIsAuthenticated(true);
      sessionStorage.setItem("admin-authenticated", "true");
      setPasswordInput("");
      setMessage("✓ Authentication successful!");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to login";
      setMessage(`✗ ${message}`);
    } finally {
      setAuthLoading(false);
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    setPasswordInput("");
    setMessage("Logged out successfully");
    setTimeout(() => setMessage(""), 2000);
  };

  const handleToggleSuboption = (suboptionId: string) => {
    const subitem = getSuboptionById(suboptionId);
    if (!subitem) return;

    const isCurrentlyUnlocked = isUnlocked(suboptionId);

    if (isCurrentlyUnlocked) {
      const success = lock(suboptionId, "admin-master-key-2024");
      if (success) {
        setMessage(`✓ Hidden: ${subitem.label}`);
      }
    } else {
      const success = unlock(suboptionId, subitem.secretKey);
      if (success) {
        setMessage(`✓ Visible: ${subitem.label}`);
      }
    }
    // Debug / feedback
    try {
      // eslint-disable-next-line no-console
      console.log("[AdminDashboard] toggled:", suboptionId, {
        wasUnlocked: isCurrentlyUnlocked,
        newUnlockedState: getUnlockedState()[suboptionId],
        localStorage: localStorage.getItem("scholar-academy-unlocks"),
      });
    } catch (e) {
      // ignore
    }
    setTimeout(() => setMessage(""), 2000);
  };

  const handleResetAll = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all suboptions to their default state?"
      )
    ) {
      const success = resetAll("admin-master-key-2024");
      if (success) {
        setMessage("✓ All suboptions reset to default state");
      } else {
        setMessage("✗ Failed to reset");
      }
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // Calculate statistics
  const stats: AdminStats = {
    totalSuboptions: allSuboptions.length,
    lockedCount: allSuboptions.filter((item) => !isUnlocked(item.id)).length,
    unlockedCount: allSuboptions.filter((item) => isUnlocked(item.id)).length,
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="backdrop-blur-xl bg-gray-900/70 border border-white/30 rounded-3xl shadow-2xl overflow-hidden hover:border-white/40 transition duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600/50 to-purple-600/50 backdrop-blur-md px-8 py-8 border-b border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-8 h-8 text-blue-300" />
                <h1 className="text-4xl font-extrabold text-black drop-shadow-lg">
                  Admin Dashboard
                </h1>
              </div>
              <p className="text-black text-xl font-bold">
                The Scholar's Academy Management Portal
              </p>
            </div>

            {/* Form */}
            <div className="px-8 py-8 bg-gray-800/50 backdrop-blur-md rounded-lg">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-lg font-bold text-black mb-2">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="enter@school.com"
                    className="w-full px-4 py-3 bg-white/20 border-2 border-white/30 backdrop-blur-sm rounded-lg focus:outline-none focus:border-blue-400 focus:bg-white/30 transition text-black placeholder:text-black/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-bold text-black mb-2">
                    Admin Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="Enter admin password"
                      autoFocus
                      className="w-full px-4 py-3 bg-white/20 border-2 border-white/30 backdrop-blur-sm rounded-lg focus:outline-none focus:border-blue-400 focus:bg-white/30 transition text-black placeholder:text-black/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200 hover:text-blue-100 transition"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {message && (
                  <div
                    className={`p-3 rounded-lg text-sm font-medium backdrop-blur-md border ${
                      message.startsWith("✓")
                        ? "bg-green-500/20 text-green-100 border-green-400/50"
                        : "bg-red-500/20 text-red-100 border-red-400/50"
                    }`}
                  >
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full bg-gradient-to-r from-blue-700 to-purple-800 text-white font-bold py-3 rounded-lg hover:from-blue-800 hover:to-purple-900 transition shadow-lg hover:shadow-blue-500/50 backdrop-blur-sm border border-white/20 disabled:opacity-60"
                >
                  {authLoading ? (
                    <Loader2 className="w-5 h-5 inline mr-2 animate-spin" />
                  ) : (
                    <Lock className="w-5 h-5 inline mr-2" />
                  )}
                  {authLoading ? "Signing In" : "Sign In"}
                </button>
              </form>

              <p className="text-center text-xs text-black mt-6 font-bold">
                Authorized personnel only
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b-2 border-blue-200 shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Content Management
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-black font-medium rounded-lg hover:bg-gray-300 transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg text-sm font-medium animate-pulse ${
              message.startsWith("✓")
                ? "bg-green-50 text-green-700 border-l-4 border-green-500"
                : "bg-red-50 text-red-700 border-l-4 border-red-500"
            }`}
          >
            {message}
          </div>
        )}

        {/* Statistics Cards - Glassmorphism Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition duration-300"></div>
            <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/20 to-white/10 border-2 border-white/40 rounded-2xl shadow-2xl p-6 hover:border-white/60 transition duration-300 hover:from-white/30 hover:to-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-black text-xs font-bold uppercase tracking-wider">
                    Total Items
                  </p>
                  <p className="text-5xl font-bold mt-3 text-black drop-shadow-lg">
                    {stats.totalSuboptions}
                  </p>
                </div>
                <div className="p-4 bg-blue-500/20 rounded-xl">
                  <Settings className="w-10 h-10 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Visible */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition duration-300"></div>
            <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/20 to-white/10 border-2 border-white/40 rounded-2xl shadow-2xl p-6 hover:border-white/60 transition duration-300 hover:from-white/30 hover:to-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-black text-xs font-bold uppercase tracking-wider">
                    Visible to Users
                  </p>
                  <p className="text-5xl font-bold mt-3 text-black drop-shadow-lg">
                    {stats.unlockedCount}
                  </p>
                </div>
                <div className="p-4 bg-green-500/20 rounded-xl">
                  <Unlock className="w-10 h-10 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Hidden */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-rose-300 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition duration-300"></div>
            <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/20 to-white/10 border-2 border-white/40 rounded-2xl shadow-2xl p-6 hover:border-white/60 transition duration-300 hover:from-white/30 hover:to-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-black text-xs font-bold uppercase tracking-wider">
                    Hidden from Users
                  </p>
                  <p className="text-5xl font-bold mt-3 text-black drop-shadow-lg">
                    {stats.lockedCount}
                  </p>
                </div>
                <div className="p-4 bg-red-500/20 rounded-xl">
                  <Lock className="w-10 h-10 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Percentage */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-400 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition duration-300"></div>
            <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/20 to-white/10 border-2 border-white/40 rounded-2xl shadow-2xl p-6 hover:border-white/60 transition duration-300 hover:from-white/30 hover:to-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-black text-xs font-bold uppercase tracking-wider">
                    Visibility Rate
                  </p>
                  <p className="text-5xl font-bold mt-3 text-black drop-shadow-lg">
                    {Math.round(
                      (stats.unlockedCount / stats.totalSuboptions) * 100
                    )}
                    <span className="text-3xl">%</span>
                  </p>
                </div>
                <div className="p-4 bg-purple-500/20 rounded-xl">
                  <Eye className="w-10 h-10 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Quick Actions */}
        <div className="bg-gray-200 rounded-xl shadow-md p-6 mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                Search Content
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or ID..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition text-black font-medium"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleResetAll}
                className="inline-flex items-center gap-2 px-6 py-2 bg-amber-600 text-black font-medium rounded-lg hover:bg-amber-700 transition shadow-md"
              >
                <RotateCcw className="w-4 h-4" />
                Reset to Default
              </button>
            </div>
          </div>
        </div>

        {/* Content Categories with Inline Controls */}
        <div className="space-y-6">
          {Object.entries(SUBOPTIONS_LOCKS).map(([categoryKey, items]) => {
            const categoryName =
              categoryKey.charAt(0).toUpperCase() +
              categoryKey.slice(1).replace(/-/g, " ");
            const categoryUnlocked = items.filter((item) =>
              isUnlocked(item.id)
            ).length;
            const allUnlocked = categoryUnlocked === items.length;
            const allLocked = categoryUnlocked === 0;
            const isExpanded = expandedCategory === categoryKey;

            // Filter items based on search
            const filteredItems = items.filter(
              (item) =>
                !searchQuery ||
                item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.id.toLowerCase().includes(searchQuery.toLowerCase())
            );

            // Skip category if search doesn't match and has search query
            if (searchQuery && filteredItems.length === 0) {
              return null;
            }

            return (
              <div
                key={categoryKey}
                className="bg-gray-200 rounded-xl shadow-lg overflow-hidden border-t-4 border-blue-500 hover:shadow-xl transition"
              >
                {/* Category Header */}
                <button
                  onClick={() =>
                    setExpandedCategory(isExpanded ? null : categoryKey)
                  }
                  className="w-full px-6 py-5 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-4 flex-1 text-left">
                    <div>
                      <h3 className="text-xl font-bold text-black">
                        {categoryName}
                      </h3>
                      <p className="text-sm text-black font-bold mt-1">
                        {categoryUnlocked} of {items.length} visible
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold ${
                        allUnlocked
                          ? "bg-green-100 text-green-700"
                          : allLocked
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {allUnlocked
                        ? "ALL ON"
                        : allLocked
                        ? "ALL OFF"
                        : "PARTIAL"}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        items.forEach((item) => {
                          if (allUnlocked) {
                            lock(item.id, "admin-master-key-2024");
                          } else {
                            unlock(item.id, item.secretKey);
                          }
                        });
                        const action = allUnlocked ? "Hidden" : "Visible";
                        setMessage(
                          `✓ Made ${action.toLowerCase()}: ${categoryName}`
                        );
                        setTimeout(() => setMessage(""), 2000);
                      }}
                      className={`relative inline-flex items-center justify-between h-10 px-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 font-bold text-sm ${
                        allUnlocked
                          ? "bg-gray-300 focus:ring-gray-400 shadow-lg shadow-gray-300/30 text-black"
                          : "bg-red-600 focus:ring-red-500 shadow-lg shadow-red-500/30 text-black"
                      } hover:shadow-xl`}
                      title={
                        allUnlocked ? "Lock all items" : "Unlock all items"
                      }
                    >
                      <span className="flex items-center gap-2">
                        {allUnlocked ? (
                          <Lock className="w-4 h-4" />
                        ) : (
                          <Unlock className="w-4 h-4" />
                        )}
                        {allUnlocked ? "Lock" : "Unlock"}
                      </span>
                    </button>

                    <ToggleRight
                      className={`w-5 h-5 text-gray-600 transition ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Items List - Expandable */}
                {isExpanded && (
                  <div className="divide-y divide-gray-200 bg-gray-50">
                    {items.map((item) => {
                      const unlocked = isUnlocked(item.id);
                      const matches =
                        !searchQuery ||
                        item.label
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        item.id
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase());

                      if (searchQuery && !matches) {
                        return null;
                      }

                      return (
                        <div
                          key={item.id}
                          className={`px-6 py-4 flex items-center justify-between transition ${
                            unlocked
                              ? "bg-white hover:bg-green-50"
                              : "bg-gray-50 hover:bg-red-50"
                          }`}
                        >
                          <div className="flex-1">
                            <h4
                              className={`font-bold text-sm ${
                                unlocked
                                  ? "text-black"
                                  : "text-black/60 line-through"
                              }`}
                            >
                              {item.label}
                            </h4>
                            <p className="text-xs text-black font-bold mt-1">
                              ID: {item.id}
                            </p>
                          </div>

                          <div className="flex items-center gap-3 flex-shrink-0">
                            <button
                              onClick={() => handleToggleSuboption(item.id)}
                              className={`relative inline-flex items-center justify-center h-10 px-4 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 font-bold text-sm ${
                                unlocked
                                  ? "bg-gray-300 focus:ring-gray-400 shadow-lg shadow-gray-300/30 text-black"
                                  : "bg-red-600 focus:ring-red-500 shadow-lg shadow-red-500/30 text-black"
                              } hover:shadow-xl`}
                              title={
                                unlocked
                                  ? "Click to lock (hide) this item"
                                  : "Click to unlock (show) this item"
                              }
                            >
                              <span className="flex items-center gap-2">
                                {unlocked ? (
                                  <Lock className="w-4 h-4" />
                                ) : (
                                  <Unlock className="w-4 h-4" />
                                )}
                                {unlocked ? "Lock" : "Unlock"}
                              </span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <AdminMediaDashboard />
      </div>
    </div>
  );
}