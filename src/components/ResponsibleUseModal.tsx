'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export const ResponsibleUseBanner = () => {
  return (
    <div className="p-4 rounded-lg bg-yellow-100 text-yellow-800 border border-yellow-200 text-sm flex items-center gap-4">
      <div className="flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-alert"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
      </div>
      <p className="flex-grow">
        This tool is intended to assist in improving writing style and clarity, not to bypass academic integrity checks. Always cite your sources and use this tool responsibly.
      </p>
      <Link href="/responsible-use" className="text-yellow-800 font-semibold underline whitespace-nowrap">
        Learn more
      </Link>
    </div>
  );
};

export default function ResponsibleUseModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('responsible-use-accepted') === 'true';
    setIsAccepted(accepted);
  }, []);

  useEffect(() => {
    const handleShowModal = () => {
      if (!isAccepted) {
        setIsOpen(true);
      }
    };
    window.addEventListener('show-responsible-use-modal', handleShowModal);
    return () => window.removeEventListener('show-responsible-use-modal', handleShowModal);
  }, [isAccepted]);

  const handleAccept = () => {
    localStorage.setItem('responsible-use-accepted', 'true');
    setIsAccepted(true);
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (isAccepted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="bg-card border rounded-lg p-6 w-full max-w-lg space-y-6"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-center">Responsible Use</h2>
            <p className="text-sm text-muted-foreground text-center">
              Our tools are built to empower, not to deceive.
            </p>
            <div className="space-y-4 text-sm text-foreground max-h-[50vh] overflow-y-auto pr-2">
              <p>We believe in the ethical use of AI. This tool is designed to enhance your writing and assist in expressing your ideas with greater clarity and style. It is not intended for use in ways that violate academic or professional integrity policies.</p>
              <ul className="list-disc list-inside space-y-2">
                <li>**Always cite your sources.**</li>
                <li>**Ensure the final work is your own.**</li>
                <li>**Review and edit the output to ensure it reflects your original voice and intent.**</li>
              </ul>
              <p>By proceeding, you acknowledge that you will use Integrity AI in a manner consistent with ethical guidelines and academic honesty.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/"
                onClick={handleClose}
                className="w-full py-3 font-semibold rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 text-center transition-colors"
              >
                Cancel & Go Back
              </Link>
              <button
                onClick={handleAccept}
                className="w-full py-3 font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                I Understand & Accept
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
