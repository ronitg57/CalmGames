import { useReducedMotion } from 'framer-motion';

export const useMotionSafe = () => {
  const shouldReduceMotion = useReducedMotion();
  
  return {
    shouldReduceMotion,
    getTransition: (defaultTransition: any) => 
      shouldReduceMotion ? { duration: 0 } : defaultTransition,
    getVariant: (animatedVariant: any, staticVariant: any) =>
      shouldReduceMotion ? staticVariant : animatedVariant,
  };
};
