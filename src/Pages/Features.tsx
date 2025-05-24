import BodyWrapper from '../BodyWrapper'

const Features = () => {
    return (
        <BodyWrapper>
            <div className="max-w-7xl text-zinc-300 tracking-wide md:mt-16 mt-8 w-full mx-auto md:px-10 p-4">
                <h2 className="font-medium md:text-5xl text-2xl text-center md:mb-20 mb-8 text-white">Features</h2>

                <div className="grid md:grid-cols-2 gap-8 md:gap-x-20">
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-2">✅ Guaranteed Daily Profits</h3>
                        <p className="text-sm text-zinc-400">
                            Say goodbye to unpredictable outcomes. With our platform, users enjoy daily profits — no loss, no stress. Our smart system ensures consistent earnings for everyone.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-white mb-2">🎓 Beginner & Student-Friendly</h3>
                        <p className="text-sm text-zinc-400">
                            We simplify trading for newcomers. Our user-friendly interface, guidance tools, and educational content make it easy for beginners and students to start earning from day one.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-white mb-2">🔐 Encrypted & Secure Platform</h3>
                        <p className="text-sm text-zinc-400">
                            Your data and funds are protected with end-to-end encryption, multi-layered security protocols, and constant monitoring. Trust is the foundation of everything we build.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-white mb-2">🌍 Open to Everyone</h3>
                        <p className="text-sm text-zinc-400">
                            Whether you're a student, freelancer, or full-time worker — anyone can trade and earn with Wealth Way Trade. Our platform is designed for universal access and success.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-white mb-2">🚀 Real-Time Performance</h3>
                        <p className="text-sm text-zinc-400">
                            Experience lightning-fast trade executions and real-time profit tracking. Our system is optimized for speed, accuracy, and transparency.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-white mb-2">🎉 Engaging Community Events</h3>
                        <p className="text-sm text-zinc-400">
                            Stay engaged with regular platform events, bonuses, and challenges. We aim to keep trading exciting while building a strong, loyal community.
                        </p>
                    </div>
                </div>
            </div>
        </BodyWrapper>
    )
}

export default Features
