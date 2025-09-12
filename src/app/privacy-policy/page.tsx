import { Container, Typography, Link } from "@mui/material";

const StudioPrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }} dir="ltr">
      <Typography variant="h4" gutterBottom>
        Privacy Policy for MISC STUDIO
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Effective Date: 01/02/2025 | Last Updated: 12/09/2025
      </Typography>

      <Typography variant="h5" gutterBottom mt={3}>
        1. Introduction
      </Typography>
      <Typography>
        Welcome to <strong>MISC STUDIO</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). 
        We develop digital applications, games, and related services. Protecting your and your 
        users’ privacy is important to us. This Privacy Policy explains how we collect, use, 
        and protect information in compliance with applicable laws, including the 
        <strong>Children’s Online Privacy Protection Act (COPPA)</strong> and the 
        <strong>General Data Protection Regulation (GDPR)</strong>.
      </Typography>

      <Typography variant="h6" mt={2}>
        Contact Information
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
        Depending on the service or application, we may collect the following:
      </Typography>
      <ul>
        <li><strong>Account Information:</strong> Email, username, or other credentials for account creation and authentication.</li>
        <li><strong>Usage Information:</strong> App usage data, device information, crash reports, and performance logs.</li>
        <li><strong>Communications:</strong> Messages or inquiries sent via our support channels.</li>
      </ul>
      <Typography>
        We <strong>do not</strong> knowingly collect personal information from children under the age of 13 without parental consent.
      </Typography>

      <Typography variant="h5" gutterBottom mt={3}>
        3. How We Use Information
      </Typography>
      <Typography>
        The information we collect may be used to:
      </Typography>
      <ul>
        <li>Provide, maintain, and improve our applications and services.</li>
        <li>Respond to user inquiries and provide customer support.</li>
        <li>Ensure security and prevent fraud or abuse of our services.</li>
        <li>Comply with legal obligations.</li>
      </ul>

      <Typography variant="h5" gutterBottom mt={3}>
        4. Data Storage & Security
      </Typography>
      <Typography>
        <ul>
          <li><strong>Hosting:</strong> We use secure cloud services (such as AWS) to host data where necessary. </li>
          <li><strong>Security Measures:</strong> We implement industry-standard security practices to protect any personal information we store.</li>
        </ul>
         
        
      </Typography>

      <Typography variant="h5" gutterBottom mt={3}>
        5. Sharing and Third Parties
      </Typography>
      <Typography>
        <ul>
          <li>We do <strong>not</strong> sell, rent, or trade user data to third parties.</li>
          <li>We may use trusted service providers for hosting, analytics, or support services, but only to the extent necessary to operate our applications.</li>
          <li>We ensure that any third-party service providers comply with privacy and security requirements.</li>
        </ul> 
      </Typography>

      <Typography variant="h5" gutterBottom mt={3}>
        6. Parental Rights
      </Typography>
      <Typography>
        For applications targeted to children, parents may:
      </Typography>
      <ul>
        <li>Review and request deletion of their child’s personal information.</li>
        <li>Withdraw consent for collection of child information where applicable.</li>
        <li>Contact us for privacy-related concerns at any time.</li>
      </ul>

      <Typography variant="h5" gutterBottom mt={3}>
        7. Updates to This Privacy Policy
      </Typography>
      <Typography>
        We may update this policy periodically. We encourage users to review this page to stay informed about how we protect personal information.
      </Typography>

      <Typography variant="h5" gutterBottom mt={3}>
        8. Contact Us
      </Typography>
      <Typography>
        For any questions about this Privacy Policy, please contact us at:
      </Typography>
      <Typography>
        <Link href="mailto:contact@lazone.space">contact@lazone.space</Link>
      </Typography>
    </Container>
  );
};

export default StudioPrivacyPolicy;
