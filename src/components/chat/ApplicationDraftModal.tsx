import {
  DialogRoot,
  DialogBackdrop,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogCloseTrigger,
  DialogPositioner,
  Portal,
} from "@chakra-ui/react";
import type { ApplicationDraft } from "@/types/chatTypes";
import ApplicationDraftCard from "@/components/chat/ApplicationDraftCard";
import { useNavigate } from "react-router-dom";

export default function ApplicationDraftModal(props: {
  isOpen: boolean;
  onClose: () => void;
  draft: ApplicationDraft;
  onSubmit: (draft: ApplicationDraft) => void;
  submitting?: boolean;
}) {
  const { isOpen, onClose, draft, onSubmit, submitting } = props;
  const navigate = useNavigate();
  return (
    <Portal>
      <DialogRoot
        open={isOpen}
        onOpenChange={(e) => {
          if (!e.open) onClose();
        }}
      >
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent
            w="full"
            maxW={{ base: "95vw", md: "3xl", lg: "6xl" }}
            maxH="90dvh"
            overflow="auto"
            rounded="xl"
            boxShadow="xl"
            bg="bg"
          >
            <DialogCloseTrigger />
            <DialogHeader>
              <DialogTitle>Application draft</DialogTitle>
            </DialogHeader>
            <DialogBody pb="6">
              <ApplicationDraftCard
                draft={draft}
                onSubmit={async (d) => {
                  await onSubmit(d);
                  navigate("/client/applications", {
                    state: { pendingFromSubmission: true },
                  });
                }}
                submitting={submitting}
              />
            </DialogBody>
          </DialogContent>
        </DialogPositioner>
      </DialogRoot>
    </Portal>
  );
}
