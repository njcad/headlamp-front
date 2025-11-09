import { Container } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import AppHeader from "@/components/layout/AppHeader";
import LandingPage from "@/pages/LandingPage";
import PartnerLoginPage from "@/pages/PartnerLoginPage";
import PartnerDashboardPage from "@/pages/PartnerDashboardPage";
import ClientChatPage from "@/pages/ClientChatPage";

function App() {
  return (
    <>
      <AppHeader />
      <Container maxW="container.2xl" pt="20" pb="24">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/partner/login" element={<PartnerLoginPage />} />
          <Route path="/partner/dashboard" element={<PartnerDashboardPage />} />
          <Route path="/chat" element={<ClientChatPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
