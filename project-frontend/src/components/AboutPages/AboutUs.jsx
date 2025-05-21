import React from 'react'
import Grid from "@mui/material/Grid";
import classes from "./AboutPages.module.scss";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <>
          <main className="container mx-auto px-4 py-12">
        {/* About Us Section */}
        <section className="flex flex-col md:flex-row items-center md:space-x-8 space-y-8 md:space-y-0">
          {/* Heading Section */}
          <div className="text-center md:text-left md:w-1/2">
            <h1 className="text-4xl font-extrabold text-gray-900 animate-bounce mb-6">
              About <span className="text-red-500">Umiya Tyre And Battery Service</span>
            </h1>
            <div className="mx-auto md:mx-0 w-16 h-1 bg-red-500 mb-8" />
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Established in 2024, Umiya Tyre And Battery Service is a leading tyre dealer in Sargasan, Near Nayara Petrol Pump, E- 001 Swagat Flamingo, Sargasan-382421. we have built a reputation for offering high-quality tyres and exceptional service to our customers.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              At Umiya Tyre And Battery Service, we cater to a wide range of tyre needs, including brands like Michelin, Ceat, Bridgestone, Shell Lubricant, Castrol, Repsol, Apollo, and JK. Whether you&apos;re looking for tyres for your car, bike, or commercial vehicle, we have you covered.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Our commitment to customer satisfaction has helped us grow into a trusted name in Gandhinagar. We believe in providing not only quality products but also expert advice and reliable service.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Visit us at our store near Cinemax in Sargasan, Near Nayara Petrol Pump, E- 001 Swagat Flamingo and experience the Umiya Tyre And Battery Service difference. We are here to assist you with all your tyre-related needs.
            </p>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 flex justify-center">
            <div className="w-[350px] h-[350px] overflow-hidden rounded-xl shadow-lg">
              <img
                src="https://lh3.googleusercontent.com/p/AF1QipNoiIDS5ljVMjJaJfwWAJ6xOcvk0G5O_uvsDqd7=s1360-w1360-h1020-rw"
                width={500}
                height={500}
                alt="Company Location"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      </main>

    </>
  )
}

export default AboutUs



