// define-ocg: Schema definitions for optimal chat group message structure
export const messageValidation = {
  validateMessage: (data) => {
    if (!data || typeof data !== 'object') return false;
    if (!data.user || typeof data.user !== 'string') return false;
    if (!data.message || typeof data.message !== 'string') return false;
    return true;
  },
  
  validateWSMessage: (data) => {
    if (!data || typeof data !== 'object') return false;
    if (!data.type || !['message', 'typing'].includes(data.type)) return false;
    
    if (data.type === 'message') {
      return messageValidation.validateMessage(data.data);
    }
    
    if (data.type === 'typing') {
      if (!data.data || typeof data.data !== 'object') return false;
      if (!data.data.user || typeof data.data.user !== 'string') return false;
      if (typeof data.data.isTyping !== 'boolean') return false;
      return true;
    }
    
    return false;
  }
};
