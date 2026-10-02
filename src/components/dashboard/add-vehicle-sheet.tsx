"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AddVehicleForm } from "@/components/dashboard/add-vehicle-form";

export function AddVehicleSheet() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="rounded-none">
          <Plus />
          Ajouter un véhicule
        </Button>
      </SheetTrigger>
      <SheetContent className="rounded-none sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Ajouter un véhicule</SheetTitle>
          <SheetDescription>
            Ce véhicule devra être vérifié avant de pouvoir servir à publier
            des trajets.
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 pb-4">
          <AddVehicleForm
            onSuccess={() => {
              setOpen(false);
              router.refresh();
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
