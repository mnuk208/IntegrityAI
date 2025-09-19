import Link from 'next/link';
import { Mail, Shield, FileText, Book } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-background/85 py-6 backdrop-blur">
      <div className="container mx-auto flex flex-col items-center justify-between space-y-4 px-4 text-center text-muted-foreground md:flex-row md:space-y-0">
        <div className="text-sm">
          c {new Date().getFullYear()} Integrity AI. All rights reserved.
        </div>
        <div className="flex flex-col space-y-2 text-sm sm:flex-row sm:space-y-0 sm:space-x-6">
          <Link
            href="/contact"
            className="flex items-center justify-center transition-colors hover:text-primary"
          >
            <Mail className="mr-1 h-4 w-4" />
            Contact
          </Link>
          <Link
            href="/privacy-policy"
            className="flex items-center justify-center transition-colors hover:text-primary"
          >
            <Shield className="mr-1 h-4 w-4" />
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-use"
            className="flex items-center justify-center transition-colors hover:text-primary"
          >
            <FileText className="mr-1 h-4 w-4" />
            Terms of Use
          </Link>
          <Link
            href="/responsible-use"
            className="flex items-center justify-center transition-colors hover:text-primary"
          >
            <Book className="mr-1 h-4 w-4" />
            Responsible Use
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
