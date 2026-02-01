"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useModal } from "../hooks/modal-hook";
import { useToast } from "@/lib/hooks/use-toast";
import { useRouter } from "next/navigation";

import { EyeOff } from "lucide-react";

function ShareCollectionModal() {
  const { isOpen, onClose, onOpen, type, data } = useModal();
  const isModalOpen = isOpen && type === "collectionShare";
  const { id, publicSlug, name } = data;
  const { toast } = useToast();
  const router = useRouter();

  const handleClose = () => {
    return onClose();
  };

  const onSubmit = async () => {
    try {
      const response = await fetch(
        `/api/links/collections/update/${id}/share`,
        {
          method: "POST",
          headers: {
            "x-client-id": window.localStorage.getItem("localUUID"),
          },
        },
      );

      if (!response.ok) {
        throw new Error(response.status);
      } else {
        router.refresh();
        return onOpen("collectionShareSuccess", {
          slug: publicSlug,
          name: name,
        });
      }
    } catch (e) {
      console.log(e);
      toast({
        title: "Error",
        description: "There was an error, please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={() => handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Share Collection {name}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Share your beautiful collection with others!
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2 rounded-md dark:bg-white/10 bg-blue-950/20 p-3 border">
          <EyeOff className="h-5 w-5" />
          <p className="text-xs">
            Disabled URLs in your collection won't be visible to others
          </p>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button onClick={() => onSubmit()} className="md:w-1/3">
            Share!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ShareCollectionModal;
