'use client';

interface SwitchProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Switch({ id, label, checked, onChange }: SwitchProps) {
  return (
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked="false"
      aria-label={`Toggle ${label}`}
      data-state={checked ? 'checked' : 'unchecked'}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
        checked ? 'bg-primary' : 'bg-gray-200'
      }`}
      onClick={() => onChange(!checked)}
    >
      <span className="sr-only">
        {checked ? 'Enable' : 'Disable'} {label}
      </span>
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
        aria-hidden="true"
      />
    </button>
  );
}
