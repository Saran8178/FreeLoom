// components/BriefcaseBeta.js
import React from "react";
import { Briefcase } from "lucide-react";

export default function Beta({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl max-w-md w-full shadow-xl text-center relative">
        <button onClick={onClose} className="absolute top-2 right-4 text-gray-500 hover:text-black text-xl">&times;</button>
        <div className="mb-4 text-indigo-600 flex justify-center">
          <Briefcase className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Coming Soon</h2>
        <p className="text-gray-600 text-sm">
          Briefcase will be available soon in <strong>Beta</strong> with <strong>Professional</strong> plan.
        </p>
      </div>
    </div>
  );
}
