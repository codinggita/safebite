// Note: react-hot-toast automatically handles actual Toast components internally.
// We styled it in main.jsx and use hooks/useToast.js to trigger them.
// This file can safely export an empty component or purely custom wrappers if needed.
// Sticking to react-hot-toast standard usage as configured in main.jsx.

export const CustomToastContent = ({ title, message, icon }) => (
  <div className="flex items-start">
    {icon && <span className="mr-3 text-xl">{icon}</span>}
    <div className="flex flex-col">
      <span className="font-semibold">{title}</span>
      {message && <span className="text-sm opacity-90">{message}</span>}
    </div>
  </div>
);
