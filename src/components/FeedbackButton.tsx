"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquarePlus } from 'lucide-react';
import { Button } from './ui/button';
import { FeedbackModal } from './FeedbackModal';

export const FeedbackButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        variant="default"
        className="fixed bottom-4 right-4 rounded-full p-4 shadow-xl z-40 transition-transform duration-300 hover:scale-110"
        onClick={() => setIsModalOpen(true)}
        aria-label="Give feedback"
      >
        <MessageSquarePlus className="h-6 w-6" />
      </Button>
      <FeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
