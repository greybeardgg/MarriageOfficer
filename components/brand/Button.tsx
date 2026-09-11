type Props = {
  variant?: 'primary' | 'secondary' | 'ghost' | 'inverse';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  children: React.ReactNode;
};

export function Button({ variant = 'primary', size = 'md', href, onClick, type = 'button', className = '', children }: Props) {
  const cls = `btn btn-${variant} btn-${size} ${className}`.trim();
  if (href) return <a href={href} className={cls}>{children}</a>;
  return <button type={type} onClick={onClick} className={cls}>{children}</button>;
}
