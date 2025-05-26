import { ChevronRight } from 'lucide-react';
import React from 'react';

interface ViewAllButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

const ViewAllButton: React.FC<ViewAllButtonProps> = ({ onClick, children = 'View All' }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition duration-300"
  >
    {children}
    <ChevronRight size={20} className="ml-2" />
  </button>
);

export default ViewAllButton; 