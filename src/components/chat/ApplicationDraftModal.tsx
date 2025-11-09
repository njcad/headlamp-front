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

export default function ApplicationDraftModal(props: {
  isOpen: boolean;
  onClose: () => void;
  draft: ApplicationDraft;
  onSubmit: (draft: ApplicationDraft) => void;
  submitting?: boolean;
}) {
  const { isOpen, onClose, draft, onSubmit, submitting } = props;
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
                onSubmit={onSubmit}
                submitting={submitting}
              />
            </DialogBody>
          </DialogContent>
        </DialogPositioner>
      </DialogRoot>
    </Portal>
  );
}
