import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { MePage } from "../pages/MePage";
import { NudgesSettingsPage } from "../pages/NudgesSettingsPage";
import { NudgePreviewPage } from "../pages/NudgePreviewPage";
import { PlanPage } from "../pages/PlanPage";
import { PreferencesPage } from "../pages/PreferencesPage";
import { RecipeDetailPage } from "../pages/RecipeDetailPage";
import { ScanPage } from "../pages/ScanPage";
import { ShoppingListPage } from "../pages/ShoppingListPage";
import { AppShell } from "./AppShell";
import { useProfile } from "./profile-context";
import { ProfileProvider } from "./ProfileProvider";
import { DisplayPreferencesProvider } from "./DisplayPreferencesProvider";
import { LanguageProvider } from "../i18n/LanguageProvider";

function RequireOnboarding() {
  const { profile } = useProfile();

  if (!profile.onboardingCompleted) {
    return <Navigate to="/preferences" replace />;
  }

  return <Outlet />;
}

function AppRoutes() {
  const { profile } = useProfile();

  return (
    <Routes>
      <Route path="/preferences" element={<PreferencesPage />} />
      <Route element={<RequireOnboarding />}>
        <Route path="/nudges/preview" element={<NudgePreviewPage />} />
        <Route path="/recipe/:recipeId" element={<RecipeDetailPage />} />
        <Route element={<AppShell />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/plan/shopping-list" element={<ShoppingListPage />} />
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/nudges/settings" element={<NudgesSettingsPage />} />
          <Route path="/me" element={<MePage />} />
        </Route>
      </Route>
      <Route
        path="*"
        element={
          <Navigate
            to={profile.onboardingCompleted ? "/home" : "/preferences"}
            replace
          />
        }
      />
    </Routes>
  );
}

export function AppRouter() {
  return (
    <DisplayPreferencesProvider>
      <LanguageProvider>
        <ProfileProvider>
          <AppRoutes />
        </ProfileProvider>
      </LanguageProvider>
    </DisplayPreferencesProvider>
  );
}
