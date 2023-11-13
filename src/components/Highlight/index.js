export const Highlight = ({children, color , backgroundColor}) => (
  <span
    style={{
      backgroundColor: backgroundColor || '#fff',
      borderRadius: '2px',
      color: color || '#fff',
      padding: '0.2rem',
    }}>
    {children}
  </span>
);