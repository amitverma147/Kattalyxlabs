import { motion } from 'framer-motion';

const Card = ({
  children,
  variant = 'default',
  className = '',
  hover = true,
  onClick,
  ...props
}) => {
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden';
  
  const variants = {
    default: '',
    elevated: 'shadow-xl hover:shadow-2xl',
    outlined: 'shadow-none border-2',
    flat: 'shadow-none border-0'
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  const MotionComponent = hover ? motion.div : 'div';

  return (
    <MotionComponent
      className={classes}
      onClick={onClick}
      whileHover={hover ? { y: -4, scale: 1.02 } : {}}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

export default Card;
