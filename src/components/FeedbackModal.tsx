'use client';

import { useState, useRef } from 'react';
import { X, Video, Send, MessageSquarePlus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { StarRating } from './StarRating';
import { sendFeedback } from '@/lib/apiClient';
import toast from 'react-hot-toast';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [feedbackType, setFeedbackType] = useState<'text' | 'video'>('text');
  const [text, setText] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [rating, setRating] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFeedbackSubmit = async () => {
    try {
      if (rating === 0) {
        toast.error('Please provide a star rating.');
        return;
      }
      if (feedbackType === 'text' && text.trim() === '') {
        toast.error('Please enter your feedback.');
        return;
      }
      if (feedbackType === 'video' && !videoFile) {
        toast.error('Please upload a video file.');
        return;
      }

      await sendFeedback({ rating, text, videoFile });
      toast.success('Thank you for your feedback!');
      onClose();
      setText('');
      setVideoFile(null);
      setRating(0);
    } catch (error) {
      toast.error('Failed to submit feedback. Please try again.');
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideoFile(e.target.files[0]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-2xl rounded-3xl border border-border/70 bg-card/95 p-8 shadow-2xl backdrop-blur"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="mb-6 flex items-center space-x-2 text-foreground">
                <MessageSquarePlus className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Share Your Feedback</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:bg-primary/10 hover:text-primary"
                onClick={onClose}
                aria-label="Close feedback form"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="mb-6 flex flex-col items-center justify-center gap-2">
              <p className="text-sm font-semibold text-muted-foreground">How helpful is Integrity AI?</p>
              <StarRating onRatingChange={setRating} />
            </div>

            <div className="mb-6 flex justify-center gap-3">
              <Button
                variant={feedbackType === 'text' ? 'default' : 'outline'}
                onClick={() => setFeedbackType('text')}
                className="min-w-[140px]"
              >
                Text Feedback
              </Button>
              <Button
                variant={feedbackType === 'video' ? 'default' : 'outline'}
                onClick={() => setFeedbackType('video')}
                className="min-w-[140px]"
              >
                Video Feedback
              </Button>
            </div>

            {feedbackType === 'text' ? (
              <Textarea
                placeholder="What do you love? What can we improve?"
                className="mb-6 h-40 w-full resize-none rounded-2xl border border-border/60 bg-background/80 p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            ) : (
              <div
                className="mb-6 flex h-40 w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border/70 bg-background/70 p-4 text-center transition hover:border-primary hover:text-primary/80"
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
              >
                <Video className="h-10 w-10 text-primary" />
                <p className="text-sm text-muted-foreground">
                  {videoFile ? videoFile.name : 'Click to upload a quick walkthrough (mp4, mov, webm)'}
                </p>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  ref={fileInputRef}
                  className="hidden"
                />
              </div>
            )}

            <div className="flex justify-end">
              <Button onClick={handleFeedbackSubmit} className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Submit
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
