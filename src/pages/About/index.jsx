import characterImage from '../../assets/character.png';
import { FaLinkedin } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import ContactInfo from "../../components/ContactInfo";
const teamMembers = [
    {
      name: 'Nguyễn Tuấn Anh',
      title: 'Founder & CEO',
      description: 'Tuấn Anh is the visionary behind Gift4U, leading the team with passion.',
      linkedin: '#',
      email: 'mailto:john@example.com', // Updated to be functional
      website: '#',
      // image: 'path/to/john_image.png', // Individual image
    },
    {
      name: 'Trần Thị Thanh Thảo',
      title: 'Founder & Chief Marketing Officer',
      description: 'Thanh Thảo drives our marketing strategies and ensures customer satisfaction.',
      linkedin: '#',
      email: 'mailto:jane@example.com', // Updated to be functional
      website: '#',
      // image: 'path/to/jane_image.png', // Individual image
    },
    {
      name: 'Lê Tuấn Anh',
      title: 'Founder & Lead Developer',
      description: 'Tuấn Anh is the technical genius behind our platform.',
      linkedin: '#',
      email: '#',
      website: '#',
      // image: 'path/to/jane_image.png',
    },
    {
        name: 'Phạm Gia Huy',
        title: 'Founder & UX/UI Designer',
        description: 'Gia Huy designs user-friendly interfaces and enhances user experience.',
        linkedin: '#',
        email: 'mailto:sarah@example.com', // Updated to be functional
        website: '#',
        // image: 'path/to/sarah_image.png', // Individual image
    },
    {
        name: 'Lê Thị Ngọc',
        title: 'Founder & Product Manager',
        description: 'Ngọc oversees product development and ensures timely delivery.',
        linkedin: '#',
        email: 'mailto:david@example.com', // Updated to be functional
        website: '#',
        // image: 'path/to/david_image.png', // Individual image
    },{
      name: 'Hoàng Bảo Huy',
      title: 'Founder & Developer',
      description: 'Bảo Huy supports developing application.',
      linkedin: '#',
      email: 'mailto:david@example.com', // Updated to be functional
      website: '#',
      // image: 'path/to/david_image.png', // Individual image
  },
    // Add other team members similarly...
  ];
function AboutPage() {
    return (  
        <div>
        {/* About Section */}
        <div className="flex items-center p-5 font-sans">
          <div className="flex-1 mr-5 pl-5">
            <h2 className="text-5xl font-bold mb-2">Our Story: Crafting Personalized Gift Experiences</h2>
            <p className="text-lg leading-relaxed">
              At Gift4U, we believe in the power of thoughtful gifting. Our mission is to create unique and memorable gift boxes that bring joy to both the sender and the recipient. With a wide selection of customizable box templates, we aim to make every occasion extra special.
            </p>
          </div>
          <div className="flex-1 flex justify-center items-center">
            {/* Placeholder for image, replace with an actual image URL */}
            <img className="w-full h-auto border border-gray-300" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJSQvknfQfGOK63VLYfSYcvwpOaB-9Do5frQ&s" alt="Gift Box" />
          </div>
        </div>
  
        {/* Team Section */}
        <section className="text-center bg-peach-100 mt-10 pb-2 pt-2">
          <h2 className="text-4xl font-bold text-gray-800">Meet Our Team</h2>
          <p className="text-xl text-gray-600 mb-10">Get to know the talented individuals behind Gift4U.</p>
          <div className="flex justify-center gap-8">
            {teamMembers.map((member, index) => (
              <div className="flex flex-col bg-white rounded-lg p-4 w-52 text-center shadow-lg h-90 justify-between" key={index}>
                <div className="member-photo">
                  <img className="w-full h-auto rounded-lg" src={member.image || characterImage} alt={member.name} />
                </div>
                <h3 className="text-xl mt-4 text-gray-800">{member.name}</h3>
                <p className="font-bold text-gray-600 mb-1">{member.title}</p>
                <p className="text-sm text-gray-500 mb-4">{member.description}</p>
                <div className="flex justify-center gap-2 mt-auto">
                  <a href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`LinkedIn profile of ${member.name}`}>
                    <FaLinkedin className="text-gray-600 text-2xl transition duration-300 hover:text-black"/>    
                  </a>
                  <a href={member.email} target="_blank" rel="noreferrer" aria-label={`Email ${member.name}`}>
                    <FaEnvelope className="text-gray-600 text-2xl transition duration-300 hover:text-black"/>
                  </a>
                  <a href={member.website} target="_blank" rel="noreferrer" aria-label={`Visit website of ${member.name}`}>
                    <FaGlobe className="text-gray-600 text-2xl transition duration-300 hover:text-black"/>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
        <ContactInfo/>
      </div>
    );
}

export default AboutPage;