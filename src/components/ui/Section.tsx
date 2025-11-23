import React from 'react';

export interface SectionProps {
  /**
   * The content to display inside the section
   */
  children: React.ReactNode;

  /**
   * Vertical spacing variant
   * - 'sm': py-16
   * - 'md': py-20 (default)
   * - 'lg': py-24
   */
  spacing?: 'sm' | 'md' | 'lg';

  /**
   * Background color (full Tailwind class name)
   * Common values: 'bg-gray-50', 'bg-purple-50', 'bg-white', 'bg-background', 'bg-primary'
   */
  background?: string;

  /**
   * Maximum width constraint for the container
   * Common values: 'max-w-4xl', 'max-w-5xl', 'max-w-6xl'
   */
  maxWidth?: string;

  /**
   * Additional CSS classes to apply to the section element
   */
  className?: string;

  /**
   * ID for the section element (useful for anchor links)
   */
  id?: string;

  /**
   * Inline styles to apply to the section element
   */
  style?: React.CSSProperties;

  /**
   * If true, wraps content in container (default: true)
   */
  container?: boolean;

  /**
   * Additional CSS classes to apply to the container div
   */
  containerClassName?: string;
}

/**
 * Section component - provides consistent spacing and container patterns
 *
 * @example
 * ```tsx
 * // Basic section with default spacing (py-20) and gray background
 * <Section background="bg-gray-50">
 *   <h2>Welcome</h2>
 *   <p>Content here</p>
 * </Section>
 *
 * // Section with custom spacing and max-width
 * <Section spacing="lg" background="bg-purple-50" maxWidth="max-w-4xl">
 *   <h2>About</h2>
 * </Section>
 *
 * // Section with anchor ID
 * <Section id="offerings" background="bg-white">
 *   <h2>Our Offerings</h2>
 * </Section>
 * ```
 */
export default function Section({
  children,
  spacing = 'md',
  background = 'bg-white',
  maxWidth,
  className = '',
  id,
  style,
  container = true,
  containerClassName = '',
}: SectionProps) {
  // Map spacing variants to Tailwind classes
  const spacingClasses = {
    sm: 'py-16',
    md: 'py-20',
    lg: 'py-24',
  };

  // Build section classes
  const sectionClasses = [
    spacingClasses[spacing],
    background,
    className,
  ].filter(Boolean).join(' ');

  // Build container classes
  const containerClasses = [
    'container mx-auto px-4',
    maxWidth,
    containerClassName,
  ].filter(Boolean).join(' ');

  return (
    <section
      className={sectionClasses}
      id={id}
      style={style}
    >
      {container ? (
        <div className={containerClasses}>
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}
