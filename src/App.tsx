import { Container } from "@chakra-ui/react";
import { Routes, Route, Outlet } from "react-router-dom";
import AppHeader from "@/components/layout/AppHeader";
import LandingPage from "@/pages/LandingPage";
import PartnerLoginPage from "@/pages/PartnerLoginPage";
import PartnerDashboardPage from "@/pages/PartnerDashboardPage";
import ClientChatPage from "@/pages/ClientChatPage";
import CaseProfilePage from "@/pages/CaseProfilePage";
import ClientApplicationsPage from "@/pages/ClientApplicationsPage";

function AppContainer() {
  return (
    <Container maxW="container.xl" pt="20" pb="24">
      <Outlet />
    </Container>
  );
}

function App() {
  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* All routes below use the shared Container layout */}
        <Route element={<AppContainer />}>
          <Route path="/partner/login" element={<PartnerLoginPage />} />
          <Route path="/partner/dashboard" element={<PartnerDashboardPage />} />
          <Route path="/partner/case/:caseId" element={<CaseProfilePage />} />
          <Route path="/chat" element={<ClientChatPage />} />
          <Route path="/client/applications" element={<ClientApplicationsPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
