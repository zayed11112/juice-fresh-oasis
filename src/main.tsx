import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// Import Firebase configuration
import './firebase/config'

createRoot(document.getElementById("root")!).render(<App />);
