import Link from 'next/link';

type Variant = 'ink' | 'ruled' | 'quiet';

const CLASS: Record<Variant, string> = {
  ink: 'act act-ink',
  ruled: 'act act-ruled',
  quiet: 'act-quiet',
};

export function Action({
  href,
  onClick,
  variant = 'ink',
  children,
  disabled,
  type = 'button',
  external,
}: {
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  children: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit';
  external?: boolean;
}) {
  if (href && external) {
    return (
      <a className={CLASS[variant]} href={href}>
        {children}
      </a>
    );
  }
  if (href) {
    return (
      <Link className={CLASS[variant]} href={href}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={CLASS[variant]} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

/** The tear line between the counters and the questions. Drawn, not dotted-border. */
export function Perforation({ label }: { label?: string }) {
  return (
    <div className="perforation">
      <Tear />
      {label ? (
        <span className="label perforation-label">
          {label}
        </span>
      ) : null}
      <Tear />
    </div>
  );
}

function Tear() {
  return (
    <svg aria-hidden="true" className="tear" width="100%" height="9" preserveAspectRatio="none" viewBox="0 0 200 9">
      <line x1="0" y1="4.5" x2="200" y2="4.5" stroke="var(--rule-strong)" strokeWidth="1" strokeDasharray="1.5 6" />
    </svg>
  );
}
