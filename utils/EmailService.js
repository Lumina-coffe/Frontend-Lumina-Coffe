// src/utils/EmailService.js
import emailjs from '@emailjs/browser';

export const sendEmail = (formData) => {
  return emailjs.send(
    'service_1fx7q7k',       // Ganti dengan SERVICE_ID milikmu
    'template_qux0a0q',      // Ganti dengan TEMPLATE_ID milikmu
    formData,
    'SHy30MQqa4DD0A8nD'  // Ganti dengan PUBLIC KEY milikmu
  );
};
