figma.showUI(__html__, { width: 320, height: 480 });

figma.ui.onmessage = async (msg) => {
  switch (msg.type) {
    case 'getPreferences':
      // Load saved preferences
      const savedSize = await figma.clientStorage.getAsync('iconSize');
      const savedTheme = await figma.clientStorage.getAsync('theme');
      
      // Send preferences back to UI
      figma.ui.postMessage({
        type: 'preferences',
        size: savedSize || 24,
        theme: savedTheme || 'light'
      });
      break;

    case 'saveSize':
      await figma.clientStorage.setAsync('iconSize', msg.size);
      break;

    case 'saveTheme':
      await figma.clientStorage.setAsync('theme', msg.theme);
      break;

    case 'copy-to-clipboard':
      figma.notify('Icon copied!');
      break;
  }
};