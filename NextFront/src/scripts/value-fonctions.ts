
export const performOperation = async (operationType, filteredData) => {
  switch (operationType) {
      case 'Combined (Intersection with independants events)':
          return await sendDataToOperationApi('combined', filteredData);
    
      case 'Subtraction (Privation with inclued events)':
          return await sendDataToOperationApi('substraction', filteredData);

      case 'Multichance of independants events (Union)':
          return await sendDataToOperationApi('union-indep', filteredData);

      default:
          console.warn('Unknown operation type:', operationType);
          return { details: '', result: '' }; // Return empty details and result for unknown operations
  }
};
