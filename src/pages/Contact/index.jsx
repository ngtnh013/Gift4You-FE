import { FaClock } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
function ContactPage() {
    return ( <div className="max-w-3xl mx-auto p-5 text-center font-sans">
        <h1 className="font-semibold text-4xl mb-3">Get In Touch With Us</h1>
        <p className="text-lg text-gray-500 mb-5">
            For More Information About Our Product & Services. Please Feel Free To Drop Us An Email.
            Our Staff Always Be There To Help You Out. Do Not Hesitate!
        </p>

        <div className="flex flex-col md:flex-row md:space-x-5">
            <div className="flex-1 space-y-4 mb-5 md:mb-0">
                <div className="p-4 border border-gray-300 rounded-lg text-left">
                    <FaMapMarkerAlt className="text-xl mb-4 block"/>
                    <h2 className="text-xl">Address</h2>
                    <p>Placeholder address, Vietnam</p>
                </div>

                <div className="p-4 border border-gray-300 rounded-lg text-left">
                    <FaPhone className="text-xl mb-4 block"/>
                    <h2 className="text-xl">Phone</h2>
                    <p>Mobile: +(84) 546-6789</p>
                    <p>Hotline: +(84) 456-6789</p>
                </div>

                <div className="p-4 border border-gray-300 rounded-lg text-left">
                    <FaClock className="text-xl mb-4 block"/>
                    <h2 className="text-xl">Working Time</h2>
                    <p>Monday-Friday: 9:00 - 22:00</p>
                    <p>Saturday-Sunday: 9:00 - 21:00</p>
                </div>
            </div>

            <form className="flex-1 space-y-3 flex flex-col">
                <label className="text-left text-xs font-bold">Your name</label>
                <input
                    type="text"
                    placeholder="Abc"
                    required
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none"
                />
                
                <label className="text-left text-xs font-bold">Email address</label>
                <input
                    type="email"
                    placeholder="Abc@def.com"
                    required
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none"
                />

                <label className="text-left text-xs font-bold">Subject</label>
                <input
                    type="text"
                    placeholder="Subject (This is optional)"
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none"
                />

                <label className="text-left text-xs font-bold">Message</label>
                <textarea
                    placeholder="Hi. I'd like to ask about"
                    required
                    className="p-2 border border-gray-300 rounded-lg h-32 focus:outline-none"
                ></textarea>

                <button
                    type="submit"
                    className="mt-3 p-2 bg-[#4a3c2e] text-white font-medium rounded-lg hover:bg-[#3a3227]"
                >
                    Submit
                </button>
            </form>
        </div>
    </div> );
}

export default ContactPage;