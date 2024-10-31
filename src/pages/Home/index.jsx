import { FaChevronRight } from "react-icons/fa";
function HomePage() {
    return ( <div className="font-sans flex flex-col min-h-screen w-full">
        <section className="w-full bg-orange-100 flex">
          <div className="w-1/2 bg-orange-100 p-12 flex flex-col justify-center pl-24 items-start">
            <div>
              <h1 className="text-7xl font-bold text-amber-800">Create</h1>
              <p className="text-5xl font-bold text-amber-800 mt-0">Unforgettable</p>
              <p className="text-5xl font-bold text-amber-800 mt-0">Gift Experience for</p>
              <p className="text-5xl font-bold text-amber-800 mt-0">Every Occasions</p>
            </div>
            <div className="description mt-8">
              <p className="text-xl text-left">Welcome to Gift4U, where you can</p>
              <p className="text-xl text-left mt-0">design and personalize the perfect gift</p>
              <p className="text-xl text-left mt-0">box for any special moments,</p>
              <p className="text-xl text-left mt-0">guaranteed to bring joy to your loved</p>
              <p className="text-xl text-left mt-0">ones.</p>
            </div>
          </div>
          <div className="w-1/2 flex justify-center items-center bg-white">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: "url('https://confettigifts.in/cdn/shop/files/openwhen1.jpg?v=1717744384')" }}
            ></div>
          </div>
        </section>

        <section className="flex flex-wrap justify-center mt-12">
          <div className="mx-6 w-6/12 text-center">
            <h1 className="font-bold text-4xl">Choose from a variety of box templates to create your perfect gift box</h1>
          </div>
        </section>

        <section className="flex flex-wrap justify-center mt-12">
          <div className="mx-6 w-1/4 text-center">
            <h3 className="text-2xl font-bold">Customize your gifts with a personal touch.</h3>
            <p className="text-xl mt-6">Customizable templates to make your gift truly unique.</p>
          </div>
          <div className="mx-6 w-1/4 text-center">
            <h3 className="text-2xl font-bold">A variety of decorations to enhance your gift</h3>
            <p className="text-xl mt-6">Personalize your gift with heartfelt messages or cherished memories.</p>
          </div>
          <div className="mx-6 w-1/4 text-center">
            <h3 className="text-2xl font-bold">Add a message or photo to make your gift extra special</h3>
            <p className="text-xl mt-6">Explore our selection of extra goodies to make your gift even more special.</p>
          </div>
        </section>

        <section className="w-full flex justify-center mt-12 h-96 bg-orange-100">
          <div className="mr-12 bg-white w-3/5">
            <img
              src="https://www.foldaboxusa.com/cdn/shop/products/HotPinkSatinonBlackA5Deep_1200x.jpg?v=1700520516"
              alt="Gift Box"
              className="w-full h-full bg-cover bg-center"
            />
          </div>
          <div className="mt-20 w-2/5">
            <h2 className="text-5xl font-bold text-amber-800">Discover the</h2>
            <h2 className="text-5xl font-bold text-amber-800">Perfect Gift Box</h2>
            <p className="text-2xl my-6 w-3/4">Choose from our wide selection of customizable gift boxes for any occasion.</p>
            <button className="bg-amber-800 text-white py-2 px-4 text-lg rounded hover:bg-gray-700 flex items-center">
              Create Now 
              <FaChevronRight className="ml-2" /> 
            </button>
          </div>
        </section>
    </div> );
}

export default HomePage;