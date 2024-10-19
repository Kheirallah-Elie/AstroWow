import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ensures the image covers the full screen
    justifyContent: 'center',
    width: '100%', // Full width of the screen
    height: '100%', // Full height of the screen
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.0)', // Light overlay for better readability
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    fontSize: 16,
  },
  dayContainer: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'rgba(240, 240, 240, 0.8)', // Semi-transparent container
    borderRadius: 8,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  forecastItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
  buttonStyle: {
    backgroundColor: '#4CAF50', // Green background for better contrast
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10, // Rounded corners
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff', // White text for contrast
    fontSize: 16,
    fontWeight: 'bold',
  },
  suggestionsContainer: {
    backgroundColor: 'white', // White background for suggestions
    borderRadius: 8,
    elevation: 4, // Add shadow on Android
    maxHeight: 200, // Limit the height of the dropdown
    marginTop: 5,
    zIndex: 10, // Ensure it appears above other elements
    width: '100%', // Match width of input
  },
  suggestionItem: {
    padding: 15, // Increased padding for larger click area
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // Divider color
  },
  highlightedSuggestion: {
    backgroundColor: 'blue', // Highlight color
    color: 'white', // Change text color on highlight
  },
  suggestionText: {
    fontSize: 18, // Increase text size for better readability
    color: 'black', // Default text color
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    padding: 10,
    textAlign: 'center',
  },
});

export default styles;
