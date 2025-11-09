import { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LuMessageSquare, LuShield, LuZap } from "react-icons/lu";

const MotionBox = motion(Box);
const MotionStack = motion(Stack);
const MotionVStack = motion(VStack);
const MotionHStack = motion(HStack);

export default function LandingPage() {
  const navigate = useNavigate();
  const subtext = "fg.muted";
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const spotlightTimer = window.setTimeout(() => setShowSpotlight(true), 600);
    const contentTimer = window.setTimeout(() => setShowContent(true), 1450);

    return () => {
      window.clearTimeout(spotlightTimer);
      window.clearTimeout(contentTimer);
    };
  }, []);

  useEffect(() => {
    const bodyStyle = document.body.style;
    let resetTimer: number | undefined;

    if (!showContent) {
      bodyStyle.setProperty("--landing-header-bg", "rgba(0, 0, 0, 0.95)");
      bodyStyle.setProperty("--landing-header-border-color", "rgba(0, 0, 0, 0)");
      bodyStyle.setProperty("--landing-header-text-color", "rgba(255, 255, 255, 0.95)");
    } else {
      resetTimer = window.setTimeout(() => {
        bodyStyle.removeProperty("--landing-header-bg");
        bodyStyle.removeProperty("--landing-header-border-color");
        bodyStyle.removeProperty("--landing-header-text-color");
      }, 300);
    }

    return () => {
      if (resetTimer) window.clearTimeout(resetTimer);
      bodyStyle.removeProperty("--landing-header-bg");
      bodyStyle.removeProperty("--landing-header-border-color");
      bodyStyle.removeProperty("--landing-header-text-color");
    };
  }, [showContent]);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const overlayBackground = showSpotlight
    ? "radial-gradient(circle at 90px 90px, rgba(255, 161, 51, 0.55) 0%, rgba(255, 161, 51, 0.32) 18%, rgba(0, 0, 0, 0.75) 46%, rgba(0, 0, 0, 0.9) 74%, rgba(0, 0, 0, 1) 100%)"
    : "rgba(0, 0, 0, 1)";

  return (
    <Box position="relative" minH="100dvh" bg="bg" overflow="hidden">
      {showContent && (
        <MotionBox
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <Container maxW="container.xl" pt={{ base: "20", md: "24" }} pb="16">
            <MotionStack
              gap={{ base: "6", md: "8" }}
              align="center"
              textAlign="center"
              initial="initial"
              animate="animate"
              variants={{
                initial: {},
                animate: {
                  transition: {
                staggerChildren: 0.25,
                delayChildren: 0.06,
                  },
                },
              }}
            >
              <MotionBox variants={fadeInUp}>
                <Badge
                  variant="subtle"
                  colorPalette="orange"
                  rounded="full"
                  px="4"
                  py="1.5"
                  fontSize="sm"
                >
                  Community-powered support
                </Badge>
              </MotionBox>

              <MotionBox variants={fadeInUp}>
                <Heading
                  size={{ base: "2xl", md: "4xl" }}
                  lineHeight="1.1"
                  fontWeight="extrabold"
                  letterSpacing="-0.02em"
                >
                  You share. We shine the light.
                </Heading>
              </MotionBox>

              <MotionBox variants={fadeInUp}>
                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  color={subtext}
                  maxW="3xl"
                >
                  A modern two-sided portal that guides clients to resources and
                  equips nonprofit partners to respond quickly—securely, clearly,
                  and with heart.
                </Text>
              </MotionBox>

              <MotionHStack
                gap="2"
                flexWrap="wrap"
                justify="center"
                variants={fadeInUp}
              >
                <Badge
                  variant="solid"
                  colorPalette="orange"
                  rounded="full"
                  px="3"
                  py="1"
                >
                  Fast intake
                </Badge>
                <Badge
                  variant="outline"
                  colorPalette="pink"
                  rounded="full"
                  px="3"
                  py="1"
                >
                  Secure & private
                </Badge>
                <Badge
                  variant="subtle"
                  colorPalette="purple"
                  rounded="full"
                  px="3"
                  py="1"
                >
                  Partner-friendly
                </Badge>
              </MotionHStack>

              {/* Dual CTA with explanations */}
              <MotionStack
                direction={{ base: "column", md: "row" }}
                gap={{ base: "4", md: "6" }}
                mt={{ base: "4", md: "6" }}
                w="full"
                maxW="6xl"
                variants={fadeInUp}
              >
                {/* Client CTA - Orange theme */}
                <MotionBox
                  flex="1"
                  p={{ base: "8", md: "10" }}
                  rounded="3xl"
                  bg="orange.500"
                  color="white"
                  boxShadow="xl"
                  whileHover={{
                    y: -4,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{ duration: 0.3 }}
                  _hover={{
                    bg: "orange.600",
                  }}
                >
                  <VStack align="stretch" gap="5">
                    <VStack align="start" gap="2">
                      <Badge
                        colorPalette="orange"
                        variant="solid"
                        bg="orange.700"
                        px="3"
                        py="1"
                      >
                        For clients
                      </Badge>
                      <Heading size="lg" color="white">
                        Looking for help?
                      </Heading>
                      <Text
                        fontSize="md"
                        color="orange.50"
                        lineHeight="1.6"
                        textAlign="left"
                      >
                        Start a confidential conversation. We'll guide you
                        step-by-step and connect you with the support you need.
        </Text>
                    </VStack>
                    <Button
                      onClick={() => navigate("/chat")}
                      size="xl"
                      variant="solid"
                      bg="white"
                      color="orange.600"
                      w="full"
                      h="14"
                      fontSize="lg"
                      fontWeight="bold"
                      _hover={{
                        bg: "orange.50",
                        transform: "scale(1.02)",
                      }}
                    >
                      Start chat
          </Button>
                    <Text fontSize="xs" color="orange.100" textAlign="center">
                      ✓ No account needed • Completely confidential
                    </Text>
                  </VStack>
                </MotionBox>

                {/* Partner CTA - Pink theme */}
                <MotionBox
                  flex="1"
                  p={{ base: "8", md: "10" }}
                  rounded="3xl"
                  bg="pink.500"
                  color="white"
                  boxShadow="xl"
                  whileHover={{
                    y: -4,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{ duration: 0.3 }}
                  _hover={{
                    bg: "pink.600",
                  }}
                >
                  <VStack align="stretch" gap="5">
                    <VStack align="start" gap="2">
                      <Badge
                        colorPalette="pink"
                        variant="solid"
                        bg="pink.700"
                        px="3"
                        py="1"
                      >
                        For partners
                      </Badge>
                      <Heading size="lg" color="white">
                        Partner portal
                      </Heading>
                      <Text
                        fontSize="md"
                        color="pink.50"
                        lineHeight="1.6"
                        textAlign="left"
                      >
                        Access your dashboard to view new intakes, coordinate
                        responses, and manage your services.
                      </Text>
                    </VStack>
          <Button
            onClick={() => navigate("/partner/login")}
                      size="xl"
            variant="outline"
                      borderColor="white"
                      borderWidth="2px"
                      color="white"
                      w="full"
                      h="14"
                      fontSize="lg"
                      fontWeight="bold"
                      _hover={{
                        bg: "pink.600",
                        transform: "scale(1.02)",
                      }}
          >
            Partner login
          </Button>
                    <Text fontSize="xs" color="pink.100" textAlign="center">
                      ✓ Secure access • Real-time updates
                    </Text>
                  </VStack>
                </MotionBox>
              </MotionStack>

              {/* Feature cards */}
              <MotionBox
                w="full"
                maxW="6xl"
                mt={{ base: "12", md: "16" }}
                variants={fadeInUp}
              >
                <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
                  {[
                    {
                      title: "Guided intake",
                      desc: "Clear, conversational questions that reduce friction and help you share what matters.",
                      icon: LuMessageSquare,
                      color: "orange",
                    },
                    {
                      title: "Real-time updates",
                      desc: "Keep everyone aligned with timely notifications and a unified case view.",
                      icon: LuZap,
                      color: "pink",
                    },
                    {
                      title: "Privacy-first",
                      desc: "Your information is encrypted and handled with care—always.",
                      icon: LuShield,
                      color: "purple",
                    },
                  ].map((item, index) => (
                    <MotionVStack
                      key={item.title}
                      p="7"
                      rounded="2xl"
                      borderWidth="1px"
                      borderColor="border"
                      bg="bg"
                      align="start"
                      textAlign="left"
                      gap="4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.45,
                        delay: index * 0.08,
                      }}
                      whileHover={{
                        y: -4,
                        boxShadow:
                          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      }}
                      _hover={{
                        borderColor: `${item.color}.200`,
                      }}
                    >
                      <Box
                        p="3"
                        rounded="xl"
                        bg={`${item.color}.100`}
                        color={`${item.color}.600`}
                      >
                        <Icon fontSize="2xl">
                          <item.icon />
                        </Icon>
                      </Box>
                      <Heading size="md" mt="1">
                        {item.title}
                      </Heading>
                      <Text color={subtext} fontSize="sm" lineHeight="1.7">
                        {item.desc}
                      </Text>
                    </MotionVStack>
                  ))}
                </SimpleGrid>
              </MotionBox>
            </MotionStack>
          </Container>

          {/* Footer */}
          <MotionBox
            as="footer"
            borderTopWidth="1px"
            borderColor="border"
            py="8"
            mt="16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Container maxW="container.xl">
              <Stack
                direction={{ base: "column", md: "row" }}
                justify="space-between"
                align="center"
                gap="4"
              >
                <VStack align={{ base: "center", md: "start" }} gap="2">
                  <Heading size="sm" color="fg">
                    Headlamp
                  </Heading>
                  <Text fontSize="sm" color="fg.muted">
                    Connecting communities with care.
                  </Text>
                </VStack>
                <HStack gap="6" color="fg.muted" fontSize="sm">
                  <Text _hover={{ color: "fg" }} cursor="pointer">
                    About
                  </Text>
                  <Text _hover={{ color: "fg" }} cursor="pointer">
                    Privacy
                  </Text>
                  <Text _hover={{ color: "fg" }} cursor="pointer">
                    Contact
                  </Text>
                </HStack>
      </Stack>
    </Container>
          </MotionBox>
        </MotionBox>
      )}

      {/* Spotlight glow */}
      <MotionBox
        position="fixed"
        top="-140px"
        left="-140px"
        borderRadius="full"
        pointerEvents="none"
        bg="radial-gradient(circle, rgba(255, 161, 51, 0.55) 0%, rgba(255, 161, 51, 0.25) 32%, rgba(255, 161, 51, 0) 60%)"
        filter="blur(18px)"
        opacity={showSpotlight && !showContent ? 1 : 0}
        style={{ transition: "opacity 0.8s ease" }}
        zIndex={25}
        animate={{
          width: showSpotlight ? "380px" : "220px",
          height: showSpotlight ? "380px" : "220px",
        }}
        transition={{
          width: { duration: 0.9, ease: [0.4, 0, 0.2, 1] },
          height: { duration: 0.9, ease: [0.4, 0, 0.2, 1] },
        }}
      />

      {/* Screen overlay */}
      <Box
        position="fixed"
        inset="0"
        bg={overlayBackground}
        opacity={showContent ? 0 : 1}
        transition="background 1s ease, opacity 0.9s ease 0.2s"
        zIndex={20}
        pointerEvents={showContent ? "none" : "auto"}
      />
    </Box>
  );
}
