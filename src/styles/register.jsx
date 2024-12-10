const styles = {
    container: {
      maxWidth: '400px',
      margin: '50px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#333',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    label: {
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    input: {
      padding: '10px',
      fontSize: '14px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      outline: 'none',
      transition: 'border-color 0.3s',
    },
    inputFocus: {
      borderColor: '#007BFF',
    },
    button: {
      padding: '10px',
      backgroundColor: '#007BFF',
      color: 'white',
      fontSize: '16px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    successMessage: {
      color: 'green',
      textAlign: 'center',
      marginTop: '10px',
    },
    errorMessage: {
      color: 'red',
      textAlign: 'center',
      marginTop: '10px',
    },
  };
  
  export default styles;
  