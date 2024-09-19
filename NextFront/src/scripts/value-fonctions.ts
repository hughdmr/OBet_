const sendDataToOperationApi = async (operation: string, filteredData: any) => {
    try {
      const url = `http://localhost:3000/api/operations/${operation}`;
      console.log(`Sending data to ${url}:`, filteredData);
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ odds: filteredData.map((item: any) => item.odds) }),
      });
  
      console.log('Response Status:', response.status);
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const jsonResponse = await response.json();
      console.log('Response JSON:', jsonResponse);
  
      return jsonResponse;
    } catch (error) {
      console.error('Error during fetch operation:', error);
      return { result: 'Error occurred while fetching the data.', details: '' };
    }
  };

export const performOperation = async (operationType: any, filteredData: any) => {
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
