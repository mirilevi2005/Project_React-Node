import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store';

// יצירת hook מותאם אישית עבור useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// יצירת hook מותאם אישית עבור useSelector
export const useAppSelector: <T>(selector: (state: RootState) => T) => T = useSelector;
