"use client";

import Link from "next/link";
import { Ghost, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotFoundState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full p-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative mb-8">
        <Ghost className="w-24 h-24 text-primary/20 animate-bounce" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-primary">404</span>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-foreground mb-4">
        Oups ! Cette page s'est envolée
      </h1>

      <p className="text-muted-foreground max-w-md mb-10 text-lg">
        Désolé, la page que vous recherchez n'existe pas ou a été déplacée vers
        un autre verger.
      </p>

      <Button
        render={<Link href="/dashboard" />}
        className="bg-primary-button hover:bg-primary-button/90 text-primary-foreground px-10 py-6 h-auto text-base rounded-xl flex items-center gap-2 transition-all hover:scale-105 shadow-lg shadow-primary/20"
      >
        <Home className="w-5 h-5 mr-1" />
        Retour au Tableau de bord
      </Button>
    </div>
  );
}
