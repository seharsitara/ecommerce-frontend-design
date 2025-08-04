"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ExtraServicesSection() {
  const services = [
    {
      title: "Source Your Industry Rules",
      image: "/extraServices/b564a957ce3a966c5d76f6c21ddcaeba336dd251.png",
      description: "Find suppliers that meet your industry standards",
    },
    {
      title: "Customize Your Products",
      image: "/extraServices/4b08c60c3829236b56ad902eb0d7bc9954d83888.png",
      description: "Get products customized to your specifications",
    },
    {
      title: "Fast, Reliable Shipping",
      image: "/extraServices/1d9d9dbe3e097f229ff7711c3aefb5b0673a2278 (3).png",
      description: "Worldwide shipping with tracking",
    },
    {
      title: "Product Monitoring & Inspection",
      image: "/extraServices/0c52058c7fecb736fb193ed3a0a046668cf87a58.png",
      description: "Quality control and inspection services",
    },
  ];

  return (
    <div className="mb-8 mx-6 px-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Extra Services</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden h-42 "
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-26 object-cover"
            />
            <div className="p-3 text-center">
              <h3 className="text-sm font-semibold text-gray-800">{service.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
