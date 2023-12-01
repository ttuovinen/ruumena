interface DialogProps {
  children?: React.ReactNode;
  className?: string;
  open: boolean;
}

const Dialog = ({ children, className, open }: DialogProps) => (
  <dialog open={open} className={className ?? ''}>
    <div>{children}</div>
  </dialog>
);

export default Dialog;
