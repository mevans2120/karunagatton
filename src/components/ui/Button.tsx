import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

/**
 * Button Component
 *
 * A reusable button component with multiple variants for consistent styling
 * across the application.
 *
 * @see docs/component-inventory.md - Button pattern documentation
 */

export type ButtonVariant = 'ghost' | 'primary' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size variant */
  size?: ButtonSize;
  /** Button content */
  children: React.ReactNode;
  /** Optional href - renders as Link when provided */
  href?: string;
  /** Click handler - only used when href is not provided */
  onClick?: () => void;
  /** Optional icon to display (defaults to ChevronRight for links) */
  icon?: React.ReactNode;
  /** Show icon - set to false to hide default ChevronRight */
  showIcon?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Button type (only applies when rendering as button) */
  type?: 'button' | 'submit' | 'reset';
  /** Disabled state */
  disabled?: boolean;
  /** Ref forwarding */
  ref?: React.Ref<HTMLButtonElement | HTMLAnchorElement>;
}

/**
 * Get variant-specific className strings
 */
const getVariantClasses = (variant: ButtonVariant): string => {
  const variants = {
    ghost: 'bg-transparent text-white border border-white backdrop-blur-sm hover:bg-white hover:bg-opacity-10',
    primary: 'bg-primary text-white hover:bg-primary/90',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  };

  return variants[variant];
};

/**
 * Get size-specific className strings
 */
const getSizeClasses = (size: ButtonSize): string => {
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  };

  return sizes[size];
};

/**
 * Combine all className strings
 */
const getButtonClasses = (
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string
): string => {
  const baseClasses = 'inline-flex items-center rounded-full transition duration-300 cursor-pointer';
  const variantClasses = getVariantClasses(variant);
  const sizeClasses = getSizeClasses(size);

  return [baseClasses, variantClasses, sizeClasses, className]
    .filter(Boolean)
    .join(' ');
};

/**
 * Button Component
 */
const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      href,
      onClick,
      icon,
      showIcon = true,
      className,
      style,
      type = 'button',
      disabled = false,
    },
    ref
  ) => {
    const combinedClassName = getButtonClasses(variant, size, className);

    // Default icon for links (ChevronRight)
    const defaultIcon = href && showIcon ? <ChevronRight size={20} className="ml-2" /> : null;
    const displayIcon = icon || defaultIcon;

    // Render as Link when href is provided
    if (href) {
      return (
        <Link
          href={href}
          className={combinedClassName}
          style={{ cursor: 'pointer', ...style }}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {children}
          {displayIcon}
        </Link>
      );
    }

    // Render as button element
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        onClick={onClick}
        className={combinedClassName}
        style={{ cursor: disabled ? 'not-allowed' : 'pointer', ...style }}
        type={type}
        disabled={disabled}
      >
        {children}
        {displayIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
