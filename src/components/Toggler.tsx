interface TogglerProps {
  children?: React.ReactNode;
  className?: string;
  name: string;
  checked?: boolean;
  onChange: (event?: any) => void;
  ariaLabel?: string;
}

const Toggler = ({
  children,
  className,
  name,
  checked,
  onChange,
  ariaLabel,
}: TogglerProps) => (
  <label className={`switch ${className}`}>
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      aria-label={ariaLabel}
    />
    <span className="switch__toggle"></span>
    {!!children && children}
  </label>
);

export default Toggler;
