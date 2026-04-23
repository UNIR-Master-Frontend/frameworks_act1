'use client';
import './styles.css';

export default function Card({ children, onClick, className = '' }) {
  return (
    <div className={`card ${className}`.trim()} onClick={onClick} role="button" tabIndex={0}>
      {children}
    </div>
  );
}
