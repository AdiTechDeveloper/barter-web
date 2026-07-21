import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { authService, profileService } from "../services/app";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [pendingAction, setPendingAction] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  const isAuthenticated = !!localStorage.getItem("token");

  const loadProfile = useCallback(async () => {
    if (!localStorage.getItem("token")) {
      setCurrentUser(null);
      setAuthChecked(true);
      return;
    }
    try {
      const profile = await profileService.get();
      setCurrentUser(profile);
    } catch (err) {
      console.warn("Failed to load profile:", err);
      localStorage.removeItem("token");
      setCurrentUser(null);
    } finally {
      setAuthChecked(true);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const requireAuth = useCallback(
    (action) => {
      if (isAuthenticated) {
        action();
      } else {
        setPendingAction(() => action);
        setAuthMode("login");
        setIsAuthOpen(true);
      }
    },
    [isAuthenticated],
  );

  const openAuth = useCallback((mode = "login") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  }, []);

  const handleAuthSuccess = async (user) => {
    setCurrentUser(user);
    setIsAuthOpen(false);
    await loadProfile();
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      return { success: true };
    } catch (err) {
      console.error("Logout API failed:", err);
      return { success: false };
    } finally {
      localStorage.removeItem("token");
      setCurrentUser(null);
    }
  };

  const isAdmin = Boolean(currentUser?.roles?.some((r) => r.name === "admin"));

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        authChecked,
        isAdmin,
        isAuthOpen,
        setIsAuthOpen,
        authMode,
        openAuth,
        requireAuth,
        handleAuthSuccess,
        logout,
        refreshProfile: loadProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
