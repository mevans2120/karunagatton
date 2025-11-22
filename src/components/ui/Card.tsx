import React from 'react';

/**
 * Card Component
 *
 * A reusable card component that handles common card patterns across the application.
 * Reduces repeated className strings like "bg-white p-8 rounded-lg shadow-sm".
 *
 * @see docs/component-inventory.md - Card pattern documentation
 */

export type CardVariant = 'default' | 'elevated' | 'interactive';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type CardAlignment = 'left' | 'center';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant of the card */
  variant?: CardVariant;
  /** Padding size */
  padding?: CardPadding;
  /** Content alignment */
  alignment?: CardAlignment;
  /** Apply fade-in animation */
  fadeIn?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Get variant-specific className strings
 */
const getVariantClasses = (variant: CardVariant): string => {
  const variants = {
    // Default variant - basic card
    default: 'bg-white rounded-lg shadow-sm',
    // Elevated variant - stronger shadow (e.g., contact form)
    elevated: 'bg-white rounded-lg shadow-lg',
    // Interactive variant - hover effects (e.g., testimonials)
    interactive: 'bg-white rounded-lg shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md cursor-pointer group relative',
  };

  return variants[variant];
};

/**
 * Get padding classes
 */
const getPaddingClasses = (padding: CardPadding): string => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-8',
    lg: 'p-12',
  };

  return paddings[padding];
};

/**
 * Get alignment classes
 */
const getAlignmentClasses = (alignment: CardAlignment): string => {
  if (alignment === 'center') {
    return 'flex flex-col items-center text-center';
  }
  return '';
};

/**
 * Combine all className strings
 */
const getCardClasses = (
  variant: CardVariant,
  padding: CardPadding,
  alignment: CardAlignment,
  fadeIn: boolean,
  className?: string
): string => {
  const variantClasses = getVariantClasses(variant);
  const paddingClasses = getPaddingClasses(padding);
  const alignmentClasses = getAlignmentClasses(alignment);
  const fadeInClass = fadeIn ? 'fade-in-section' : '';

  return [variantClasses, paddingClasses, alignmentClasses, fadeInClass, className]
    .filter(Boolean)
    .join(' ');
};

/**
 * Card Component
 */
const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  alignment = 'left',
  fadeIn = false,
  className,
  children,
  ...props
}) => {
  const combinedClassName = getCardClasses(variant, padding, alignment, fadeIn, className);

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
};

export default Card;
