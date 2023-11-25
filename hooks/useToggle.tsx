'use client';
import { useState } from 'react';

interface UseToggleReturnType {
  currentState: boolean;
  toggleState: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useToggle(initialState = false): UseToggleReturnType {
  const [state, setState] = useState(initialState);

  const toggle = () => setState((prevState) => !prevState);

  return { currentState: state, toggleState: toggle };
}
