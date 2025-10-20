import React from "react";

interface WhatsappButtonProps {
  phone: string;
  message?: string;
  variant?: "full" | "icon";
}

export default function WhatsappButton({
  phone,
  message = "Hola, me gustaría más información.",
  variant = "full",
}: WhatsappButtonProps) {
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    message
  )}`;

  const Icon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M380.9 97.1C339 55.1 283.2 32 224 32C106.8 32 12.7 126.1 12.7 243.3c0 43.2 11.4 85 33.1 121.9L0 480l118.6-45.5c35.2 19.2 74.6 29.3 115.3 29.3h.1c117.1 0 211.3-94.1 211.3-211.2 0-59.2-23-114.9-64.4-156.5zM224 438.6c-35.9 0-71.2-9.6-102-27.9l-7.3-4.3-70.3 27 26.1-72.4-4.8-7.5c-20.7-32.5-31.7-70.1-31.7-108.6C34 141.3 121.9 53.4 224 53.4c52.2 0 101.3 20.3 138.2 57.2 36.9 36.9 57.2 85.9 57.2 138.1 0 102.1-88 189.9-195.4 189.9zm101.6-138.3c-5.5-2.7-32.6-16.1-37.7-18-5.1-1.9-8.8-2.7-12.6 2.7-3.7 5.3-14.4 18-17.6 21.7-3.2 3.7-6.5 4.2-12 1.4-5.5-2.7-23.1-8.5-44-27.1-16.2-14.4-27.1-32.3-30.3-37.7-3.2-5.3-.3-8.2 2.4-11 2.5-2.5 5.5-6.5 8.2-9.7 2.7-3.2 3.7-5.3 5.6-8.8 1.9-3.5.9-6.6-.5-9.4-1.4-2.7-12.6-30.3-17.3-41.5-4.5-10.8-9.1-9.3-12.6-9.5-3.2-.2-6.9-.2-10.6-.2s-9.6 1.4-14.7 6.9c-5.1 5.5-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.7 3.7 39.1 59.7 94.7 83.8 13.2 5.7 23.5 9.1 31.5 11.7 13.2 4.2 25.2 3.6 34.7 2.2 10.6-1.6 32.6-13.3 37.2-26.2 4.6-12.8 4.6-23.8 3.2-26.2-1.3-2.4-5-3.7-10.5-6.4z" />
    </svg>
  );

  if (variant === "icon") {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir conversación en WhatsApp"
        title="WhatsApp"
      >
        <Icon className="w-6 h-6 text-green-500 hover:text-green-600" />
      </a>
    );
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir conversación en WhatsApp"
      title="WhatsApp"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-lg text-white bg-green-500 hover:bg-green-600 transition-all"
    >
      <Icon className="w-5 h-5 text-white" />
      WhatsApp
    </a>
  );
}
