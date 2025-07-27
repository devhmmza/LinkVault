
"use client";

import { useState, useMemo, useEffect } from 'react';
import { Plus, Search, Loader2 } from 'lucide-react';
import useLocalStorage from '@/hooks/use-local-storage';
import { initialLinks, initialCategories } from '@/lib/data';
import type { LinkItem, Category } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LinkCard from './LinkCard';
import LinkDialog from './LinkDialog';

export default function DashboardClient() {
  const [links, setLinks, linksInitialized] = useLocalStorage<LinkItem[]>('links', []);
  const [categories, setCategories, categoriesInitialized] = useLocalStorage<Category[]>('categories', []);
  
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [linkToEdit, setLinkToEdit] = useState<LinkItem | undefined>(undefined);

  useEffect(() => {
    if (linksInitialized && links.length === 0) {
      setLinks(initialLinks);
    }
    if (categoriesInitialized && categories.length === 0) {
      setCategories(initialCategories);
    }
  }, [linksInitialized, categoriesInitialized, links.length, categories.length, setLinks, setCategories]);

  const filteredLinks = useMemo(() => {
    return links
      .filter(link => {
        const categoryMatch = activeCategory === 'All' || link.category === activeCategory;
        const searchMatch = !searchQuery || 
          link.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          link.description?.toLowerCase().includes(searchQuery.toLowerCase());
        return categoryMatch && searchMatch;
      })
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [links, activeCategory, searchQuery]);

  const handleOpenDialog = (link?: LinkItem) => {
    setLinkToEdit(link);
    setDialogOpen(true);
  };

  const handleSaveLink = (linkData: Omit<LinkItem, 'id' | 'createdAt'>, id?: string) => {
    if (id) {
      setLinks(prev => prev.map(l => l.id === id ? { ...l, ...linkData } : l));
    } else {
      const newLink: LinkItem = {
        ...linkData,
        id: crypto.randomUUID(),
        createdAt: Date.now()
      };
      setLinks(prev => [newLink, ...prev]);
    }
    
    if (!categories.includes(linkData.category)) {
      setCategories(prev => [...prev, linkData.category]);
    }
  };

  const handleDeleteLink = (id: string) => {
    setLinks(prev => prev.filter(l => l.id !== id));
  };
  
  if (!linksInitialized || !categoriesInitialized) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <h1 className="text-3xl font-bold font-headline">Your Vault</h1>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search links..."
              className="pl-10 w-full md:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="mr-2 h-4 w-4" /> Add Link
          </Button>
        </div>
      </div>
      
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="bg-transparent p-0">
          <TabsTrigger value="All" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-none">All</TabsTrigger>
          {categories.map(cat => (
            <TabsTrigger key={cat} value={cat} className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-none">{cat}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      
      {filteredLinks.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredLinks.map(link => (
            <LinkCard 
              key={link.id} 
              link={link} 
              onEdit={() => handleOpenDialog(link)} 
              onDelete={() => handleDeleteLink(link.id)} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-muted-foreground/20 rounded-lg">
          <h3 className="text-xl font-semibold text-muted-foreground">No links found</h3>
          <p className="text-muted-foreground/80 mt-2">
            {searchQuery ? `Try a different search query.` : `Click 'Add Link' to get started.`}
          </p>
        </div>
      )}

      <LinkDialog
        isOpen={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSaveLink}
        linkToEdit={linkToEdit}
        categories={categories}
      />
    </div>
  );
}
