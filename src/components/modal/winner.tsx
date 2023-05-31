import { type MouseEventHandler } from "react";

const Winner = ({
  show,
  onClose,
}: {
  show: boolean;
  onClose: MouseEventHandler;
}) => {
  if (show === false) return <></>;

  return (
    <div
      id="background"
      className="absolute z-40 flex h-screen w-screen flex-col items-center justify-center bg-black/20"
      onClick={onClose}
    >
      <div
        id="modal"
        className="relative z-50 rounded-lg border border-black bg-white p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h1>Hello Winner</h1>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
export default Winner;
