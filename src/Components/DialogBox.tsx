import successIcon from "../../public/assets/images/icon-success-check.svg";
import { PropsWithChildren, useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Portal = ({ children }: PropsWithChildren) => {
  const portalRoot = document.getElementById("portal-root");
  return ReactDOM.createPortal(children, portalRoot!);
};

const mountedStyle = { animation: "inAnimation 250ms ease-in" };
const unmountedStyle = {
  animation: "outAnimation 270ms ease-out",
  animationFillMode: "forwards",
};

type DialogBoxProps = {
  isDone: boolean;
  setIsDone: (isDone: boolean) => void;
};

function DialogBox({ isDone, setIsDone }: DialogBoxProps) {
  const [isMounted, setIsMounted] = useState(true);
  useEffect(() => {
    let timeoutId: number;
    if (!isMounted) {
      timeoutId = setTimeout(() => {
        setIsDone(false);
        setIsMounted(true);
      }, 500);
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted]);

  if (!isDone) return null;

  return (
    <Portal>
      <div className="absolute inset-0 grid items-start justify-center p-6">
        <div
          className="p-6 space-y-2.5 bg-neutral-grey-900 rounded-xl transition-transform duration-[200000ms]"
          style={isMounted ? mountedStyle : unmountedStyle}
          onAnimationEnd={() => {
            setTimeout(() => {
              setIsMounted(false);
            }, 3000);
          }}
        >
          <div className="flex items-center gap-3">
            <img src={successIcon} alt="Success icon" aria-hidden />
            <p className="font-semibold text-white">Message Sent!</p>
          </div>

          <h1 className="text-primary-green-200">
            Thanks for completing the form. We'll be in touch soon!
          </h1>
        </div>
      </div>
    </Portal>
  );
}

export default DialogBox;
