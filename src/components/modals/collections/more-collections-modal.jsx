"use client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Plus, Library } from "lucide-react";

import { useModal } from "../hooks/modal-hook";
import { useToast } from "@/lib/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

function MoreCollectionsModal() {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "moveCollection";
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const { userCollections, isCollection, isCollectionId, linkId } = data;

  const handleClose = () => {
    router.refresh();
    return onClose();
  };

  let collectionList;

  if (isModalOpen && isCollection) {
    collectionList = userCollections.filter(
      (collection) => collection.id !== isCollectionId,
    );
  } else if (isModalOpen) {
    collectionList = userCollections;
  }

  if (!isModalOpen) {
    return null;
  }

  const handleMoveItem = async (newColId, newColName) => {
    setLoading(true);
    try {
      if (!newColId) {
        const response = await fetch("/api/links/collections/link/move", {
          method: "PATCH",
          body: JSON.stringify({
            currentCollection: isCollectionId,
            linkId: linkId,
          }),
          headers: {
            "x-client-id": window.localStorage.getItem("localUUID"),
          },
        });

        if (!response.ok) {
          throw new Error("500: Internal server error");
        }
      }
      if (isCollection) {
        const response = await fetch("/api/links/collections/link/move", {
          method: "POST",
          body: JSON.stringify({
            currentCollection: isCollectionId,
            newCollection: newColId,
            linkId: linkId,
          }),
          headers: {
            "x-client-id": window.localStorage.getItem("localUUID"),
          },
        });

        if (!response.ok) {
          throw new Error("500: Internal server error");
        }
      } else {
        const response = await fetch("/api/links/collections/link/add", {
          method: "POST",
          body: JSON.stringify({
            collectionId: newColId,
            linkId: linkId,
          }),
          headers: {
            "x-client-id": window.localStorage.getItem("localUUID"),
          },
        });

        if (!response.ok) {
          throw new Error("500: Internal server error");
        }
      }

      router.refresh();
      toast({
        title: "URL successfuly moved to collection: " + newColName,
      });
      handleClose();
    } catch (e) {
      toast({
        title: "There was an error",
        description:
          "Server had an error while processing the request, please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommandDialog open={isModalOpen} onOpenChange={() => handleClose()}>
      <CommandInput placeholder="Search collections" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="My Collections">
          {collectionList &&
            collectionList.map((item, index) => (
              <CommandItem key={index}>
                {item.name}
                <Button
                  className="ml-auto"
                  variant="ghost"
                  disabled={loading}
                  onClick={() => {
                    handleMoveItem(item.id, item.name);
                  }}
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </CommandItem>
            ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export default MoreCollectionsModal;
