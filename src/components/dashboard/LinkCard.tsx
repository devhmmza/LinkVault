
"use client";

import type { LinkItem } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit, Trash, ExternalLink } from "lucide-react";
import Link from 'next/link';

interface LinkCardProps {
  link: LinkItem;
  onEdit: () => void;
  onDelete: () => void;
}

export default function LinkCard({ link, onEdit, onDelete }: LinkCardProps) {
  const domain = new URL(link.url).hostname;

  return (
    <Card className="flex flex-col transition-all duration-300 hover:border-primary hover:shadow-[0_0_20px_theme(colors.primary/0.4)]">
      <CardHeader>
        <div className="flex justify-between items-start">
            <CardTitle className="pr-4">{link.title}</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete} className="text-destructive focus:text-destructive">
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <CardDescription className="flex items-center gap-2 pt-1">
            <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=16`} alt="favicon" width={16} height={16} className="rounded-sm" />
            <span className="truncate text-sm text-muted-foreground">{domain}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-foreground/80">{link.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Badge variant="outline" className="border-secondary text-secondary font-bold font-code">{link.category}</Badge>
        <Button variant="ghost" size="sm" asChild>
          <Link href={link.url} target="_blank" rel="noopener noreferrer">
            Visit
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
