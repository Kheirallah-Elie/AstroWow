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
    paddingVertical: 6,
    paddingHorizontal: 24,
    borderRadius: 10, // Rounded corners
    alignItems: 'center',
    marginTop: 20,
  },
  exitButtonStyle: {
    backgroundColor: 'red', // Green background for better contrast
    paddingVertical: 6,
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
  textInput: {
    height: 40,
    backgroundColor: "white",
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',  // Centers the content vertically
    alignItems: 'center',      // Centers the content horizontally
    width: "80%",              // Adjusts width of text inputs
    alignSelf: 'center',       // Ensures the wrapper itself is centered horizontally
  },
  searchBar: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  searchInput: {
    backgroundColor: '#fff',
  },
  imageContainer: {
    flex: 1,
    margin: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'rgba(240, 240, 240, 0.8)',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  imageTitle: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  likesCount: {
    fontSize: 14,
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  titleContainer: {
    marginVertical: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    maxWidth: '100%',
    overflow: 'hidden',
  },
  descriptionContainer: {
    maxHeight: 45, // Limit height to show only a few lines
    overflow: 'hidden',
  },
  descriptionText: {
    fontSize: 14,
    marginBottom: 5,
  },
  moreDetailsText: {
    color: '#007BFF',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default styles;
