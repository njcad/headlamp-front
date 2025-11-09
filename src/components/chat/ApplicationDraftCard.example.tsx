/**
 * EXAMPLE USAGE OF ApplicationDraftCard
 *
 * This file demonstrates how to integrate the ApplicationDraftCard component
 * into your chat flow. This is NOT production code - it's a reference guide.
 */

import ApplicationDraftCard from "@/components/chat/ApplicationDraftCard";
import type { ApplicationDraft } from "@/types/chatTypes";

// Example 1: Basic usage with mock data
export function ExampleBasicUsage() {
  const mockDraft: ApplicationDraft = {
    name: "John Doe",
    phone: "(555) 123-4567",
    summary:
      "I need help with food assistance and housing support for my family.",
    orgs: [
      {
        id: 1,
        name: "City Food Bank",
        description: "Provides emergency food assistance to families in need.",
      },
      {
        id: 2,
        name: "Housing First Coalition",
        description: "Offers temporary housing and rental assistance programs.",
      },
    ],
  };

  const handleSubmit = async (draft: ApplicationDraft) => {
    console.log("Submitting application:", draft);
    // TODO: Call API to submit application
    // await submitApplication(draft);
  };

  return (
    <ApplicationDraftCard
      draft={mockDraft}
      onSubmit={handleSubmit}
      submitting={false}
    />
  );
}

// Example 2: Integration with MessageList component
// Add this to your MessageList.tsx or ChatLayout.tsx
/*
export default function MessageList(props: {
  messages: ChatMessage[];
  selectedOrgIds: number[];
  onToggleOrg: (orgId: number) => void;
}) {
  const { messages, selectedOrgIds, onToggleOrg } = props;
  const [applicationDraft, setApplicationDraft] = useState<ApplicationDraft | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitApplication = async (draft: ApplicationDraft) => {
    setSubmitting(true);
    try {
      // Call your API to submit the application
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft),
      });
      
      if (response.ok) {
        // Show success message
        console.log("Application submitted successfully!");
        setApplicationDraft(null);
      }
    } catch (error) {
      console.error("Failed to submit application:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Stack gap="3">
      {messages.map((m, idx) => {
        // ... existing message rendering code ...
        
        // Add application draft rendering
        {m.applicationDraft && (
          <ApplicationDraftCard
            draft={m.applicationDraft}
            onSubmit={handleSubmitApplication}
            submitting={submitting}
          />
        )}
      })}
    </Stack>
  );
}
*/

// Example 3: Backend integration point
// Update your chatTypes.ts to include applicationDraft in message response
/*
export type AgentMessageResponse = {
    user_id: string;
    message: string;
    orgs?: OrgType[];
    application_draft?: ApplicationDraft;  // Add this field
}
*/

// Example 4: API payload structure when submitting
/*
export type SubmitApplicationPayload = {
  user_id: string;
  name: string;
  phone: string;
  summary: string;
  org_ids: number[];
  consent_given: boolean;
  timestamp: string;
}

const submitApplication = async (draft: ApplicationDraft, userId: string) => {
  const payload: SubmitApplicationPayload = {
    user_id: userId,
    name: draft.name,
    phone: draft.phone,
    summary: draft.summary,
    org_ids: draft.orgs.map(o => o.id),
    consent_given: true,
    timestamp: new Date().toISOString(),
  };
  
  const response = await fetch('/api/applications/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  
  return response.json();
};
*/
