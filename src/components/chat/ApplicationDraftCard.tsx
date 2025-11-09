import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { keyframes } from "@emotion/react";
import type { ApplicationDraft } from "@/types/chatTypes";
import EditableField from "@/components/chat/EditableField";
import ConsentCheckbox from "@/components/chat/ConsentCheckbox";
import OrgCard from "@/components/chat/OrgCard";

export default function ApplicationDraftCard(props: {
  draft: ApplicationDraft;
  onSubmit: (draft: ApplicationDraft) => void;
  submitting?: boolean;
}) {
  const { draft: initialDraft, onSubmit, submitting = false } = props;

  const [name, setName] = useState(initialDraft.name);
  const [phone, setPhone] = useState(initialDraft.phone);
  const [summary, setSummary] = useState(initialDraft.summary);
  const [selectedOrgIds, setSelectedOrgIds] = useState<number[]>(
    initialDraft.orgs.map((o) => o.id)
  );
  const [hasConsent, setHasConsent] = useState(false);
  const [editingSummary, setEditingSummary] = useState(false);

  const fadeDown = keyframes`
    from { opacity: 0; transform: translateY(-12px); }
    to { opacity: 1; transform: translateY(0); }
  `;

  const onToggleOrg = (id: number) => {
    setSelectedOrgIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    const selectedOrgs = initialDraft.orgs.filter((o) =>
      selectedOrgIds.includes(o.id)
    );
    await onSubmit({
      name,
      phone,
      summary,
      orgs: selectedOrgs,
    });
  };

  const isValid =
    name.trim() &&
    phone.trim() &&
    summary.trim() &&
    selectedOrgIds.length > 0 &&
    hasConsent;

  return (
    <Box
      w="full"
      borderWidth="2px"
      borderColor="orange.400"
      rounded="2xl"
      p={{ base: "5", md: "6" }}
      bg="bg"
      boxShadow="lg"
      animation={`${fadeDown} 500ms ease-out both`}
    >
      <Stack gap="6">
        {/* Header */}
        <Stack gap="2">
          <Heading size="md" color="orange.600">
            Review Your Application
          </Heading>
          <Text fontSize="sm" color="fg.muted">
            Please review and edit your information before submitting to the
            selected organizations.
          </Text>
        </Stack>

        {/* Personal Information */}
        <Stack gap="4">
          <Heading size="sm" color="fg">
            Personal Information
          </Heading>
          <EditableField
            label="Full Name"
            value={name}
            onChange={setName}
            placeholder="Enter your full name"
            required
          />
          <EditableField
            label="Phone Number"
            value={phone}
            onChange={setPhone}
            placeholder="Enter your phone number"
            required
          />
          {editingSummary ? (
            <EditableField
              label="Summary of Your Situation"
              value={summary}
              onChange={setSummary}
              placeholder="Describe what help you're looking for..."
              multiline
              required
            />
          ) : (
            <Box>
              <Text fontSize="sm" color="fg.muted" mb="2">
                Summary of Your Situation
              </Text>
              {summary ? (
                <Text color="fg" lineClamp={3}>
                  {summary}
                </Text>
              ) : (
                <Text color="fg.muted">No summary provided yet.</Text>
              )}
            </Box>
          )}
          <Button
            onClick={() => setEditingSummary((v) => !v)}
            variant="subtle"
            size="sm"
            alignSelf="start"
          >
            {editingSummary ? "Done" : "Edit summary"}
          </Button>
        </Stack>

        {/* Organization Selection */}
        <Stack gap="4">
          <Stack gap="1">
            <Heading size="sm" color="fg">
              Applying To
            </Heading>
            <Text fontSize="sm" color="fg.muted">
              Select the organizations you'd like to apply to. You can deselect
              any that don't fit your needs.
            </Text>
          </Stack>
          <Stack gap="2">
            {initialDraft.orgs.map((org, i) => (
              <OrgCard
                key={org.id}
                org={org}
                selected={selectedOrgIds.includes(org.id)}
                onToggle={() => onToggleOrg(org.id)}
                delayMs={i * 80}
              />
            ))}
          </Stack>
          {selectedOrgIds.length === 0 && (
            <Text fontSize="sm" color="orange.600" fontWeight="medium">
              ⚠️ Please select at least one organization to apply to.
            </Text>
          )}
        </Stack>

        {/* Consent */}
        <ConsentCheckbox checked={hasConsent} onChange={setHasConsent} />

        {/* Submit Button */}
        <Button
          size="lg"
          colorPalette="orange"
          bg="orange.500"
          color="white"
          w="full"
          h="14"
          fontSize="lg"
          fontWeight="bold"
          onClick={handleSubmit}
          disabled={!isValid || submitting}
          _hover={{
            bg: "orange.600",
            transform: isValid ? "translateY(-2px)" : undefined,
            boxShadow: isValid ? "lg" : undefined,
          }}
          _active={{
            transform: "translateY(0)",
          }}
          _disabled={{
            opacity: 0.5,
            cursor: "not-allowed",
            _hover: {
              bg: "orange.500",
              transform: "none",
            },
          }}
        >
          {submitting ? "Submitting..." : "Submit Application"}
        </Button>

        {!isValid && !submitting && (
          <Text fontSize="xs" color="fg.muted" textAlign="center">
            {!hasConsent
              ? "Please review the consent agreement above"
              : "Please complete all required fields"}
          </Text>
        )}
      </Stack>
    </Box>
  );
}
