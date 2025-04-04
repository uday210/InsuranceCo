import { useEffect } from 'react';

declare global {
  interface Window {
    embeddedservice_bootstrap: {
      settings: {
        language: string;
      };
      init: (
        orgId: string,
        eswId: string,
        baseURL: string,
        settings: { scrt2URL: string }
      ) => void;
    };
  }
}

export const SalesforceChat = () => {
  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://orgfarm-b3ce4f7655-dev-ed.develop.my.site.com/ESWInsuranceAgentESD1743794528855/assets/js/bootstrap.min.js';
      script.onload = initEmbeddedMessaging;
      document.body.appendChild(script);
    };

    const initEmbeddedMessaging = () => {
      try {
        window.embeddedservice_bootstrap.settings.language = 'en_US';
        
        window.embeddedservice_bootstrap.init(
          '00DgK000001Ke81',
          'Insurance_Agent_ESD',
          'https://orgfarm-b3ce4f7655-dev-ed.develop.my.site.com/ESWInsuranceAgentESD1743794528855',
          {
            scrt2URL: 'https://orgfarm-b3ce4f7655-dev-ed.develop.my.salesforce-scrt.com'
          }
        );
      } catch (err) {
        console.error('Error loading Embedded Messaging: ', err);
      }
    };

    loadScript();

    // Cleanup function to remove the script and chat widget when component unmounts
    return () => {
      // Remove the script
      const scripts = document.getElementsByTagName('script');
      for (let script of scripts) {
        if (script.src.includes('bootstrap.min.js')) {
          script.remove();
        }
      }

      // Remove the chat widget elements
      const chatElements = document.querySelectorAll('[id^="embeddedMessaging"]');
      chatElements.forEach(element => element.remove());

      // Remove any other Salesforce-related elements
      const sfElements = document.querySelectorAll('[id^="esw"]');
      sfElements.forEach(element => element.remove());

      // Remove the iframe if it exists
      const chatIframe = document.querySelector('iframe[title*="Chat"]');
      if (chatIframe) {
        chatIframe.remove();
      }
    };
  }, []); // Empty dependency array means this runs once when component mounts

  return null; // This component doesn't render anything visible
}; 