function Notification({ message, type = "success" }) {
  if (!message) {
    return null;
  }

  const styles = {
    success: `
      border-green-200
      bg-green-50
      text-green-700
    `,
    error: `
      border-red-200
      bg-red-50
      text-red-700
    `,
    warning: `
      border-yellow-200
      bg-yellow-50
      text-yellow-700
    `,
    info: `
      border-blue-200
      bg-blue-50
      text-blue-700
    `,
  };

  return (
    <div
      className={`
        fixed
        top-6
        right-6
        z-50
        max-w-sm
        rounded-lg
        border
        px-4
        py-3
        shadow-lg
        transition-all
        duration-300
        ${styles[type]}
      `}
    >
      {message}
    </div>
  );
}

export default Notification;
