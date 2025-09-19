import React from 'react';

export default function TermsOfUse() {
  return (
    <div className="p-8 mx-auto max-w-3xl">
      <h1 className="text-4xl font-bold mb-6 text-center">Terms of Use</h1>
      <p className="text-muted-foreground text-center mb-8">Last updated: September 14, 2025</p>

      <div className="prose dark:prose-invert">
        <p>
          Welcome to Integrity AI! By accessing or using our services, you agree to comply with and be bound by these Terms of Use.
        </p>

        <h2>1. Responsible Use</h2>
        <p>
          Our tools are designed to assist with writing, not to facilitate academic dishonesty or plagiarism. You are responsible for ensuring that your use of our services complies with all applicable laws and academic integrity policies.
        </p>

        <h2>2. Intellectual Property</h2>
        <p>
          All content and intellectual property on this site are owned by Integrity AI or our licensors. You may not copy, reproduce, or distribute any part of our services without prior written permission.
        </p>

        <h2>3. Limitation of Liability</h2>
        <p>
          Integrity AI and its affiliates will not be liable for any damages arising from your use of our services. We provide our tools &quot;as is&quot; without any warranties.
        </p>

        <h2>4. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Your continued use of the services after any changes indicates your acceptance of the new terms.
        </p>
      </div>
    </div>
  );
}

