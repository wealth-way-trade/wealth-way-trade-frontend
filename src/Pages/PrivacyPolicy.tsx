import BodyWrapper from "../BodyWrapper";

const PrivacyPolicy = () => {
    return (
        <BodyWrapper>
            <div className="max-w-7xl text-zinc-300 tracking-wide md:mt-16 mt-8 w-full mx-auto md:px-10 p-4">
                <h2 className="font-medium md:text-5xl text-2xl text-center mb-8  text-white">Privacy Policy</h2>

                <section className="mb-6">
                    <p>
                        At WealthWayTrade, your privacy is of utmost importance to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our trading platform. Please read this policy carefully to understand our practices regarding your personal data.
                    </p>
                </section>

                <section className="mb-6">
                    <h3 className="text-2xl font-semibold mb-3">Information We Collect</h3>
                    <p>
                        We collect various types of information to provide and improve our services, including:
                    </p>
                    <ul className="list-disc list-inside ml-5">
                        <li>Personal identification details such as your name, email address, and contact number.</li>
                        <li>Account credentials and authentication data to securely manage your login and access.</li>
                        <li>Transactional data including deposits, withdrawals, and trade history.</li>
                        <li>Technical data such as IP addresses, browser type, and device information to enhance security and user experience.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h3 className="text-2xl font-semibold mb-3">How We Use Your Information</h3>
                    <p>
                        Your information is used to:
                    </p>
                    <ul className="list-disc list-inside ml-5">
                        <li>Provide and manage your trading account and transactions.</li>
                        <li>Send important communications such as OTP codes, account updates, and support responses.</li>
                        <li>Enhance security measures to protect your account and funds through encryption and multi-layer authentication.</li>
                        <li>Improve our platform, customer service, and user experience based on usage and feedback.</li>
                        <li>Comply with legal and regulatory requirements related to financial transactions.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h3 className="text-2xl font-semibold mb-3">Data Security</h3>
                    <p>
                        We implement advanced security protocols including high-grade encryption and multi-layer safeguards to ensure that your personal and financial information is protected from unauthorized access, alteration, or disclosure. Access to sensitive data is strictly limited to authorized personnel only.
                    </p>
                </section>

                <section className="mb-6">
                    <h3 className="text-2xl font-semibold mb-3">Cookies and Tracking Technologies</h3>
                    <p>
                        Our platform uses cookies and similar tracking technologies to personalize your experience, remember your preferences, and analyze site usage. You can manage your cookie preferences through your browser settings. Please note that disabling cookies may affect certain features of the website.
                    </p>
                </section>

                <section className="mb-6">
                    <h3 className="text-2xl font-semibold mb-3">Third-Party Services</h3>
                    <p>
                        We may share your information with trusted third-party service providers who assist us in operating the platform, processing payments, or delivering customer support. These providers are obligated to keep your information confidential and use it only for the purposes we specify.
                    </p>
                </section>

                <section className="mb-6">
                    <h3 className="text-2xl font-semibold mb-3">User Rights and Choices</h3>
                    <p>
                        You have the right to access, correct, or delete your personal information held by us. You can also opt out of receiving promotional communications at any time. For account security, certain information may be retained as required by law or to prevent fraud.
                    </p>
                </section>

                <section className="mb-6">
                    <h3 className="text-2xl font-semibold mb-3">Children’s Privacy</h3>
                    <p>
                        Our services are not directed at individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such data, please contact us immediately for prompt removal.
                    </p>
                </section>

                <section className="mb-6">
                    <h3 className="text-2xl font-semibold mb-3">Changes to This Privacy Policy</h3>
                    <p>
                        We reserve the right to update or modify this Privacy Policy at any time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically to stay informed about how we protect your information.
                    </p>
                </section>

                <section className="mb-6">
                    <h3 className="text-2xl font-semibold mb-3">Contact Us</h3>
                    <p>
                        If you have any questions or concerns regarding this Privacy Policy or our data practices, please contact our support team at <a href="mailto:support@wealthwaytarde.com" className="underline">support@wealthwaytarde.com</a>. We are here to assist you.
                    </p>
                </section>
            </div>
        </BodyWrapper>
    );
};

export default PrivacyPolicy;
