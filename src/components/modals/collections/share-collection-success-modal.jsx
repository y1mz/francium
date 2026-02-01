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
import { Copy, Check } from "lucide-react";

import { useModal } from "../hooks/modal-hook";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const ShareCollectionSuccessModal = () => {
  const [isCopied, setCopied] = useState(false);
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "collectionShareSuccess";
  const router = useRouter();

  const { slug, name } = data;

  const handleClose = () => {
    router.refresh();
    return onClose();
  };

  const handleCopy = async (url) => {
    const currentUrl = window.location.origin;
    setCopied(true);
    await navigator.clipboard.writeText(`${currentUrl}/c/${url}`);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  if (!isModalOpen) {
    return null;
  } else {
    return (
      <Dialog open={isModalOpen} onOpenChange={() => handleClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Collection {name}</DialogTitle>
            <DialogDescription>
              Share your beautiful collection with others!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <p className="text-md font-semibold">
              Share the link below to let other see your beautiful collection!
            </p>
            <div className="flex gap-2 items-center">
              <div className="flex w-full items-center gap-2 rounded-md dark:bg-white/10 bg-blue-950/20 p-3 border">
                <pre>
                  <code>
                    {window.location.origin}/c/{slug}
                  </code>
                </pre>
              </div>
              <Button
                variant="outline"
                onClick={() => handleCopy(slug)}
                className={cn(
                  isCopied && "bg-green-600 text-black",
                  "active:scale-90 p-3",
                )}
              >
                {isCopied ? (
                  <Check className="h-6 w-6" />
                ) : (
                  <Copy className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => handleClose()}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
};

export default ShareCollectionSuccessModal;
