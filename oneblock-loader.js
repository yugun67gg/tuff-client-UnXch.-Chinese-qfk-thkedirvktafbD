(function() {
  'use strict';
  console.log('[OneBlockLoader] v2.0 Initializing...');
  
  // Wait for Eaglercraft to load
  function waitForEaglercraft() {
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        // Check if game is loaded and main function exists
        if (window.main && typeof window.main === 'function') {
          clearInterval(checkInterval);
          console.log('[OneBlockLoader] Eaglercraft detected');
          resolve(true);
        }
      }, 500);
      
      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkInterval);
        console.log('[OneBlockLoader] Eaglercraft timeout');
        resolve(false);
      }, 10000);
    });
  }

  // Register OneBlock world type with Eaglercraft
  async function registerOneBlock() {
    try {
      await waitForEaglercraft();
      
      // Ensure eaglercraftXOpts exists
      if (!window.eaglercraftXOpts) {
        window.eaglercraftXOpts = {};
      }

      // Add OneBlock to world generators
      if (!window.eaglercraftXOpts.worldTypes) {
        window.eaglercraftXOpts.worldTypes = [];
      }

      // Define OneBlock world type
      const oneBlockWorldType = {
        id: 'oneblock',
        name: 'OneBlock',
        description: 'Survive on a single block with unlimited inventory',
        jarMod: 'oneblock-1.12.2-1.1.2.jar',
        icon: '📦'
      };

      // Check if not already registered
      const exists = window.eaglercraftXOpts.worldTypes.some(
        wt => wt.id === 'oneblock'
      );

      if (!exists) {
        window.eaglercraftXOpts.worldTypes.push(oneBlockWorldType);
        console.log('[OneBlockLoader] ✅ OneBlock registered');
      }

      // Also store in global registry
      window.ONEBLOCK_CONFIG = {
        enabled: true,
        worldType: oneBlockWorldType,
        modJar: 'oneblock-1.12.2-1.1.2.jar'
      };

      // Dispatch ready event
      document.dispatchEvent(
        new CustomEvent('oneblockReady', { detail: oneBlockWorldType })
      );

      console.log('[OneBlockLoader] Ready!');
      return true;

    } catch (error) {
      console.error('[OneBlockLoader] Error:', error);
      return false;
    }
  }

  // Auto-initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(registerOneBlock, 1000);
    });
  } else {
    setTimeout(registerOneBlock, 1000);
  }
})();
