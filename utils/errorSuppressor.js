/**
 * Error Suppressor for common MetaMask/Chrome extension bugs
 * Suppresses console errors that don't affect functionality
 */

// Lista de errores que queremos suprimir
const SUPPRESSED_ERRORS = [
  'chrome.runtime.sendMessage() called from a webpage must specify an Extension ID',
  'runtime.sendMessage',
  'Extension ID (string) for its first argument',
  'inpage.js',
];

// Guardar referencia al console.error original
const originalConsoleError = console.error;

// Overwite console.error con filtro
console.error = function(...args) {
  const errorMessage = args.join(' ');
  
  // Verificar si el error debe ser suprimido
  const shouldSuppress = SUPPRESSED_ERRORS.some(suppressedError => 
    errorMessage.includes(suppressedError)
  );
  
  // Solo mostrar el error si NO debe ser suprimido
  if (!shouldSuppress) {
    originalConsoleError.apply(console, args);
  } else {
    // Opcional: Log a debug level para debugging si es necesario
    // console.debug('🔇 Suppressed MetaMask error:', errorMessage);
  }
};

// También interceptar window.onerror para errores no capturados
const originalWindowError = window.onerror;
window.onerror = function(message, source, lineno, colno, error) {
  // Verificar si el error debe ser suprimido
  const shouldSuppress = SUPPRESSED_ERRORS.some(suppressedError => 
    message && message.includes(suppressedError)
  );
  
  if (!shouldSuppress) {
    // Llamar al handler original si existe
    if (originalWindowError) {
      return originalWindowError.apply(this, arguments);
    }
    return false;
  }
  
  // Suprimir el error
  return true;
};

// Interceptar unhandledrejection para promises rechazadas
window.addEventListener('unhandledrejection', function(event) {
  const errorMessage = event.reason?.message || event.reason?.toString() || '';
  
  const shouldSuppress = SUPPRESSED_ERRORS.some(suppressedError => 
    errorMessage.includes(suppressedError)
  );
  
  if (shouldSuppress) {
    event.preventDefault(); // Prevenir que aparezca en consola
  }
});

export default {
  // Función para deshabilitar la supresión si es necesario
  disable() {
    console.error = originalConsoleError;
    window.onerror = originalWindowError;
  },
  
  // Función para agregar más errores a la lista de supresión
  addSuppressionPattern(pattern) {
    SUPPRESSED_ERRORS.push(pattern);
  }
};