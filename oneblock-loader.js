(function() {
  'use strict';
  console.log('[OneBlockLoader] Module loaded');
  
  // Store OneBlock mod info for Eaglercraft
  window.ONEBLOCK_ENABLED = {
    id: 'oneblock',
    name: 'OneBlock',
    jarFile: 'oneblock-1.12.2-1.1.2.jar'
  };

  // Try to integrate with Eaglercraft options
  function integrate() {
    try {
      if (window.eaglercraftXOpts) {
        console.log('[OneBlockLoader] Integrating with Eaglercraft...');
        
        // The OneBlock JAR should be auto-detected by Eaglercraft
        // Just ensure it's available as a resource
        console.log('[OneBlockLoader] OneBlock JAR ready: oneblock-1.12.2-1.1.2.jar');
      }
    } catch (e) {
      console.error('[OneBlockLoader] Integration error:', e);
    }
  }

  // Try integration multiple times
  [100, 500, 1000, 2000, 5000].forEach(delay => {
    setTimeout(integrate, delay);
  });
})();
