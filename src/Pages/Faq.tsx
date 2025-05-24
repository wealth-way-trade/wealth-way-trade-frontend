import BodyWrapper from '../BodyWrapper'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../Components/ui/accordion'

const Faq = () => {
    return (
        <BodyWrapper>
            <div className="max-w-7xl text-zinc-300 tracking-wide md:mt-16 mt-8 w-full mx-auto md:px-10 p-4">
                <h2 className="font-medium md:text-5xl text-2xl text-center mb-8  text-white">Frequently Asked Questions</h2>

                <div className="mt-3">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className='md:text-lg'>How do I deposit funds?</AccordionTrigger>
                            <AccordionContent className='text-[#ffffff94]'>
                                Navigate to the "Wallet" section, choose your preferred payment method, and follow the instructions provided.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2">
                            <AccordionTrigger className='md:text-lg'>How do I withdraw earnings?</AccordionTrigger>
                            <AccordionContent className='text-[#ffffff94]'>
                                Go to "Withdraw Funds," select a payment method, and confirm your withdrawal request. Withdrawals are processed within 24 hours.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3">
                            <AccordionTrigger className='md:text-lg'>Is my money secure on this platform?</AccordionTrigger>
                            <AccordionContent className='text-[#ffffff94]'>
                                Yes, we implement high-grade encryption and multi-layer security to ensure your funds are protected.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-4">
                            <AccordionTrigger className='md:text-lg'>How do I reset my password?</AccordionTrigger>
                            <AccordionContent className='text-[#ffffff94]'>
                                Click on "Forgot Password" on the login page. You will receive an email with instructions to reset your password securely.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-5">
                            <AccordionTrigger className='md:text-lg'>What is the minimum deposit required?</AccordionTrigger>
                            <AccordionContent className='text-[#ffffff94]'>
                                The minimum deposit amount is $50 for most payment methods. For some methods, higher minimums may apply.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-6">
                            <AccordionTrigger className='md:text-lg'>Can I use multiple payment methods?</AccordionTrigger>
                            <AccordionContent className='text-[#ffffff94]'>
                                Yes, you can use multiple payment methods for both deposits and withdrawals. Ensure all accounts are verified.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-7">
                            <AccordionTrigger className='md:text-lg'>How can I contact customer support?</AccordionTrigger>
                            <AccordionContent className='text-[#ffffff94]'>
                                You can reach out to us via email at support@tradingapp.com option available in the "Help" section.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-8">
                            <AccordionTrigger className="md:text-lg">
                                What documents are required for account verification?
                            </AccordionTrigger>
                            <AccordionContent>
                                To comply with financial regulations and ensure a secure trading environment, we require all users to complete identity verification. You will need to upload a valid government-issued photo ID (such as a passport or driver’s license) and a proof of address (like a utility bill or bank statement issued within the last 3 months). This process helps us protect your account and prevent fraud.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-9">
                            <AccordionTrigger className="md:text-lg">
                                Why is my deposit not showing in my account?
                            </AccordionTrigger>
                            <AccordionContent>
                                Deposits are usually processed instantly, but some payment methods may take up to a few hours depending on banking networks or blockchain confirmations. If your deposit hasn’t appeared after 2 hours, please check the status in your transaction history. If it's still pending, contact our support team with the transaction ID and payment details for prompt assistance.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-10">
                            <AccordionTrigger className="md:text-lg">
                                What should I do if a transaction fails?
                            </AccordionTrigger>
                            <AccordionContent>
                                If a transaction fails, ensure you have a stable internet connection and sufficient funds. Double-check your entered information and payment method details. If everything seems correct and the issue persists, please contact support with a screenshot or error message, and we will investigate the issue immediately.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-11">
                            <AccordionTrigger className="md:text-lg">
                                Can I trade on mobile devices?
                            </AccordionTrigger>
                            <AccordionContent>
                                Yes, our platform is fully responsive and optimized for mobile use. You can access your dashboard, monitor trades, deposit or withdraw funds, and get real-time notifications directly from your smartphone or tablet. For the best experience, we recommend using the latest version of your preferred browser.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-12">
                            <AccordionTrigger className="md:text-lg">
                                How do I close my account permanently?
                            </AccordionTrigger>
                            <AccordionContent>
                                We're sorry to see you go. To close your account, please ensure all funds are withdrawn and no active trades are ongoing. Then, navigate to your account settings and select “Close Account.” Alternatively, contact our support team to assist you through the process. Once closed, your data will be securely archived in accordance with our privacy policy.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-13">
                            <AccordionTrigger className="md:text-lg">
                                Do you offer any referral or affiliate programs?
                            </AccordionTrigger>
                            <AccordionContent>
                                Yes! We offer a competitive referral program where you can earn commission for inviting new users to our platform. Each time someone registers using your referral link and makes a deposit, you’ll receive a percentage of their trading fees. Visit the “Referral” section in your dashboard to get your link and track your earnings.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-14">
                            <AccordionTrigger className="md:text-lg">
                                Are there any fees associated with trading?
                            </AccordionTrigger>
                            <AccordionContent>
                                We believe in transparency. While creating an account is completely free, trading on our platform does involve minimal fees depending on the type and size of your transaction. These will be clearly displayed before you confirm any action. There are no hidden charges, and we regularly review our fee structure to remain competitive.
                            </AccordionContent>
                        </AccordionItem>

                    </Accordion>
                </div>

            </div>
        </BodyWrapper>
    )
}

export default Faq