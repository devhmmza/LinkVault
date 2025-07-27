
"use client";

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { LinkItem, Category } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface LinkDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (linkData: Omit<LinkItem, 'id' | 'createdAt'>, id?: string) => void;
  linkToEdit?: LinkItem;
  categories: Category[];
}

const formSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL." }),
  title: z.string().min(1, { message: "Title is required." }),
  description: z.string().optional(),
  category: z.string().min(1, { message: "Category is required." }),
});

export default function LinkDialog({ isOpen, onOpenChange, onSave, linkToEdit, categories }: LinkDialogProps) {
  const [newCategory, setNewCategory] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
      title: '',
      description: '',
      category: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (linkToEdit) {
        form.reset({
          url: linkToEdit.url,
          title: linkToEdit.title,
          description: linkToEdit.description || '',
          category: linkToEdit.category,
        });
      } else {
        form.reset({
          url: '',
          title: '',
          description: '',
          category: categories[0] || '',
        });
      }
      setNewCategory('');
    }
  }, [isOpen, linkToEdit, form, categories]);

  const categoryValue = form.watch('category');

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const finalCategory = categoryValue === 'new-category' ? newCategory : values.category;
    onSave({ ...values, category: finalCategory }, linkToEdit?.id);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{linkToEdit ? 'Edit Link' : 'Add New Link'}</DialogTitle>
          <DialogDescription>
            {linkToEdit ? 'Update the details of your saved link.' : 'Save a new link to your vault.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="My awesome link" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A short description of the link (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                      <SelectItem value="new-category">
                        <span className="text-primary">Create new category...</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {categoryValue === 'new-category' && (
              <FormItem>
                <FormLabel>New Category Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g. 'Project X'" 
                    value={newCategory} 
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                </FormControl>
              </FormItem>
            )}
            <DialogFooter>
              <Button type="submit">Save Link</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
