'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Your message has been sent!');
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-center text-muted-foreground mb-6 max-w-lg">
        Have a question or need support? Fill out the form below, and we&apos;ll get back to you as soon as possible.
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-xl p-8 bg-card rounded-xl shadow-lg border border-border">
        <div className="mb-4">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required className="mt-1" />
        </div>
        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="mt-1" />
        </div>
        <div className="mb-6">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required className="mt-1 h-32" />
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </div>
  );
}

