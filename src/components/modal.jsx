export default function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
        {children}
      </div>
    </div>
  );
}