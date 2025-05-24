import { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import BodyWrapper from '../BodyWrapper'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const { name, email, message } = formData

        if (!name || !email || !message) {
            toast.error('All fields are required!')
            return
        }

        // Submit API

        toast.success('Message submitted successfully!')

        setFormData({
            name: '',
            email: '',
            message: ''
        })
    }

    return (
        <BodyWrapper>
            <div className="max-w-7xl text-zinc-300 tracking-wide md:mt-24 mt-8 w-full mx-auto md:px-10 p-4">

                <div className="flex w-full md:flex-row flex-col md:gap-10 gap-5 ">
                    {/* Contact Info */}
                    <div className="space-y-6 w-full md:max-w-[30%]"  >
                        <h2 className="font-medium md:text-5xl text-3xl md:mb-8 text-white md:text-start text-center">Contact Us</h2>
                        <div className='md:block hidden'>
                            <h3 className="text-xl font-semibold text-white">Support Email</h3>
                            <p className="text-zinc-400 text-sm mt-2">support@wealthwaytrade.com</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="space-y-6 w-full md:max-w-[70%] mx-auto">
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 bg-zinc-950 border border-zinc-700 rounded-lg text-white"
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 bg-zinc-950 border border-zinc-700 rounded-lg text-white"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={4}
                                className="w-full p-3 bg-zinc-950 border border-zinc-700 rounded-lg text-white"
                                placeholder="Your message..."
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="border-[#5f29b7] border text-white w-full justify-center mt-4 flex items-center gap-3 md:px-12 px-9 cursor-pointer transition-all duration-500 bg-[#5f29b7] hover:bg-transparent md:py-4 py-3 text-xl rounded-full"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </BodyWrapper>
    )
}

export default Contact
