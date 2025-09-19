import { Container, Typography, Link } from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }} dir="ltr">
      <Typography variant="h4" gutterBottom>
        Privacy Policy for Hikaya
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Effective Date: 01/02/2025 | Last Updated: 01/02/2025
      </Typography>

      <Typography variant="h5" gutterBottom mt={3}>
        1. Introduction
      </Typography>
      <Typography>
        Welcome to <strong>Hikaya</strong>, a mobile application designed
        for children, developed by <strong>MISC STUDIO</strong> (&quot;we,&quot;
        &quot;our,&quot; or &quot;us&quot;). Protecting your and your
        child&apos;s privacy is important to us. This Privacy Policy explains
        how we handle information in compliance with the{" "}
        <strong>Children’s Online Privacy Protection Act (COPPA)</strong> and
        the <strong>General Data Protection Regulation (GDPR-K)</strong> for
        children’s data protection.
      </Typography>

      <Typography variant="h6" mt={2}>
        Contact Us
      </Typography>
      <Typography>
        If you have any questions about this policy, you can contact us at:
      </Typography>
      <Typography>
        <Link href="mailto:contact@lazone.space">contact@lazone.space</Link>
      </Typography>

      <Typography variant="h5" gutterBottom mt={3}>
        2. Information We Collect
      </Typography>
      <Typography>
        We do <strong>not</strong> collect any personal information from
        children. Our app allows users to log in as <strong>guests</strong> or
        create an account using a <strong>parent’s email and username</strong>.
      </Typography>
      <Typography>
        The information we collect is strictly limited to:
      </Typography>
      <ul>
        <li>
          <strong>Email and Username (from the Parent):</strong> Required only
          for authentication.
        </li>
      </ul>

      <Typography variant="h5" gutterBottom mt={3}>
        3. How We Use Collected Information
      </Typography>
      <Typography>
        The limited information we collect is used solely to:
      </Typography>
      <ul>
        <li>Provide account authentication for parents.</li>
        <li>Save reading progress, history, and favorites within the app.</li>
        <li>
          Improve the in-app experience without collecting any personal data
          from children.
        </li>
      </ul>

      <Typography variant="h5" gutterBottom mt={3}>
        4. Data Storage & Security
      </Typography>
      <Typography>
        - <strong>Content Storage:</strong> We use{" "}
        <strong>Amazon Web Services (AWS)</strong> to host{" "}
        <strong>pre-generated stories, images, and audios</strong>. This does
        not involve any user data collection.
        <br />- <strong>Security Measures:</strong> We take industry-standard
        security measures to protect any parent-provided authentication details.
      </Typography>

      <Typography variant="h5" gutterBottom mt={3}>
        5. No Third-Party Sharing or Tracking
      </Typography>
      <Typography>
        - We do <strong>not</strong> use third-party services such as analytics,
        advertising, or tracking tools.
        <br />- We do <strong>not</strong> sell, rent, or share user information
        with third parties.
      </Typography>

      <Typography variant="h5" gutterBottom mt={3}>
        6. Parental Rights & Future Controls
      </Typography>
      <Typography>
        While <strong>parental controls</strong> are not yet implemented, we are
        committed to adding features that allow parents to:
      </Typography>
      <ul>
        <li>Manage their child’s access to certain content.</li>
        <li>Delete progress or account details if necessary.</li>
        <li>Contact us for data-related concerns at any time.</li>
      </ul>

      <Typography variant="h5" gutterBottom mt={3}>
        7. Changes to This Privacy Policy
      </Typography>
      <Typography>
        We may update this policy from time to time. We encourage parents to
        review this policy periodically.
      </Typography>

      <Typography variant="h5" gutterBottom mt={3}>
        8. Contact Us
      </Typography>
      <Typography>
        If you have any questions about this Privacy Policy, please contact us
        at:
      </Typography>
      <Typography>
        <Link href="mailto:contact@lazone.space">contact@lazone.space</Link>
      </Typography>
    </Container>
  );
};

export default PrivacyPolicy;
