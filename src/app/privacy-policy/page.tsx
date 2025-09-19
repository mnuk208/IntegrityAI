import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="p-8 mx-auto max-w-3xl">
      <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
      <p className="text-muted-foreground text-center mb-8">Last updated: September 14, 2025</p>

      <div className="prose dark:prose-invert">
        <p>
          Your privacy is important to us. This Privacy Policy explains how Integrity AI collects, uses, and protects your personal information.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          We collect information that you provide directly to us, such as your name, email address, and any content you submit to our tools. We also collect non-identifying information, like usage data and device information, to improve our services.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>
          The information we collect is used to operate and maintain our services, provide customer support, and improve the functionality of our tools. We do not sell or share your personal data with third parties for marketing purposes.
        </p>

        <h2>3. Data Security</h2>
        <p>
          We take reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no internet transmission is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2>4. Your Choices</h2>
        <p>
          You have the right to access, update, or delete your personal information. If you have any questions or concerns about our data practices, please contact us.
        </p>
      </div>
    </div>
  );
}
