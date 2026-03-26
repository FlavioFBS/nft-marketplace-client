'use client'
import { useEffect } from 'react';

/**
 * Client-side Error Suppressor Component
 * Suppresses annoying MetaMask console errors that don't affect functionality
 */
export default function ClientErrorSuppressor() {
  useEffect(() => {
    // Lista de errores que queremos suprimir
    const SUPPRESSED_ERRORS = [
      'chrome.runtime.sendMessage() called from a webpage must specify an Extension ID',
      'runtime.sendMessage',
      'Extension ID (string) for its first argument',
      'inpage.js:1',
      'Error in invocation of runtime.sendMessage',
    ];

    // Guardar referencia al console.error original
    const originalConsoleError = console.error;

    // Override console.error con filtro
    console.error = function(...args) {
      const errorMessage = args.join(' ');
      
      // Verificar si el error debe ser suprimido
      const shouldSuppress = SUPPRESSED_ERRORS.some(suppressedError => 
        errorMessage.includes(suppressedError)
      );
      
      // Solo mostrar el error si NO debe ser suprimido
      if (!shouldSuppress) {
        originalConsoleError.apply(console, args);
      }
    };

    // También interceptar window.onerror para errores no capturados
    const originalWindowError = window.onerror;
    window.onerror = function(message, source, lineno, colno, error) {
      // Verificar si el error debe ser suprimido
      const shouldSuppress = SUPPRESSED_ERRORS.some(suppressedError => 
        message && message.includes(suppressedError)
      );
      
      if (!shouldSuppress && originalWindowError) {
        return originalWindowError.apply(this, arguments);
      }
      
      // Suprimir el error
      return shouldSuppress;
    };

    // Interceptar unhandledrejection para promises rechazadas
    const handleUnhandledRejection = (event) => {
      const errorMessage = event.reason?.message || event.reason?.toString() || '';
      
      const shouldSuppress = SUPPRESSED_ERRORS.some(suppressedError => 
        errorMessage.includes(suppressedError)
      );
      
      if (shouldSuppress) {
        event.preventDefault(); // Prevenir que aparezca en consola
      }
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Cleanup function
    return () => {
      console.error = originalConsoleError;
      window.onerror = originalWindowError;
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  // Este componente no renderiza nada
  return null;
}