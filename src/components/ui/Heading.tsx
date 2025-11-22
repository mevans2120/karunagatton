import React from 'react';

/**
 * Heading Component
 *
 * A reusable heading component that handles the common heading patterns
 * across the application, reducing the 150+ character className strings.
 *
 * @see docs/component-inventory.md - Heading pattern documentation
 */

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingVariant = 'hero' | 'section' | 'subsection' | 'subtitle' | 'default';
export type HeadingAlign = 'left' | 'center' | 'right';

export interface HeadingProps {
  /** Heading level (h1-h6) */
  level?: HeadingLevel;
  /** Visual style variant */
  variant?: HeadingVariant;
  /** Text alignment */
  align?: HeadingAlign;
  /** Heading text content */
  children: React.ReactNode;
  /** Apply fade-in animation */
  fadeIn?: boolean;
  /** Text color override */
  color?: 'primary' | 'white' | 'gray' | 'inherit';
  /** Additional CSS classes */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

/**
 * Get variant-specific className strings
 */
const getVariantClasses = (variant: HeadingVariant, level: HeadingLevel): string => {
  const variants = {
    // Hero variant - large, prominent headings for page headers
    hero: {
      1: 'text-5xl md:text-7xl lg:text-8xl tracking-wider leading-tight',
      2: 'text-4xl md:text-6xl lg:text-7xl tracking-wide leading-tight',
      3: 'text-3xl md:text-5xl lg:text-6xl tracking-wide leading-tight',
      4: 'text-2xl md:text-4xl lg:text-5xl',
      5: 'text-xl md:text-3xl lg:text-4xl',
      6: 'text-lg md:text-2xl lg:text-3xl',
    },
    // Section variant - standard section headings
    section: {
      1: 'text-4xl md:text-5xl',
      2: 'text-3xl md:text-4xl',
      3: 'text-2xl md:text-3xl',
      4: 'text-xl md:text-2xl',
      5: 'text-lg md:text-xl',
      6: 'text-base md:text-lg',
    },
    // Subsection variant - smaller section headings
    subsection: {
      1: 'text-3xl md:text-4xl',
      2: 'text-2xl md:text-3xl',
      3: 'text-xl md:text-2xl',
      4: 'text-lg md:text-xl',
      5: 'text-base md:text-lg',
      6: 'text-sm md:text-base',
    },
    // Subtitle variant - descriptive text below hero
    subtitle: {
      1: 'text-2xl md:text-3xl',
      2: 'text-xl md:text-2xl tracking-wide',
      3: 'text-lg md:text-xl',
      4: 'text-base md:text-lg',
      5: 'text-sm md:text-base',
      6: 'text-xs md:text-sm',
    },
    // Default variant - simple heading
    default: {
      1: 'text-4xl',
      2: 'text-3xl',
      3: 'text-2xl',
      4: 'text-xl',
      5: 'text-lg',
      6: 'text-base',
    },
  };

  return variants[variant][level];
};

/**
 * Get alignment classes
 */
const getAlignClasses = (align: HeadingAlign): string => {
  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return alignments[align];
};

/**
 * Get color classes
 */
const getColorClasses = (color?: 'primary' | 'white' | 'gray' | 'inherit'): string => {
  if (!color || color === 'inherit') return '';

  const colors = {
    primary: 'text-primary',
    white: 'text-white',
    gray: 'text-gray-700',
  };

  return colors[color];
};

/**
 * Combine all className strings
 */
const getHeadingClasses = (
  variant: HeadingVariant,
  level: HeadingLevel,
  align: HeadingAlign,
  fadeIn: boolean,
  color?: 'primary' | 'white' | 'gray' | 'inherit',
  className?: string
): string => {
  const baseClasses = 'font-light font-heading';
  const variantClasses = getVariantClasses(variant, level);
  const alignClasses = getAlignClasses(align);
  const colorClasses = getColorClasses(color);
  const fadeInClass = fadeIn ? 'fade-in-section' : '';

  return [baseClasses, variantClasses, alignClasses, colorClasses, fadeInClass, className]
    .filter(Boolean)
    .join(' ');
};

/**
 * Heading Component
 */
const Heading: React.FC<HeadingProps> = ({
  level = 2,
  variant = 'default',
  align = 'left',
  children,
  fadeIn = false,
  color,
  className,
  style,
}) => {
  const combinedClassName = getHeadingClasses(variant, level, align, fadeIn, color, className);
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag className={combinedClassName} style={style}>
      {children}
    </Tag>
  );
};

export default Heading;
